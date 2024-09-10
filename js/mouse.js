const tracker = document.getElementById('tracker')
const app = document.getElementById('app')
const timeline = document.querySelector('.timeline')

let currentRotX = 0
let currentRotY = 0
let rotX = 0
let rotY = 0

document.addEventListener('mousemove', e => {
  // Mouse tracker
  if (window.innerWidth <= 960) {
    tracker.hidden = true
    return
  }
  tracker.hidden = false
  tracker.style.left = e.pageX + 'px'
  tracker.style.top = e.pageY + 'px'

  // 3D rotation effect towards mouse
  currentRotX = e.clientY / window.innerHeight - 0.5
  currentRotY = e.clientX / window.innerWidth - 0.5
})

setInterval(() => {
  rotX += (currentRotX - rotX) / 16
  rotY += (currentRotY - rotY) / 16

  // Rotate timeline dots light shine
  timeline.style.setProperty('--shadow-x', (-rotY * 16).toFixed(2) + 'px')
  timeline.style.setProperty('--shadow-y', (-rotX * 16).toFixed(2) + 'px')

  // 3D rotation effect towards mouse
  app.style.transform =
    'perspective(160rem) rotateX(' + (-rotX * 16).toFixed(2) + 'deg) rotateY(' + (rotY * 16).toFixed(2) + 'deg)'
}, 16)

document.addEventListener('mousedown', () => tracker.classList.add('active'))
document.addEventListener('mouseup', () => tracker.classList.remove('active'))
