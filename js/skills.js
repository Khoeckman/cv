import { computeArticleOffsets } from './nav.js'

const programmingSkills = [
  { name: 'HTML5', imgName: 'html5', tags: ['markup', 'front'], usingSince: 2016 },
  { name: 'CSS3', imgName: 'css3', tags: ['markup', 'design', 'front'], usingSince: 2019 },
  { name: 'JavaScript', imgName: 'js', tags: ['lang', 'front'], usingSince: 2019 },
  { name: 'Vue.js', imgName: 'vue-js', tags: ['fw', 'front'], usingSince: 2024 },
  { name: 'Vite', imgName: 'vite', tags: ['front'], usingSince: 2023 },
  { name: 'Node.js', imgName: 'node-js', tags: ['fw', 'back'], usingSince: 2021 },
  { name: 'Python', imgName: 'python', tags: ['lang', 'back'], usingSince: 2020 },
  { name: 'PHP', imgName: 'php', tags: ['lang', 'back'], usingSince: 2023 },
  { name: 'Laravel', imgName: 'laravel', tags: ['fw', 'back'], usingSince: 2024 },
  { name: 'Java', imgName: 'java', tags: ['lang', 'back'], usingSince: 2022 },
  { name: 'Shopware', imgName: 'shopware', tags: ['fw', 'front', 'back'], usingSince: 2025 },
  { name: 'C#', imgName: 'c-sharp', tags: ['lang', 'back'], usingSince: 2023 },
  { name: 'Arduino', imgName: 'arduino', tags: ['lang', 'fun'], usingSince: 2020 },
  { name: 'MySQL', imgName: 'mysql', tags: ['db'], usingSince: 2023 },
  { name: 'Figma', imgName: 'figma', tags: ['design', 'front'], usingSince: 2022 },
  { name: 'Sass', imgName: 'sass', tags: ['markup', 'front'], usingSince: 2023 },
  { name: 'SVG', imgName: 'svg', tags: ['markup', 'design', 'front'], usingSince: 2024 },
  { name: 'RegEx', imgName: 'regex', tags: ['markup'], usingSince: 2020 },
  { name: 'Scratch', imgName: 'scratch', tags: ['fun'], usingSince: 2017 },
  { name: 'Minecraft CB', imgName: 'minecraft-cb', tags: ['fun'], usingSince: 2016 },
]
// Add: symfony, Shopware, npm

const communicativeSkills = [
  { name: 'Presenting', imgName: 'presenting', stars: 4 },
  { name: 'Group work', imgName: 'groupwork', stars: 5 },
]

const psList = document.querySelector('#programming-skills .skills-list')
const csList = document.querySelector('#communicative-skills .skills-list')

psList.innerHTML = ''
csList.innerHTML = ''

for (let skill of programmingSkills) {
  psList.innerHTML += `
    <li tabindex="0" data-tags="${skill.tags.join(',')}">
      <div class="card">
        <h3>${skill.name}</h3>

        <div class="image-blur">
          <img src="./img/skills/${skill.imgName}.webp" alt="${skill.name} logo" width="160" height="160">
        </div>

        <div class="back">
          <h4>
            <span>Since</span>
            <span>${skill.usingSince}</span> 
          </h4>
        </div>
      </div>
    </li>`
}

for (let skill of communicativeSkills) {
  let i = 0
  csList.innerHTML += `
    <li tabindex="0">
      <div class="card">
        <h3>${skill.name}</h3>

        <div class="image-blur">
          <img src="./img/skills/${skill.imgName}.webp" alt="${skill.name} logo" width="160" height="160">
        </div>

        <div class="back" role="img" aria-label="${skill.stars} out of 5 stars">
          <div class="stars" aria-hidden="true">
            ${`<span class="icon fill material-symbols-rounded">star</span>`.repeat(skill.stars)}
            ${`<span class="icon material-symbols-rounded">star</span>`.repeat(5 - skill.stars)}
          </div>
        </div>
      </div>
    </li>`
}

// Clone image to blur it as background
document.querySelectorAll('.image-blur').forEach(a => (a.innerHTML += a.innerHTML))

// Programming skills filter

const filterForm = document.querySelector('#programming-skills form')
const psElements = [...psList.querySelectorAll('li')]

const psFilter = tag => {
  psElements.forEach(fieldset => {
    const tags = fieldset.getAttribute('data-tags').split(',')

    if (tag === 'all' || tags.includes(tag)) fieldset.removeAttribute('style')
    else fieldset.style.display = 'none'
  })
}

filterForm.addEventListener('click', e => {
  if (!e.target.matches('input')) return

  psFilter(e.target.getAttribute('data-tag'))

  const content = filterForm.closest('.content')
  content.removeAttribute('style')
  content.style.height = content.scrollHeight + 'px'

  computeArticleOffsets()
})
psFilter('lang')

const content = [...document.querySelectorAll('.collapsible .content')]
content.forEach(el => (el.style.height = 0))

// Keep hover effect for extended period

const skillCards = [...document.querySelectorAll('.skills-list li')]

skillCards.forEach(card => {
  let timeoutId

  card.addEventListener('mouseenter', () => {
    card.classList.add('flip')
    clearTimeout(timeoutId)
  })

  card.addEventListener('mouseleave', () => {
    timeoutId = setTimeout(() => card.removeAttribute('class'), 5000)
  })
})
