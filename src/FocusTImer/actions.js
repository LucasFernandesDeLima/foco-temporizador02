import state from './state.js'
import * as timer from './timer.js'
import * as el from './elements.js'
import * as sound from './sound.js'

export function toggleCountdownExecution() {
  state.countdownIsRunning =
    document.documentElement.classList.toggle('time-is-running')
  timer.countdown()
  disableButtonsPlusMinus()
  enableButtonsStop()
  sound.AudioButtonPress.play()
}

export function restTimer() {
  document.documentElement.classList.remove('time-is-running')
  state.countdownIsRunning = false
  timer.updateDisplay()
  enableButtonsPlusMinus()
  disableButtonsStop()
  sound.AudioButtonPress.play()
}

export function addTime() {
  let setMinutes = Number(el.minutes.textContent)
  let setMinuteAccumulator = setMinutes + 5
  const definedMinutesIsGreaterThanSixty = setMinuteAccumulator > 60

  if (definedMinutesIsGreaterThanSixty) {
    return
  }
  timer.updateDisplay(setMinuteAccumulator, 0)
}

export function removeTime() {
  let setMinutes = Number(el.minutes.textContent)
  let minutesSetDecremented = setMinutes - 5
  const definedMinutesIsLessThanZero = minutesSetDecremented < 0

  if (definedMinutesIsLessThanZero) {
    return
  }
  timer.updateDisplay(minutesSetDecremented, 0)
}

export function pauseBackgroundMusic(musicOn) {
  sound[musicOn].pause()
  document.getElementById(musicOn).classList.remove('musicon')
  sound.AudioButtonPress.play()
}

export function playBackgroundMusic(selectedAudio) {
  sound[selectedAudio].play()
  state.musicOn = selectedAudio
  sound.AudioButtonPress.play()
}

function disableButtonsPlusMinus() {
  el.controls.querySelector('.ph-plus-circle').setAttribute('disabled', true)
  el.controls.querySelector('.ph-minus-circle').setAttribute('disabled', true)
}

function enableButtonsPlusMinus() {
  el.controls.querySelector('.ph-plus-circle').removeAttribute('disabled')
  el.controls.querySelector('.ph-minus-circle').removeAttribute('disabled')
}

function enableButtonsStop() {
  if (el.buttonStop.disabled) {
    el.buttonStop.removeAttribute('disabled')
  }
}

function disableButtonsStop() {
  el.buttonStop.setAttribute('disabled', true)
}
