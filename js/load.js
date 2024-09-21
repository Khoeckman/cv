let observing

document.addEventListener('readystatechange', () => {
  document.readyState
  if (document.readyState === 'complete') {
    const loadingScreen = document.getElementById('loading-screen')

    loadingScreen.className = 'anim-out'

    loadingScreen.addEventListener('animationend', function () {
      document.body.removeAttribute('style')
      document.body.removeChild(this)

      // Scroll animations for education
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.remove('observe')
              entry.target.classList.add('observed')
            }
          })
        },
        { threshold: 0.75 }
      )
      observing.forEach(el => observer.observe(el))
    })

    // Scroll to url hash
    if (window.location.hash === '' || !(document.querySelector(window.location.hash) instanceof HTMLElement)) return

    if (window.location.hash === '#settings') {
      app.setAttribute('data-flip', true)

      const disableEls = [...app.querySelectorAll(':is(header, main) :is(a, button, input, select, textarea):not(#open-nav)')]
      disableEls.forEach(el => el.setAttribute('tabindex', -1))

      document.getElementById('close-nav').tabIndex = -1
      document.querySelector('header nav').ariaExpanded = false
    }

    document.querySelector(window.location.hash).scrollIntoView({ block: 'start', behavior: 'instant' })
    document.querySelector(window.location.hash + ' h1 a').focus()
  }
})
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.overflow = 'hidden'
  document.getElementById('loading-screen').className = ''

  const observed = document.querySelectorAll('.observe')
  const aboutList = document.querySelectorAll('#personal .personal-info li')
  const languagesTable = document.querySelectorAll('#personal .languages')
  const hobbies = document.querySelectorAll('#personal .hobbies li')
  const timelineElements = document.querySelectorAll('#education .timeline li > div')

  observing = [...observed, ...aboutList, ...languagesTable, ...hobbies, ...timelineElements]
  observing.forEach(el => el.classList.add('observe'))
})
