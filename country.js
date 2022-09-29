const img = document.querySelector('.img')
const name = document.querySelector('h2')
const header = document.querySelector('header')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const btn = document.querySelector('.btn')
const mode = document.querySelector('.mode')
const borders = document.querySelectorAll('.border')


btn.addEventListener('click', () => window.location = 'index.html')
window.addEventListener('load', () => {
  if (localStorage.mode ==='light') {
    header.classList.add('lights')  
    document.body.classList.add('light')
  }
  else {
    header.classList.remove('lights')  
    document.body.classList.remove('light')
  }
})

const countryData = JSON.parse(localStorage.getItem('country'))
console.log(countryData)
img.children[0].setAttribute('src', countryData[0].flags.png)
name.textContent = countryData[0].name.common
population.textContent = countryData[0].population
subRegion.textContent = countryData[0].subregion
capital.textContent = countryData[0].capital
for (const [key, value] of Object.entries(countryData[0].currencies)) {
    currencies.textContent = value.name
  }
languages.textContent = countryData[0].languages.fra

countryData[0].borders.forEach(border => {
  const span = document.createElement('span')
  span.textContent = ` ${border.toLowerCase()} `
  const borders = document.querySelector('.borders')
  borders.appendChild(span)
})
mode.addEventListener('click', switchTheme)

function switchTheme() {
  document.body.classList.toggle('light')
  header.classList.toggle('lights')  
    if (document.body.className ==='light') {
        localStorage.setItem('mode', 'light')
    }
    else {
        localStorage.setItem('mode', 'dark')
    }
}