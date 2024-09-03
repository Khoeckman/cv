const tracker = document.getElementById('tracker')
const app = document.getElementById('app')
const popout = document.querySelector('main .profile')
const container = document.querySelector('main .container')
const aboutList = [...document.querySelectorAll('#personal li > *')]

let currentRotX = 0
let currentRotY = 0
let rotX = 0
let rotY = 0

document.addEventListener('mousemove', e => {
  currentRotX = e.clientY / window.innerHeight - 0.5
  currentRotY = e.clientX / window.innerWidth - 0.5

  // Mouse tracker
  if (window.innerWidth <= 800) {
    tracker.hidden = true
    return
  }
  tracker.hidden = false
  tracker.style.left = e.pageX + 'px'
  tracker.style.top = e.pageY + 'px'
})

setInterval(() => {
  rotX += (currentRotX - rotX) / 20
  rotY += (currentRotY - rotY) / 20

  // Disable 3D styles on mobile
  if (window.innerWidth <= 800) {
    ;[app, popout, popout.children[0], ...aboutList].forEach(el => el.removeAttribute('style'))
    return
  }

  // 3D face elements towards mouse
  app.style.transform = 'perspective(8rem) rotateX(' + -rotX.toFixed(4) + 'deg) rotateY(' + rotY.toFixed(4) + 'deg)'
  depth(popout, 16)
  depth(popout.children[0], 8)
  depth(aboutList, 6)
}, 10)

const depth = (elements, depth) => {
  const transform = 'translate(' + (rotY * depth).toFixed(2) + 'px, ' + (rotX * depth).toFixed(2) + 'px)'

  if (elements instanceof HTMLElement) {
    elements.style.transform = transform
    return
  }
  elements.forEach(el => (el.style.transform = transform))
}

document.addEventListener('mousedown', () => tracker.classList.add('active'))
document.addEventListener('mouseup', () => tracker.classList.remove('active'))
