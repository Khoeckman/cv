const header = document.querySelector('header')
const nav = header.querySelector('nav')
const main = document.querySelector('main')
const container = main.querySelector('.container')
const articles = [...container.querySelectorAll('article')]

let articleOffsets

const odiseeImage = document.querySelector('#education .timeline .odisee > div')
let debounceNav

export const scrollEventHandler = el => {
  const scrollTop = el.scrollTop

  // Odisee image parallax effect
  odiseeImage.style.backgroundPosition = 'center ' + -scrollTop / 5 + '%'

  // Auto update active nav button 500ms after last event
  clearTimeout(debounceNav)

  debounceNav = setTimeout(() => {
    for (let article of articleOffsets) {
      if (article.offsetTop <= scrollTop) {
        nav.querySelector('.active').removeAttribute('class')
        article.navButton.classList.add('active')

        // Update url with current article
        history?.pushState(null, null, article.navButton.children[0].hash)
        break
      }
    }
  }, 500)
}

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'complete') {
    // Auto change active nav button on scroll or resize
    window.addEventListener('resize', computeArticleOffsets)
    computeArticleOffsets()

    document.addEventListener('scroll', () => scrollEventHandler(document.documentElement))
    main.addEventListener('scroll', () => scrollEventHandler(main))
    container.addEventListener('scroll', () => scrollEventHandler(container))
  }
})

export function computeArticleOffsets() {
  let titles = []
  let i = 1

  for (let article of articles) {
    const paddingTop = window
      .getComputedStyle(container)
      .getPropertyValue('padding-top')
      .match(/(\d*)([\s\S]*)/)[1]

    titles.unshift({
      navButton: nav.querySelector('ul').children[i],
      offsetTop: article.offsetTop - paddingTop - window.innerHeight * 0.25, // Select next article when its scrolled past 25% of the container
    })
    i++
  }
  articleOffsets = titles // Assign to top-level variable
}

// Apply class to active nav button
const navButtons = nav.querySelectorAll('li:not(:first-child):not(:last-child) a')

navButtons.forEach(el =>
  el.addEventListener('click', e => {
    header.querySelector('nav .active').removeAttribute('class')
    e.currentTarget.parentElement.classList.add('active')
    closeNav()
  })
)

// Toggle mobile nav

const openNavButton = document.getElementById('open-nav')
const closeNavButton = document.getElementById('close-nav')

export const openNav = () => {
  openNavButton.tabIndex = -1
  closeNavButton.removeAttribute('tabindex')
  closeNavButton.focus()
  nav.ariaExpanded = true
}
openNavButton.addEventListener('click', openNav)

export const closeNav = (focus = true) => {
  closeNavButton.tabIndex = -1

  if (focus) {
    openNavButton.removeAttribute('tabindex')
    openNavButton.focus()
  }
  nav.ariaExpanded = false
}
closeNavButton.addEventListener('click', () => closeNav())

// Fix weird browser glitch where CSS classes don't correctly pickup browser focus

document.querySelectorAll('a[data-focus]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault()
    document.querySelector(a.dataset.focus).parentElement.parentElement.querySelector('a.overlay')?.focus()
  })
})
