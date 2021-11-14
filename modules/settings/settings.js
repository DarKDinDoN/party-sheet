import constants from './constants.js'

const partySheetDefault = { top: 500, left: 20 }

export default function registerSettings() {
    game.settings.register(constants.moduleName, 'party-sheet-box-position', {
        scope: 'client',
        config: false,
        default: partySheetDefault
    })

    game.settings.register(constants.moduleName, 'party-sheet-hide-default-players', {
        name: 'Hide the default players HUD',
        hint: 'Enable this to hide the default players HUD (bottom left side of the screen).',
        scope: 'client',
        config: true,
        type: Boolean,
        default: false,
        onChange: value => {
            window.location.reload()
        }
    })

    game.settings.register(constants.moduleName, 'party-sheet-auto-reposition', {
        name: 'Update the HUD position automatically',
        hint: 'Automatically update de the HUD position when a new player log in or log off.',
        scope: 'client',
        config: true,
        type: Boolean,
        default: false
    })
}