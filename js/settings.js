import { closeNav } from './nav.js'
import { canvas } from './initParticles.js'

const app = document.getElementById('app')
const form = document.querySelector('#settings form')
if (!(form instanceof HTMLFormElement)) console.error('Form element not found')

// Rainbow animation
let counter = 0
let animating = false
let hue = 201

const animateHue = (init = true) => {
  // Prevent parallel requests
  if (init && animating) return
  if (!rainbow) {
    animating = false
    hue = 201
    document.documentElement.removeAttribute('style')
    return
  }

  if (++counter >= 5) {
    counter = 0
    document.documentElement.style.setProperty('--pri', 'hsl(' + hue + ', 100%, 50%)')
    document.documentElement.style.setProperty('--pri-d', 'hsl(' + hue + ', 100%, 30%)')
    document.documentElement.style.setProperty('--pri-l', 'hsl(' + hue + ', 100%, 70%)')

    document.documentElement.style.setProperty('--text-pri', 'var(--' + (hue < 21 || hue > 200 ? 'white' : 'black') + ')')

    hue = (hue + 1) % 360
  }
  animating = !!('' + requestAnimationFrame(() => animateHue(false)))
}

let storage

export let language
export let fullscreen
export let particles
export let enable3D
export let rainbow
export const isWindowed = () => !fullscreen && particles && window.innerWidth > 960

const saveToStorage = () => {
  storage.language = language = form.elements['language'].value
  storage.fullscreen = fullscreen = form.elements['fullscreen'].checked
  storage.particles = particles = form.elements['particles'].checked
  storage.enable3D = enable3D = form.elements['enable-3d'].checked
  storage.rainbow = rainbow = form.elements['rainbow'].checked

  if (fullscreen) app.classList.add('fullscreen')
  else {
    app.removeAttribute('class')
    window.scrollTo({ top: 1, left: 0, behavior: 'instant' })
  }

  if (isWindowed()) canvas.start()
  else canvas.stop()

  if (rainbow) animateHue()

  localStorage.setItem('kh-cv', JSON.stringify(storage))
}

const loadFromStorage = (reset = false) => {
  try {
    if (reset === true || !(storage = JSON.parse(localStorage.getItem('kh-cv')))) throw new Error()
  } catch (err) {
    localStorage.removeItem('kh-cv')
    storage = {}
  }

  form.elements['language'].value = language = storage?.language ?? 'English'
  form.elements['fullscreen'].checked = fullscreen = storage?.fullscreen ?? false
  form.elements['particles'].checked = particles = storage?.particles ?? true
  form.elements['enable-3d'].checked = enable3D = storage?.enable3D ?? true
  form.elements['rainbow'].checked = rainbow = storage?.rainbow ?? false

  saveToStorage()
}

loadFromStorage()

form.addEventListener('submit', e => {
  e.preventDefault()
  saveToStorage()
})

const cancelButton = document.getElementById('settings-cancel')
cancelButton.addEventListener('click', () => loadFromStorage())

const resetButton = document.getElementById('settings-reset')
resetButton.addEventListener('click', () => loadFromStorage(true))

// Open and close settings

const settingsButton = document.querySelector('header nav li:last-child a')
const exitSettingsButton = document.getElementById('exit-settings')

const frontFocuseable = [...app.querySelectorAll(':is(header, main) :is(a, button, input, select, textarea):not(#open-nav, #close-nav)')]
const backFocuseable = [...settings.querySelectorAll(':is(a, button, input, select, textarea)')]

settingsButton.addEventListener('click', () => {
  app.setAttribute('data-flip', true)
  settings.querySelector('a').focus()

  frontFocuseable.forEach(el => el.setAttribute('tabindex', -1))
  backFocuseable.forEach(el => el.removeAttribute('tabindex'))

  closeNav(false)
})

exitSettingsButton.addEventListener('click', () => {
  app.setAttribute('data-flip', false)
  document.querySelector('header nav li:last-child a').focus()

  backFocuseable.forEach(el => el.setAttribute('tabindex', -1))
  frontFocuseable.forEach(el => el.removeAttribute('tabindex'))

  loadFromStorage()
})
