import { fullscreen, isWindowed } from './settings.js'
import { computeArticleOffsets } from './nav.js'
import { canvas } from './initParticles.js'

const loadingBar = document.querySelector('#loading-screen h2 span:first-child')

const updateLoaded = () => {
  loadingBar.style.width = loaded + '%'
}
let loaded = 20
updateLoaded()

let loader = setInterval(() => {
  loaded += (95 - loaded) / 8
  updateLoaded()
}, 500)

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'complete') {
    clearInterval(loader)
    loaded = 100
    updateLoaded()
  }
})

document.addEventListener('DOMContentLoaded', () => {
  loaded += (100 - loaded) / 4
  updateLoaded()
})

// Replace icon class
document.querySelectorAll('.icon').forEach(icon => {
  icon.classList.add('material-symbols-rounded')
  icon.ariaHidden = true
})

// Mobile / desktop switch

const header = document.querySelector('header')
const nav = header.querySelector('nav')
const openNavButton = document.getElementById('open-nav')
const closeNavButton = document.getElementById('close-nav')

const aboutList = document.querySelectorAll('#personal li > *')
const timeline = document.querySelector('#education .timeline')
const odiseeContent = timeline.querySelectorAll('.odisee .text')
const collapsibleSummaries = document.querySelectorAll('.collapsible .toggle-collapse')
const collapsibleToggleButtons = [...document.querySelectorAll('.collapsible button[aria-controls]')]
const collapsibleContent = [...document.querySelectorAll('.collapsible .content')]

const settings = document.getElementById('settings')
const tracker = document.getElementById('tracker')

let oldWidth = window.innerWidth

const resetCSSTransition = (...elements) =>
  [elements].flat().forEach(el => {
    el.style.transition = 'none'
    el.getBoundingClientRect() // Force reset transition
    el.removeAttribute('style')
  })

window.addEventListener('resize', () => {
  collapsibleContent.forEach(content => {
    if (content.ariaHidden === 'false') reflowCollapseContent(content, true, true)
  })

  if ((oldWidth > 960) ^ (window.innerWidth > 960)) {
    const windowed = isWindowed()

    if (windowed) {
      canvas.start()
      timeline.removeAttribute('style')
    } else canvas.stop()

    if (!fullscreen) nav.ariaExpanded = windowed
    tracker.hidden = window.innerWidth <= 960

    const els = [app, ...aboutList, ...odiseeContent, ...collapsibleSummaries]
    els.forEach(el => el.removeAttribute('style'))

    resetCSSTransition(header, openNavButton, closeNavButton, ...nav.querySelectorAll('li::after'), settings)
  }
  oldWidth = window.innerWidth
})
nav.ariaExpanded = isWindowed()
tracker.hidden = window.innerWidth <= 960

// Toggle collapsibles

collapsibleToggleButtons.forEach(button => button.addEventListener('click', () => toggleCollapse(button)))

function toggleCollapse(el, expand = undefined) {
  const content = document.getElementById(el.getAttribute('aria-controls'))
  expand ??= content.ariaHidden === 'true'

  el.innerText = expand ? 'Collapse' : 'Expand'
  el.ariaExpanded = expand
  reflowCollapseContent(content, expand)

  if (expand) content.focus()
}

function reflowCollapseContent(content, expand, forced = false) {
  content.ariaHidden = !expand

  if (!expand) {
    content.style.setProperty('height', 0)
    return
  }

  let height = `calc(${content.scrollHeight}px + 1rem + ${getComputedStyle(content).getPropertyValue('--toggle-collapse-height')})`

  if (forced) {
    content.style.removeProperty('height')
    height = `calc(${content.scrollHeight}px)`
  }

  content.style.setProperty('height', height)
}

collapsibleContent.forEach(el =>
  el.addEventListener('transitionend', e => {
    if (e.propertyName === 'height') computeArticleOffsets()
  })
)

// Age counter

const age = document.getElementById('age')

const updateAge = (now = ~~(Date.now() / 1000)) => {
  const birthday = ~~(new Date('2004-08-30T11:15:00').getTime() / 1000)
  const diff = now - birthday

  const year = ~~(diff / 31536000)
  const month = ~~((diff % (365.242374 * 86400)) / (30.4368645 * 86400))
  const day = ~~((diff % (30.4368645 * 86400)) / 86400)
  const hour = ~~((diff % 86400) / 3600)
  const minute = ~~((diff % 3600) / 60)
  const second = ~~(diff % 60)

  age.innerText = `${year}y ${month}m ${day}d ${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}:${
    second < 10 ? '0' : ''
  }${second}`
}

setInterval(() => {
  let now = ~~(Date.now() / 1000)

  // Prevent timer lag to mess up clock consistency
  setTimeout(() => {
    now = Math.min(now, ~~(Date.now() / 1000))
    updateAge(now)
  }, 50)
}, 1000)
updateAge()

// Form error message

/* const form = document.querySelector('#contact form')
const message = form.querySelector('.message')

const showFormError = e => {
  if (e.target.matches('button, input, textarea')) message.removeAttribute('hidden')
}

form.addEventListener('click', showFormError)
form.addEventListener('focusin', showFormError)
 */
