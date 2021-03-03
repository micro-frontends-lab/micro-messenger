import { expando } from './utils'

function typeFactory (type = '') {
    return function (arg, messagePrefix = 'Argument') {
        // eslint-disable-next-line
        if (typeof arg !== type) {
            throw new Error(`${messagePrefix} must be a ${type}.`)
        }
    }
}

let mustBeString = typeFactory('string')
export { mustBeString }

let mustBeFunction = typeFactory('function')
export { mustBeFunction }

export function mustNotBeBlank (arg, messagePrefix = 'Argument') {
    let isNotBlank = false
    if (typeof arg === 'string') {
        isNotBlank = arg.trim().length > 0
    } else if (Array.isArray(arg)) {
        isNotBlank = arg.length > 0
    } else if (typeof arg === 'object') {
        isNotBlank = Object.keys(arg).length > 0
    } else {
        isNotBlank = !!arg
    }
    if (!isNotBlank) {
        throw new Error(`${messagePrefix} cannot be blank.`)
    }
}

export function isValidEvent (evt) {
    if (evt.source !== window) { return false }
    if (evt.origin !== location.origin) { return false }
    return typeof evt.data === 'object' && !Array.isArray(evt.data) && evt.data[expando]
}
