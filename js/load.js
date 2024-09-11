document.addEventListener('readystatechange', () => {
  document.readyState
  if (document.readyState === 'complete') {
    const timelineElements = [...document.querySelectorAll('#education .timeline li > div')]
    const loadingScreen = document.getElementById('loading-screen')

    loadingScreen.className = 'anim-out'

    loadingScreen.addEventListener('animationend', function () {
      document.body.removeChild(this)

      // Scroll animations for education
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('anim-in')
          })
        },
        { threshold: 0.75 }
      )
      timelineElements.forEach(el => observer.observe(el))
    })

    // Disable backface focus
    const disableEls =
      window.location.hash === '#settings'
        ? [...app.querySelectorAll(':is(header, main:first-of-type) :is(a, button, input, select, textarea')]
        : [...app.querySelectorAll('main:last-of-type :is(a, button, input, select, textarea')]
    disableEls.forEach(el => el.setAttribute('tabindex', -1))

    // Scroll to url hash
    if (window.location.hash === '' || !(document.querySelector(window.location.hash) instanceof HTMLElement)) return
    if (window.location.hash === '#settings') app.setAttribute('data-flip', true)

    document.querySelector(window.location.hash).scrollIntoView({ block: 'start', behavior: 'instant' })
    document.querySelector(window.location.hash + ' h1 a').focus()
  }
})
document.addEventListener('DOMContentLoaded', () => (document.getElementById('loading-screen').className = ''))
