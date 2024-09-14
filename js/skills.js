const programmingSkills = [
  { name: 'JavaScript', imgName: 'js', tags: ['lang', 'front'], level: 100, fun: 100, usingSince: 2018 },
  { name: 'Vue.js', imgName: 'vue-js', tags: ['fw', 'front'], level: 70, fun: 90, usingSince: 2024 },
  { name: 'Node.js', imgName: 'node-js', tags: ['fw', 'back'], level: 80, fun: 95, usingSince: 2021 },
  { name: 'Python', imgName: 'python', tags: ['lang', 'back'], level: 80, fun: 90, usingSince: 2020 },
  { name: 'PHP', imgName: 'php', tags: ['lang', 'back'], level: 60, fun: 50, usingSince: 2023 },
  { name: 'Laravel', imgName: 'laravel', tags: ['fw', 'back'], level: 70, fun: 80, usingSince: 2024 },
  { name: 'Java', imgName: 'java', tags: ['lang', 'back'], level: 60, fun: 70, usingSince: 2022 },
  { name: 'C#', imgName: 'c-sharp', tags: ['lang', 'back'], level: 40, fun: 10, usingSince: 2023 },
  { name: 'MySQL', imgName: 'mysql', tags: ['db'], level: 80, fun: 75, usingSince: 2023 },
  { name: 'MongoDB', imgName: 'mongodb', tags: ['db'], level: 20, fun: 60, usingSince: 2024 },
  { name: 'Figma', imgName: 'figma', tags: ['design', 'front'], level: 40, fun: 40, usingSince: 2022 },
  { name: 'HTML5', imgName: 'html5', tags: ['lang', 'front'], level: 100, fun: 100, usingSince: 2016 },
  { name: 'CSS3', imgName: 'css3', tags: ['lang', 'design', 'front'], level: 95, fun: 100, usingSince: 2018 },
  { name: 'Sass', imgName: 'sass', tags: ['design', 'front'], level: 95, fun: 100, usingSince: 2023 },
  { name: 'SVG', imgName: 'svg', tags: ['lang', 'design', 'front'], level: 30, fun: 90, usingSince: 2024 },
  { name: 'RegEx', imgName: 'regex', tags: ['lang'], level: 70, fun: 80, usingSince: 2021 },
  { name: 'Scratch', imgName: 'scratch', tags: ['fun'], level: 100, fun: 100, usingSince: 2017 },
  { name: 'Minecraft CB', imgName: 'minecraft-cb', tags: ['fun'], level: 80, fun: 100, usingSince: 2016 },
]

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
          <h4>Skill</h4>
          <div class="progress-bar">
            <span style="background-color: hsl(${1.2 * skill.level}, 100%, 50%); width: ${skill.level}%"></span>
            <span>${skill.level}</span>
          </div>

          <h4>Fun</h4>
          <div class="progress-bar">
            <span style="background-color: hsl(${1.2 * skill.fun}, 100%, 50%); width: ${skill.fun}%">
            </span><span>${skill.fun}</span>
          </div>

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

        <div class="back" aria-label="${skill.stars} stars">
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
})
psFilter('lang')

const content = [...document.querySelectorAll('.collapsible .content')]
content.forEach(el => (el.style.height = 0))
