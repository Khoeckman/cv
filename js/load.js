let debounceLoadingScreen

document.addEventListener('readystatechange', () => {
  document.readyState
  if (document.readyState === 'complete') {
    const loading = document.getElementById('loading-screen')
    loading.className = 'anim-out'
    clearTimeout(debounceLoadingScreen)
    debounceLoadingScreen = setTimeout(() => (loading.hidden = true), 3000)

    // Scroll to url hash
    if (window.location.hash !== '' || !document.querySelector(window.location.hash) instanceof HTMLElement) return
    document.querySelector(window.location.hash).scrollIntoView()
    document.querySelector(window.location.hash + ' > div:first-child h1 a').focus()
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      const loading = document.getElementById('loading-screen')
      loading.className = ''
      loading.hidden = false
    })
  }
})
