const host = 'http://127.0.0.1:3333'

const fetch = (url: string, ...args: any[]): any => {
    return fetch(host + url, ...args)
}

export default fetch