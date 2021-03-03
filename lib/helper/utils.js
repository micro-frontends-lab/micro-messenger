const expando = '__MicroMessenger__'

export { expando }

export function splitEvent (event = '') {
    let splited = event.split('.')
    return {
        type: splited[0],
        namespaces: splited.slice(1)
    }
}

export function eventNameMatch (current = {}, defined = {}) {
    return current.type === defined.type
}

export function eventNamespacesMatch (current = {}, defined = {}) {
    if (current.namespaces && current.namespaces.length) {
        return current.namespaces.some((ns) => {
            return defined.namespaces.includes(ns)
        })
    } else {
        return true
    }
}
