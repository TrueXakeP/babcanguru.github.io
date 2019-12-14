const parseCookie = cookie => {
    const cookies = cookie.split(/;\s*/)

    return cookies.reduce((acc, str) => {
        const [key, value] = str.split('=')
        acc[key] = value
        return acc
    }, {})
}

module.exports = parseCookie