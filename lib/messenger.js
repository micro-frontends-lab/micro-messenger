import { mustBeString, mustNotBeBlank } from './helper/validations'

export class Messenger {
    constructor (name = '') {
        mustBeString(name, 'name')
        mustNotBeBlank(name, 'name')
        this.name = name
        this.events = []
    }
}

export function messenger (name = '') {
    return new Messenger(name)
}
