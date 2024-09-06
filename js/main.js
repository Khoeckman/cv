const loadingBar = document.querySelector('#loading-screen h2 div')
const header = document.querySelector('header')
const nav = header.querySelector('nav')
const openNav = document.getElementById('open-nav')
const closeNav = document.getElementById('close-nav')
const container = document.querySelector('main .container')
const articles = [...container.querySelectorAll('article')]
const education = document.querySelector('#education')
const odiseeImage = education.querySelector('.timeline .odisee > div')

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
document.querySelectorAll('a.external').forEach(a => {
  a.innerHTML = '<span class="icon material-symbols-rounded" aria-hidden="true">open_in_new</span>'
})

// Apply class to active nav button
const navButtons = document.querySelectorAll('header nav li a')

navButtons.forEach(el =>
  el.addEventListener('click', e => {
    if (e.currentTarget.ariaLabel === 'Translate') return

    document.querySelector('header nav .active').classList.remove('active')
    e.currentTarget.parentElement.classList.add('active')
  })
)

// Toggle nav

const resetTransition = elements =>
  [elements].flat().forEach(el => {
    el.style.transition = 'none'
    el.getBoundingClientRect() // Force reset transition
    el.removeAttribute('style')

    // Randomly doesn't work if done immediately
    setTimeout(() => el.removeAttribute('style'), 500)
  })

openNav.addEventListener('click', () => (nav.ariaExpanded = true))
closeNav.addEventListener('click', () => (nav.ariaExpanded = false))

// Mobile / desktop switch

let oldWidth = window.innerWidth

window.addEventListener('resize', () => {
  if ((oldWidth > 960) ^ (window.innerWidth > 960)) {
    nav.ariaExpanded = window.innerWidth > 960

    resetTransition(header)
    resetTransition([openNav, closeNav])
    resetTransition([...document.querySelectorAll('header nav li::after')])
  }
  oldWidth = window.innerWidth
})
nav.ariaExpanded = window.innerWidth > 960

// Auto change active nav button on scroll
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
      navButton: document.querySelector('header nav ul').children[i],
      innerText: h1?.innerText,
      offsetTop: article.offsetTop - paddingTop - ~~(window.innerHeight * 0.25), // Select next article when its scrolled past half the screen
    })
    i++
  }
  return titles
}

let debounceNav

const scrollEventHandler = scrollTop => {
  // Odisee image parallax effect
  odiseeImage.style.backgroundPosition = 'center ' + -scrollTop / 5 + '%'

  // Auto update active nav button on scroll
  clearTimeout(debounceNav)

  debounceNav = setTimeout(() => {
    for (let article of computeArticleOffsets()) {
      if (article.offsetTop <= scrollTop) {
        document.querySelector('header nav .active').classList.remove('active')
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
