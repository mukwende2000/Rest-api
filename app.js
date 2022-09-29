const main = document.querySelector('.main')
const countries = Array.from(main.children)
const input = document.querySelector('input')
const filter = document.querySelector('#filter')
const mode = document.querySelector('.mode')
const header = document.querySelector('header')
let searchedCountry;

window.addEventListener('DOMContentLoaded', getCountries)
window.addEventListener('keydown', checkKey)
filter.addEventListener('change', getByRegion)
countries.forEach(country => {
    country.addEventListener('click', (e) => {
        searchedCountry = e.currentTarget.children[1].children[0].textContent
        searchCountry()
    }) 
})


async function getByRegion(e) {
    const res = await fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    const data = await res.json()
    console.log(data)
    main.innerHTML = ''
    let counter = 0
    data.forEach(item => {
        main.innerHTML = main.innerHTML + `<div class="country">
        <div><img src="${data[counter].flags.png}" alt="" /></div>
        <div class="overview">
          <p>${data[counter].name.common}</p>
          <p>Population: ${data[counter].population}</p>
          <p>Region: ${data[counter].region}</p>
          <p>Capital: ${data[counter].capital}</p>
        </div>`
        counter++
    }); 
}

function checkKey(e) {
    if (e.key === 'Enter') {
        searchedCountry = input.value
        searchCountry()
    }
}

async function searchCountry() {  
        const res = await fetch(`https://restcountries.com/v3.1/name/${searchedCountry}`)
        const data = await res.json()
        localStorage.setItem('country', JSON.stringify(data))
    window.location = 'country.html'
}

async function getCountries() {
    const res = await fetch('https://restcountries.com/v3.1/all')
    const data = await res.json()
    countries.forEach(country => {
        let randomNumber = Math.floor(Math.random() * 250)
        country.children[0].firstChild.setAttribute('src', data[randomNumber].flags.png)
        country.children[1].children[0].textContent = data[randomNumber].name.common
        country.children[1].children[2].textContent = data[randomNumber].population
        country.children[1].children[3].textContent = data[randomNumber].region
        country.children[1].children[1].textContent = data[randomNumber].capital
    });
        if (localStorage.mode === 'light') {
        document.body.classList.toggle('light')
        input.classList.toggle('lights')
        filter.classList.toggle('lights')
        header.classList.toggle('lights')  
        countries.forEach(country => {
            country.classList.toggle('lights')
        })
    }
}

mode.addEventListener('click', switchTheme)
function switchTheme() {
    document.body.classList.toggle('light')
    input.classList.toggle('lights')
    filter.classList.toggle('lights')
    header.classList.toggle('lights')  
    countries.forEach(country => {
        country.classList.toggle('lights')
    })
    if (document.body.className ==='light') {
        localStorage.setItem('mode', 'light')
    }
    else {
        localStorage.setItem('mode', 'dark')
    }
}