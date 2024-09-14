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
const openNav = document.getElementById('open-nav')
const closeNav = document.getElementById('close-nav')

const aboutList = document.querySelectorAll('#personal li > *')
const timeline = document.querySelector('#education .timeline')
const odiseeContent = timeline.querySelectorAll('.odisee > div :is(h2, h2 + span, p)')
const collapsibleSummaries = document.querySelectorAll('.collapsible .toggle-collapse')
const collapsibleToggleButtons = [...document.querySelectorAll('.collapsible button[aria-controls]')]
let oldWidth = window.innerWidth

const resetCSSTransition = elements =>
  [elements].flat().forEach(el => {
    el.style.transition = 'none'
    el.getBoundingClientRect() // Force reset transition
    el.removeAttribute('style')
  })

window.addEventListener('resize', () => {
  collapsibleToggleButtons.forEach(button => toggleCollapse(button, false))

  if ((oldWidth > 960) ^ (window.innerWidth > 960)) {
    nav.ariaExpanded = window.innerWidth > 960

    const els = [app, ...aboutList, ...odiseeContent, ...collapsibleSummaries]
    els.forEach(el => el.removeAttribute('style'))

    resetCSSTransition(header)
    resetCSSTransition([openNav, closeNav])
    resetCSSTransition([...nav.querySelectorAll('li::after')])

    if (window.innerWidth <= 960) timeline.removeAttribute('style')
  }
  oldWidth = window.innerWidth
})
nav.ariaExpanded = window.innerWidth > 960

// Flip app

const settingsButton = nav.querySelector('li:last-child a')
const exitSettingsButton = document.getElementById('exit-settings')

const frontFocuseable = [
  ...app.querySelectorAll(':is(header, main:first-of-type) :is(a, button, input, select, textarea'),
]
const backFocuseable = [...app.querySelectorAll('main:last-of-type :is(a, button, input, select, textarea')]

settingsButton.addEventListener('click', () => {
  app.setAttribute('data-flip', true)
  app.querySelector('main:last-of-type a').focus()

  frontFocuseable.forEach(el => el.setAttribute('tabindex', -1))
  backFocuseable.forEach(el => el.removeAttribute('tabindex'))
})

exitSettingsButton.addEventListener('click', () => {
  app.setAttribute('data-flip', false)
  nav.querySelector('li:last-child a').focus()

  backFocuseable.forEach(el => el.setAttribute('tabindex', -1))
  frontFocuseable.forEach(el => el.removeAttribute('tabindex'))
})

// Toggle collapsibles

collapsibleToggleButtons.forEach(button => button.addEventListener('click', () => toggleCollapse(button)))

function toggleCollapse(el, expand) {
  const content = document.getElementById(el.getAttribute('formtarget'))
  expand ??= content.ariaHidden === 'true'

  el.innerText = expand ? 'Collapse' : 'Expand'
  el.ariaExpanded = expand
  content.style.setProperty(
    'height',
    expand
      ? `calc(${content.scrollHeight}px + 1rem + ${getComputedStyle(content).getPropertyValue(
          '--toggle-collapse-height'
        )})`
      : '0'
  )
  content.ariaHidden = !expand

  if (expand) content.focus()
}

// Age counter

const age = document.getElementById('age')

const updateAge = (now = ~~(Date.now() / 1000)) => {
  const birthday = ~~(new Date('2004 8 30 11:15:00').getTime() / 1000)
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
