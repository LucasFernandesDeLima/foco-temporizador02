import { controls, sounds } from './elements.js'
import * as actions from './actions.js'
import state from './state.js'
import * as sound from './sound.js'

export function registerControls() {
  controls.addEventListener('click', event => {
    const action = event.target.dataset.action

    if (typeof actions[action] != 'function') {
      return
    }

    actions[action]()
  })

  sounds.addEventListener('click', event => {
    const selectedAudio = event.target.dataset.audio
    const musicOn = state.musicOn

    const musicOnIsEqualSelectedAudio = musicOn == selectedAudio
    const musicOnIsDifferentSelectedAudioAndNull =
      musicOn != selectedAudio && musicOn != null

    if (typeof sound[selectedAudio] != 'object') {
      return 'return'
    }

    document.getElementById(selectedAudio).classList.toggle('musicon')
    if (musicOnIsDifferentSelectedAudioAndNull) {
      actions.pauseBackgroundMusic(musicOn)
    }

    if (musicOnIsEqualSelectedAudio) {
      actions.pauseBackgroundMusic(musicOn)
      state.musicOn = null
      return
    }

    actions.playBackgroundMusic(selectedAudio)
  })
}
