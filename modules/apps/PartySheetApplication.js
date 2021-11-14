import constants from '../settings/constants.js'
import RepositionableApplication from './RepositionableApplication.js'

export default class PartySheetApplication extends RepositionableApplication {
    static app
    tokenColors = {}
    positionSetting = 'party-sheet-box-position'

    static init() {
        const instance = new this()
        ui.partySheet = instance
        instance.render(true)
    }

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: 'party-sheet-box',
            template: `${constants.modulePath}/templates/party-sheet-box.hbs`,
            popOut: false
        })
    }

    /** @override */
    getData(options = {}) {
        options = super.getData(options)
        options.actors = this.getActors()
        options.frames = this.prepareActors(options.actors)
        options.isGM = game.users.current.isGM

        return options
    }

    getActors() {
        return game.users.filter(u => u.character && u.active).map(u => u.character)
    }

    prepareActors(actors) {
        let frames = []

        for (let a of actors) {
            frames.push({
                id: a.id,
                name: a.name,
                img: a.img,
                hpTempMaxPercent: a.data.data.attributes.hp.tempmax * 100 / (a.data.data.attributes.hp.max + a.data.data.attributes.hp.tempmax),
                hpValuePercent: a.data.data.attributes.hp.value * 100 / (a.data.data.attributes.hp.max + a.data.data.attributes.hp.tempmax),
                hpTempPercent: (a.data.data.attributes.hp.temp * 100 / (a.data.data.attributes.hp.max + a.data.data.attributes.hp.tempmax)) - 4,
                hpFull: a.data.data.attributes.hp.value === (a.data.data.attributes.hp.max + a.data.data.attributes.hp.tempmax),
                hpValue: a.data.data.attributes.hp.value,
                hpMax: a.data.data.attributes.hp.max + a.data.data.attributes.hp.tempmax,
                effects: a.data.effects.filter(e => e.data.disabled === false && e.isSuppressed === false && e.isTemporary),
                perception: a.data.data.skills.prc.passive,
                investigation: a.data.data.skills.inv.passive,
                insight: a.data.data.skills.inv.passive,
                stealth: a.data.data.skills.ste.passive
            })
        }

        return frames
    }

    activateListeners(html) {
        super.activateListeners(html)

        html.find('.actions .reposition-bottom').click(this.repositionBottom.bind(this))
        html.find('.portrait').dblclick(this.openSheet.bind(this))
    }

    repositionBottom() {
        game.settings.set(constants.moduleName, 'party-sheet-box-position', { top: window.innerHeight - this.element[0].offsetHeight - 5, left: 20 });
        ui.partySheet.render()
    }

    openSheet(ev) {
        ev.preventDefault()
        ev = ev || window.event
        const hud = $(ev.currentTarget).parent()
        const actorId = hud[0].dataset.id

        const actor = game.actors.get(actorId)
        if (actor && (actor.isOwner || game.users.current.isGM))
            actor.sheet._minimized ?
                actor.sheet.maximize() :
                actor.sheet.render(true)
    }
}