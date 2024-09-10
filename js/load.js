document.addEventListener('readystatechange', () => {
  document.readyState
  if (document.readyState === 'complete') {
    const timelineElements = [...document.querySelectorAll('#education .timeline li > div')]
    const loadingScreen = document.getElementById('loading-screen')

    loadingScreen.className = 'anim-out'

    loadingScreen.addEventListener('animationend', function () {
      this.style.display = 'none'

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

    // Scroll to url hash
    if (window.location.hash === '' || !(document.querySelector(window.location.hash) instanceof HTMLElement)) return
    if (window.location.hash === '#settings') app.setAttribute('data-flip', true)

    document.querySelector(window.location.hash).scrollIntoView({ block: 'start', behavior: 'instant' })
    document.querySelector(window.location.hash + ' h1 a').focus()
  } else {
    document.addEventListener('DOMContentLoaded', () => (document.getElementById('loading-screen').className = ''))
  }
})
