import { CACHE_MANAGER, Inject } from "@nestjs/common"

export function ClearCache() {
    
	// injector decorator
	// same as putting @Inject(CACHE_MANAGER) in constructor
    const injector = Inject(CACHE_MANAGER)

	return (target: any, _key?: string | symbol, descriptor?: TypedPropertyDescriptor<any>) => {
        
		// Inject into constructor at run time. Equivilent to:
		// constructor( @Inject(CACHE_MANAGER) private cacheManager: Cache )
        injector(target, 'cacheManager')

		const originalMethod = descriptor.value

		descriptor.value = async function (...args: any[]) {
			try {
                this.cacheManager.del( args[0] )
                return await originalMethod.apply(this, args)
			} catch (err) {
				console.error(err)
				return originalMethod(args)
			}
		}
	}
}