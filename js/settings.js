// Deserialize from localStorage

let storage

try {
  storage = JSON.parse(localStorage.getItem('portfolio-kh')) ?? {}
} catch (err) {
  localStorage.removeItem('portfolio-kh')
  storage = {}
}

export let language = storage?.language ?? 'English'
export let fullscreen = storage?.fullscreen ?? false
export let particles = storage?.particles ?? false
export let enable3D = storage?.enable3D ?? true
export let rainbow = storage?.rainbow ?? false

// Rainbow
let hue = 200

const animateHue = () => {
  document.documentElement.style.setProperty('--pri', 'hsl(' + hue + ', 100%, 50%)')
  document.documentElement.style.setProperty('--pri-d', 'hsl(' + hue + ', 100%, 30%)')
  document.documentElement.style.setProperty('--pri-l', 'hsl(' + hue + ', 100%, 70%)')

  if (!rainbow) return
  requestAnimationFrame(animateHue)
  hue = (hue + 0.2) % 360
}
if (rainbow) animateHue()

const form = document.querySelector('#settings form')

form.elements['language'].value = language
form.elements['fullscreen'].checked = fullscreen
form.elements['particles'].checked = particles
form.elements['enable-3d'].checked = enable3D
form.elements['rainbow'].checked = rainbow

form.addEventListener('submit', function (e) {
  e.preventDefault()

  language = this.elements['language'].value
  fullscreen = this.elements['fullscreen'].checked
  enable3D = this.elements['enable-3d'].checked

  if (this.elements['rainbow'].checked) {
    rainbow = true
    animateHue()
  } else {
    rainbow = false
    hue = 200
  }

  // Serialize to localStorage
  storage.language = language
  storage.fullscreen = fullscreen
  storage.particles = particles
  storage.enable3D = enable3D
  storage.rainbow = rainbow

  localStorage.setItem('portfolio-kh', JSON.stringify(storage))
})

const defaultButton = document.getElementById('settings-default')

defaultButton.addEventListener('click', () => {
  form.elements['language'].value = storage.language = language = 'English'
  form.elements['fullscreen'].checked = storage.fullscreen = fullscreen = false
  form.elements['particles'].checked = storage.particles = particles = true
  form.elements['enable-3d'].checked = storage.enable3D = enable3D = true
  form.elements['rainbow'].checked = storage.rainbow = rainbow = false
  rainbow = false
  hue = 200

  localStorage.setItem('portfolio-kh', JSON.stringify(storage))
})
