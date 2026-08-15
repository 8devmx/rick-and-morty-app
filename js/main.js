import fetchData from './api.js'
import renderAllCharacters, { renderAllLocations, renderAllEpisodes } from './render.js'
const paginationContainer = document.querySelector('#pagination')

const locationsLink = document.querySelector('#locationsLink')
const charactersLink = document.querySelector('#charactersLink')
const episodesLink = document.querySelector('#episodesLink')

let currentPage = 'characters'

getCharacterByPage()

paginationContainer.addEventListener('click', function (e) {
  e.preventDefault()
  if (e.target.classList.contains('pagination_button')) {
    const page = e.target.getAttribute('href')
    
    if (currentPage === 'characters') {
      getCharacterByPage(page)
    } else if (currentPage === '#locationsLink') {
      getLocationByPage(page)
    } else {
      getEpisodeByPage(page)
    }

  }
})

locationsLink.addEventListener('click', function (e) {
  e.preventDefault()
  currentPage = '#locationsLink'

  getLocationByPage()
})

charactersLink.addEventListener('click', function (e) {
  e.preventDefault()
  currentPage = 'characters'

  getCharacterByPage()
})

episodesLink.addEventListener('click', function (e) {
  e.preventDefault()
  currentPage = '#episodesLink'

  getEpisodeByPage()
})


async function getCharacterByPage (page = 1) {
  const apiUrl = `https://rickandmortyapi.com/api/character?page=${page}`
  const response = await fetchData(apiUrl)
  renderAllCharacters(response, page)
}

async function getLocationByPage (page = 1) {
  const apiUrl = `https://rickandmortyapi.com/api/location?page=${page}`
  const response = await fetchData(apiUrl)
  renderAllLocations(response, page)
}

async function getEpisodeByPage (page = 1) {
  const apiUrl = `https://rickandmortyapi.com/api/episode?page=${page}`
  const response = await fetchData(apiUrl)
  renderAllEpisodes(response, page)
}
