import fetchData from './api.js'
import renderAllCharacters, { renderAllLocations, renderAllEpisodes, renderRandomCharacter } from './render.js'

const paginationContainer = document.querySelector('#pagination')
const locationPaginationContainer = document.querySelector('#location-pagination')
const episodePaginationContainer = document.querySelector('#episode-pagination')
const navLinks = document.querySelectorAll('nav ul a')
const randomButton = document.querySelector('#random-character-button')

let totalCharacters = 0

showView('characters')
setActiveLink(document.querySelector('nav ul a[data-view="characters"]'))
getCharacterByPage()

paginationContainer.addEventListener('click', function (e) {
  e.preventDefault()
  if (e.target.classList.contains('pagination_button')) {
    const page = e.target.getAttribute('href')
    getCharacterByPage(page)
  }
})

locationPaginationContainer.addEventListener('click', function (e) {
  e.preventDefault()
  if (e.target.classList.contains('pagination_button')) {
    const page = e.target.getAttribute('href')
    getLocationByPage(page)
  }
})

episodePaginationContainer.addEventListener('click', function (e) {
  e.preventDefault()
  if (e.target.classList.contains('pagination_button')) {
    const page = e.target.getAttribute('href')
    getEpisodesByPage(page)
  }
})

navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault()
    const view = this.dataset.view
    showView(view)
    setActiveLink(this)
    if (view === 'locations' && !document.querySelector('.locations').innerHTML) {
      getLocationByPage()
    }
    if (view === 'episodes' && !document.querySelector('.episodes').innerHTML) {
      getEpisodesByPage()
    }
  })
})

function showView (view) {
  document.querySelectorAll('.view').forEach(section => {
    section.style.display = section.id === view ? 'block' : 'none'
  })
}

function setActiveLink (activeLink) {
  navLinks.forEach(link => link.classList.remove('active'))
  activeLink.classList.add('active')
}

async function getCharacterByPage (page = 1) {
  const apiUrl = `https://rickandmortyapi.com/api/character?page=${page}`
  const response = await fetchData(apiUrl)

  totalCharacters = response.info.count

  renderAllCharacters(response, page)
}

async function getLocationByPage (page = 1) {
  const apiUrl = `https://rickandmortyapi.com/api/location?page=${page}`
  const response = await fetchData(apiUrl)
  renderAllLocations(response, page)
}

async function getEpisodesByPage (page = 1) {
  const apiUrl = `https://rickandmortyapi.com/api/episode?page=${page}`
  const response = await fetchData(apiUrl)
  renderAllEpisodes(response, page)
}

randomButton.addEventListener('click', async function () {
  randomButton.disabled = true

  const randomId = Math.floor(Math.random() * totalCharacters) + 1
  const apiUrl = `https://rickandmortyapi.com/api/character/${randomId}`

  const character = await fetchData(apiUrl)
  renderRandomCharacter(character)

  randomButton.disabled = false
})
