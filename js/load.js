document.addEventListener('readystatechange', () => {
  document.readyState
  if (document.readyState === 'complete') {
    const timelineElements = [...document.querySelectorAll('#education .timeline li > div')]

    document.getElementById('loading-screen').className = 'anim-out'

    // Scroll to url hash
    if (window.location.hash === '' || !(document.querySelector(window.location.hash) instanceof HTMLElement)) return

    document.querySelector(window.location.hash).scrollIntoView({ block: 'start', behavior: 'instant' })
    document.querySelector(window.location.hash + ' h1 a').focus()

    // Scroll animations for education
    setTimeout(function () {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('anim-in')
          })
        },
        { threshold: 0.75 }
      )

      timelineElements.forEach(el => observer.observe(el))
    }, 300)
  } else {
    document.addEventListener('DOMContentLoaded', () => (document.getElementById('loading-screen').className = ''))
  }
})
