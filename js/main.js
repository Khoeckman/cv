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

let loader = setInterval(() => {
  loaded += (98 - loaded) / 8
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

// Toggle nav
openNav.addEventListener('click', () => (nav.ariaExpanded = true))
closeNav.addEventListener('click', () => (nav.ariaExpanded = false))

document.addEventListener('resize', () => (nav.ariaExpanded = window.innerWidth > 800))
header.ariaExpanded = window.innerWidth > 800

// Auto change active nav button on scroll
let debounceNav

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
      offsetTop: article.offsetTop - paddingTop - 80, // Select next article 80 pixels before it scrolling past the top
    })
    i++
  }
  return titles
}

const scrollEventHandler = scrollTop => {
  // Scroll image
  odiseeImage.style.backgroundPosition = 'center ' + (-scrollTop / odiseeImage.offsetHeight) * 25 + '%'

  clearTimeout(debounceNav)

  debounceNav = setTimeout(() => {
    for (let article of computeArticleOffsets()) {
      if (article.offsetTop <= scrollTop) {
        document.querySelector('header nav .active').classList.remove('active')
        article.navButton.classList.add('active')
        break
      }
    }
  }, 500)
}

document.addEventListener('scroll', () => scrollEventHandler(document.documentElement.scrollTop), { passive: true })
container.addEventListener('scroll', () => scrollEventHandler(container.scrollTop), { passive: true })

const navButtons = document.querySelectorAll('header nav li a')

navButtons.forEach(el =>
  el.addEventListener('click', e => {
    if (e.currentTarget.ariaLabel === 'Translate') return

    document.querySelector('header nav .active').classList.remove('active')
    e.currentTarget.parentElement.classList.add('active')
  })
)
