const loadingBar = document.querySelector('#loading-screen h2 span:first-child')

const updateLoaded = () => {
  loadingBar.style.right = 100 - loaded + '%'
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

// Replace anchor's external class
document
  .querySelectorAll('a.external')
  .forEach(a => (a.innerHTML = '<span class="icon material-symbols-rounded" aria-hidden="true">open_in_new</span>'))

// Clone image to blur it as background
document.querySelectorAll('.image-blur').forEach(a => (a.innerHTML += a.innerHTML))

// Apply class to active nav button
const header = document.querySelector('header')
const nav = header.querySelector('nav')
const navButtons = nav.querySelectorAll('li a')

navButtons.forEach(el =>
  el.addEventListener('click', e => {
    if (e.currentTarget.ariaLabel === 'Translate') return

    header.querySelector('nav .active').classList.remove('active')
    e.currentTarget.parentElement.classList.add('active')
  })
)

// Toggle nav

const resetTransition = elements =>
  [elements].flat().forEach(el => {
    el.style.transition = 'none'
    el.getBoundingClientRect() // Force reset transition
    el.removeAttribute('style')
  })

const openNav = document.getElementById('open-nav')
const closeNav = document.getElementById('close-nav')

openNav.addEventListener('click', () => (nav.ariaExpanded = true))
closeNav.addEventListener('click', () => (nav.ariaExpanded = false))

// Mobile / desktop switch

let oldWidth = window.innerWidth

window.addEventListener('resize', () => {
  if ((oldWidth > 960) ^ (window.innerWidth > 960)) {
    nav.ariaExpanded = window.innerWidth > 960

    resetTransition(header)
    resetTransition([openNav, closeNav])
    resetTransition([...nav.querySelectorAll('li::after')])
  }
  oldWidth = window.innerWidth
})
nav.ariaExpanded = window.innerWidth > 960

// Auto change active nav button on scroll

const container = document.querySelector('main .container')
const articles = [...container.querySelectorAll('article')]

const computeArticleOffsets = () => {
  let titles = []
  let i = 1

  for (let article of articles) {
    const h1 = article.querySelector('h1')
    const paddingTop = window
      .getComputedStyle(container)
      .getPropertyValue('padding-top')
      .match(/(\d*)([\s\S]*)/)[1]

    titles.unshift({
      navButton: nav.querySelector('ul').children[i],
      innerText: h1?.innerText,
      offsetTop: article.offsetTop - paddingTop - ~~(window.innerHeight * 0.25), // Select next article when its scrolled past half the screen
    })
    i++
  }
  return titles
}

const odiseeImage = document.querySelector('#education .timeline .odisee > div')
let debounceNav

const scrollEventHandler = scrollTop => {
  // Odisee image parallax effect
  odiseeImage.style.backgroundPosition = 'center ' + -scrollTop / 5 + '%'

  // Auto update active nav button on scroll
  clearTimeout(debounceNav)

  debounceNav = setTimeout(() => {
    for (let article of computeArticleOffsets()) {
      if (article.offsetTop <= scrollTop) {
        nav.querySelector('.active').classList.remove('active')
        article.navButton.classList.add('active')

        // Update url with current article
        history?.pushState(null, null, article.navButton.children[0].hash)
        break
      }
    }
  }, 500)
}

document.addEventListener('scroll', () => scrollEventHandler(document.documentElement.scrollTop))
container.addEventListener('scroll', () => scrollEventHandler(container.scrollTop))

// Toggle collapsibles

const collapsibles = [...document.querySelectorAll('.toggle-collapse')]

collapsibles.forEach(collapsible => {
  collapsible.addEventListener('click', function () {
    const target = document.getElementById(this.getAttribute('formtarget'))
    target.ariaExpanded = target.ariaExpanded !== 'true'
  })
})

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

// Programming skills filter

const filterForm = document.querySelector('#programming-skills form')
const psFieldsets = [...document.querySelectorAll('#programming-skills .skills-list fieldset')]

const psFilter = tag => {
  psFieldsets.forEach(fieldset => {
    const tags = fieldset.getAttribute('data-tags').split(',')

    if (tags.includes(tag)) fieldset.removeAttribute('style')
    else fieldset.style.display = 'none'
  })
}

filterForm.addEventListener(
  'click',
  e => {
    if (!e.target.matches('input')) return
    psFilter(e.target.getAttribute('data-tag'))
  },
  true
)
psFilter('lang')
