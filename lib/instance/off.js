import { mustBeString, mustBeFunction } from '../helper/validations'
import { splitEvent, eventNameMatch, eventNamespacesMatch } from '../helper/utils'
import { Messenger } from '../messenger'

Messenger.prototype.off = function (type = '', func = function () {}) {
    if (!this._binded) { return }
    if (type === undefined) {
        this.events = []
        window.removeEventListener('message', this._handler)
        return
    }
    mustBeString(type, 'type')
    func && mustBeFunction(func, 'func')
    let splitedEvt = splitEvent(type)
    this.events = this.events.filter((evt) => {
        if (!eventNameMatch(splitedEvt, evt)) { return true }
        if (!eventNamespacesMatch(splitedEvt, evt)) { return true }
        if (func && func !== evt.func) { return true }
    })
    if (!this.events.length) {
        window.removeEventListener('message', this._handler)
    }
    return this
}
