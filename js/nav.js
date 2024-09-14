const header = document.querySelector('header')
const nav = header.querySelector('nav')
const main = document.querySelector('main')
const container = document.querySelector('main .container')
const articles = [...container.querySelectorAll('article')]

let articleOffsets = computeArticleOffsets()

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'complete') {
    // Auto change active nav button on scroll

    const odiseeImage = document.querySelector('#education .timeline .odisee > div')
    let debounceNav

    const scrollEventHandler = scrollTop => {
      // Odisee image parallax effect
      odiseeImage.style.backgroundPosition = 'center ' + -scrollTop / 5 + '%'

      // Auto update active nav button on scroll
      clearTimeout(debounceNav)

      debounceNav = setTimeout(() => {
        for (let article of articleOffsets) {
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

    document.addEventListener('resize', () => (articleOffsets = computeArticleOffsets()))

    document.addEventListener('scroll', () => scrollEventHandler(document.documentElement.scrollTop))
    main.addEventListener('scroll', () => scrollEventHandler(main.scrollTop))
    container.addEventListener('scroll', () => scrollEventHandler(container.scrollTop))
  }
})

function computeArticleOffsets() {
  let titles = []
  let i = 1

  for (let article of articles) {
    const paddingTop = window
      .getComputedStyle(container)
      .getPropertyValue('padding-top')
      .match(/(\d*)([\s\S]*)/)[1]
    const threshold = Math.min(~~(window.innerHeight * 0.25), ~~(container.offsetHeight * 0.5))

    titles.unshift({
      navButton: nav.querySelector('ul').children[i],
      offsetTop: article.offsetTop - paddingTop - threshold, // Select next article when its scrolled past ${treshold}% of the container
    })
    i++
  }
  return titles
}

// Apply class to active nav button
const navButtons = nav.querySelectorAll('li:not(:first-child):not(:last-child) a')

navButtons.forEach(el =>
  el.addEventListener('click', e => {
    if (e.currentTarget.ariaLabel === 'Translate') return

    header.querySelector('nav .active').classList.remove('active')
    e.currentTarget.parentElement.classList.add('active')
  })
)

// Toggle nav

const openNav = document.getElementById('open-nav')
const closeNav = document.getElementById('close-nav')

openNav.addEventListener('click', () => (nav.ariaExpanded = true))
closeNav.addEventListener('click', () => (nav.ariaExpanded = false))
