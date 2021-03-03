import { expando } from '../helper/utils'
import { mustBeString } from '../helper/validations'
import { Messenger } from '../messenger'

Messenger.prototype.broadcast = function (type = '', data = {}) {
    mustBeString(type, 'type')
    if (!type.startsWith(`${this.name}:`)) {
        type = `${this.name}:${type}`
        console.warn(`Argument type doesn't match pattern ${this.name}:<type>, it has been prefixed as ${type}`)
    }
    let msg = { type, data }
    msg[expando] = true
    window.postMessage(Object.freeze(msg), location.origin)
    return this
}
