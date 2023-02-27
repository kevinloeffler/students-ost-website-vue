/**
 * Fetches data from the server
 *
 * @param {string} path the path to the ressource, eg: /api/events?limit=3
 * @returns {Promise<any>} the requested data
 * @throws fetch error, json parse error
 */
export async function fetchData(path: string): Promise<any> {
    const url = 'http://localhost:3000' + path  // TODO: use correct url http://students-rj.ch/api/

    const jsonResponse = await fetch(url)
    if (!jsonResponse.ok) throw new Error(`Fetch Error: ${jsonResponse.status.toString()}`)

    return await jsonResponse.json()
}

// cached fetch, doesn't work, should be implemented with pinia

// const fetchCache = reactive(new Map())

/**
 * Fetches data from the server and caches it for 20 minutes.
 *
 * @param {string} path the path to the ressource, eg: /api/events?limit=3
 * @returns {Promise<any>} the requested data
 * @throws fetch error, json parse error
 */
/*
export async function cachedFetch(path: string): Promise<any> {
    const url = 'http://localhost:3000' + path  // TODO: use correct url http://students-rj.ch/api/

    const cacheHit = fetchCache.get(path)
    if (cacheHit) {
        if (cacheHit.expires > new Date().getTime()) {
            console.log('cache hit')
            return () => cacheHit.data
        }
    }

    console.log('no cache hit')

    const jsonResponse = await fetch(url)
    if (!jsonResponse.ok) throw new Error(`Fetch Error: ${jsonResponse.status.toString()}`)

    const response = await jsonResponse.json()
    const expires = new Date().setMinutes(new Date().getMinutes() + 20)  // now + 20 minutes

    fetchCache.set(path, { data: response, expires: expires })

    return response
}


export async function cachedFetch2(path: string): Promise<any> {
    const url = 'http://localhost:3000' + path  // TODO: use correct url http://students-rj.ch/api/

    const cacheHit = fetchCache.get(path)
    if (cacheHit) {
        if (cacheHit.expires > new Date().getTime()) {
            console.log('cache hit')
            return () => cacheHit.data
        }
    }

    console.log('no cache hit')

    const jsonResponse = await fetch(url)
    if (!jsonResponse.ok) throw new Error(`Fetch Error: ${jsonResponse.status.toString()}`)

    const response = await jsonResponse.json()
    const expires = new Date().setMinutes(new Date().getMinutes() + 20)  // now + 20 minutes

    fetchCache.set(path, { data: response, expires: expires })

    return response
}
*/