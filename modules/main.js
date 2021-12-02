import constants from './settings/constants.js'
import registerSettings from './settings/settings.js'
import PartySheetApplication from './apps/PartySheetApplication.js'

Hooks.once('init', () => {
    registerSettings()
})

Hooks.once('ready', () => {
    PartySheetApplication.init()
})

Hooks.on('canvasReady', () => {
    if (ui.partySheet) ui.partySheet.render()
    setTimeout(() => {
        if (ui.partySheet?.rendered && game.settings.get(constants.moduleName, 'party-sheet-auto-reposition')) ui.partySheet.repositionBottom()
    }, 3000)
})

Hooks.on('renderPlayerList', (players, html) => {
    if (game.settings.get(constants.moduleName, 'party-sheet-hide-default-players')) html[0].style.display = 'none'
    if (ui.partySheet) ui.partySheet.render()
    setTimeout(() => {
        if (ui.partySheet?.rendered && game.settings.get(constants.moduleName, 'party-sheet-auto-reposition')) ui.partySheet.repositionBottom()
    }, 500)
})

Hooks.on('updateActor', actor => {
    if (!ui.partySheet?.rendered) return

    const playerCharacters = game.users.filter(u => u.character && u.active).map(u => u.character._id)
    if (playerCharacters.includes(actor._id)) ui.partySheet.render()
})

Hooks.on('createActiveEffect', effect => {
    if (!ui.partySheet?.rendered) return

    const playerCharacters = game.users.filter(u => u.character && u.active).map(u => u.character._id)
    if (playerCharacters.includes(effect.parent._id)) ui.partySheet.render()
})

Hooks.on('updateActiveEffect', effect => {
    if (!ui.partySheet?.rendered) return

    const playerCharacters = game.users.filter(u => u.character && u.active).map(u => u.character._id)
    if (playerCharacters.includes(effect.parent._id)) ui.partySheet.render()
})

Hooks.on('deleteActiveEffect', effect => {
    if (!ui.partySheet?.rendered) return

    const playerCharacters = game.users.filter(u => u.character && u.active).map(u => u.character._id)
    if (playerCharacters.includes(effect.parent._id)) ui.partySheet.render()
})