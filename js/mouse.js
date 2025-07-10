import { fullscreen, enable3D } from './settings.js'

const tracker = document.getElementById('tracker')
const app = document.getElementById('app')
const aboutList = document.querySelectorAll('#personal .personal-info li > *')
const languagesTable = document.querySelectorAll('#personal .languages')
const timeline = document.querySelector('#education .timeline')
const odiseeContent = timeline.querySelectorAll('.odisee .text')
const settingsLabels = document.querySelectorAll('#settings form label > :is(span, input, select)')
const depthEls = [...aboutList, ...languagesTable, ...odiseeContent, ...settingsLabels]

let currentRotX = 0
let currentRotY = 0
let rotX = 0
let rotY = 0

document.addEventListener('mousemove', e => {
  // Mouse tracker
  tracker.style.left = e.pageX + 'px'
  tracker.style.top = e.pageY + 'px'

  // 3D rotation effect towards mouse
  if (!enable3D) return
  currentRotX = e.clientY / window.innerHeight - 0.5
  currentRotY = e.clientX / window.innerWidth - 0.5
})

setInterval(() => {
  // Disable 3D styles when disabled or on mobile
  if (fullscreen || !enable3D || window.innerWidth <= 960) {
    app.removeAttribute('style')
    currentRotX = rotX = 0
    currentRotY = rotY = 0
    depth(depthEls, false)
    return
  }

  rotX += (currentRotX - rotX) / 16
  rotY += (currentRotY - rotY) / 16

  // Rotate timeline dots light shine
  timeline.style.setProperty('--shadow-x', (-rotY * 16).toFixed(2) + 'px')
  timeline.style.setProperty('--shadow-y', (-rotX * 16).toFixed(2) + 'px')

  // 3D rotation effect towards mouse
  app.style.transform = 'perspective(160rem) rotateX(' + (-rotX * 16).toFixed(2) + 'deg) rotateY(' + (rotY * 16).toFixed(2) + 'deg)'

  depth(depthEls, 6)
}, 16)

const depth = (els, depth) => {
  els = [els].flat()

  if (depth === false) {
    els.forEach(el => el.style.removeProperty('transform'))
    return
  }

  const transform = 'translate(' + (rotY * depth).toFixed(2) + 'px, ' + (rotX * depth).toFixed(2) + 'px)'
  els.forEach(el => (el.style.transform = transform))
}

document.addEventListener('mousedown', () => tracker.classList.add('active'))
document.addEventListener('mouseup', () => tracker.classList.remove('active'))
