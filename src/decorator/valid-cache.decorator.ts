const cacheItems = new Map<string , any>()
export function Cache(originalMethod: any, context: any){
    return function(this:any , ...args:any[]){
        const key = JSON.stringify(args)
        if(cacheItems.has(key)){
            //TODO retrun the value diretcly without pass into the origin method
            console.warn(`[CACHE HIT]: the key ${key} is withing the cache`)
            return cacheItems.get(key)
        }
        //TODO: add a new key to map
        console.warn(`[CACHE MISSED]: executing the method for args : ${args}`)
        const result = originalMethod.apply(this, args);
        cacheItems.set(key  , result)
        return result
    }
}