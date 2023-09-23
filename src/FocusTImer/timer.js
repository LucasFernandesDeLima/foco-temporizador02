import state from './state.js'
import * as el from './elements.js'
import { restTimer } from './actions.js'
import * as sound from './sound.js'

export function updateDisplay(minutes, seconds) {
  minutes = minutes ?? state.minutes
  seconds = seconds ?? state.seconds

  el.minutes.textContent = String(minutes).padStart(2, '0')
  el.seconds.textContent = String(seconds).padStart(2, '0')
}

export function countdown() {
  clearTimeout(state.idTimout)

  state.idTimout = setTimeout(() => {
    if (!state.countdownIsRunning) {
      return
    }

    let minutes = Number(el.minutes.textContent)
    let seconds = Number(el.seconds.textContent)

    --seconds

    if (seconds < 0) {
      minutes--
      seconds = 59
    }

    if (minutes < 0) {
      sound.AudioKichenTimer.play()
      restTimer()
      return
    }
    updateDisplay(minutes, seconds)
    countdown()
  }, 1000)
}
