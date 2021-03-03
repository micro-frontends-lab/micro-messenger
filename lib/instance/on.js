import { splitEvent, eventNameMatch, eventNamespacesMatch } from '../helper/utils'
import { isValidEvent, mustBeString, mustBeFunction } from '../helper/validations'
import { Messenger } from '../messenger'

Messenger.prototype.on = function (type = '', func = function () {}) {
    mustBeString(type, 'type')
    mustBeFunction(func, 'func')
    this.events || (this.events = [])
    this.events.push(Object.assign(splitEvent(type), { func }))
    if (!this._binded) {
        this._binded = true
        this._handler = function (e) {
            if (!isValidEvent(e)) { return }
            let splitedEvt = splitEvent(e.data.type)
            this.events.forEach((evt) => {
                if (!eventNameMatch(splitedEvt, evt)) { return }
                if (!eventNamespacesMatch(splitedEvt, evt)) { return }
                evt.func(e.data.data)
            })
        }.bind(this)
        window.addEventListener('message', this._handler)
    }
    return this
}
