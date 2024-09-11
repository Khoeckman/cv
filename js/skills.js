const programmingSkills = [
  { name: 'JavaScript', imgName: 'js', tags: ['lang', 'front'], level: 100, joy: 100, usingSince: 2019 },
  { name: 'Vue.js', imgName: 'vue-js', tags: ['fw', 'front'], level: 70, joy: 90, usingSince: 2024 },
  { name: 'Node.js', imgName: 'node-js', tags: ['fw', 'back'], level: 80, joy: 95, usingSince: 2021 },
  { name: 'Python', imgName: 'python', tags: ['lang', 'back'], level: 80, joy: 90, usingSince: 2020 },
  { name: 'PHP', imgName: 'php', tags: ['lang', 'back'], level: 50, joy: 60, usingSince: 2023 },
  { name: 'Laravel', imgName: 'laravel', tags: ['fw', 'back'], level: 70, joy: 80, usingSince: 2024 },
  { name: 'Java', imgName: 'java', tags: ['lang', 'back'], level: 60, joy: 70, usingSince: 2022 },
  { name: 'C#', imgName: 'c-sharp', tags: ['lang', 'back'], level: 50, joy: 10, usingSince: 2019 },
  { name: 'MySQL', imgName: 'mysql', tags: ['db'], level: 70, joy: 80, usingSince: 2023 },
  { name: 'MongoDB', imgName: 'mongodb', tags: ['db'], level: 20, joy: 60, usingSince: 2024 },
  { name: 'HTML5', imgName: 'html5', tags: ['lang', 'front'], level: 90, joy: 100, usingSince: 2016 },
  { name: 'CSS3', imgName: 'css3', tags: ['lang', 'design', 'front'], level: 100, joy: 100, usingSince: 2016 },
  { name: 'Sass', imgName: 'sass', tags: ['design', 'front'], level: 100, joy: 100, usingSince: 2023 },
  { name: 'Scratch', imgName: 'scratch', tags: ['fun'], level: 100, joy: 100, usingSince: 2017 },
  { name: 'Minecraft CB', imgName: 'minecraft-cb', tags: ['fun'], level: 80, joy: 100, usingSince: 2016 },
  { name: 'Figma', imgName: 'figma', tags: ['design', 'front'], level: 40, joy: 40, usingSince: 2022 },
]

const psList = document.querySelector('#programming-skills .skills-list')

psList.innerHTML = ''

for (let skill of programmingSkills) {
  psList.innerHTML += `
    <li tabindex="0" data-tags="${skill.tags.join(',')}">
      <div class="card">
        <h3>${skill.name}</h3>

        <div class="image-blur">
          <img src="./img/skills/${skill.imgName}.webp" alt="${skill.name} logo" width="160" height="160">
        </div>

        <div class="back">
          <span>Skill level</span>
          <div class="progress-bar" data-progress="${skill.level}%"></div>

          <span>Joy</span>
          <div class="progress-bar" data-progress="${skill.joy}%"></div>

          <p>
            <span>Since</span>
            <span>${skill.usingSince}</span>
          </p>
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

    if (tags.includes(tag)) fieldset.removeAttribute('style')
    else fieldset.style.display = 'none'
  })
}

filterForm.addEventListener(
  'click',
  e => {
    if (!e.target.matches('input')) return
    psFilter(e.target.getAttribute('data-tag'))
  },
  true
)
psFilter('lang')
