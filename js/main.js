import fetchData from './api.js'
import renderAllCharacters, { renderAllLocations } from './render.js'
const paginationContainer = document.querySelector('#pagination')

const locationsLink = document.querySelector('#locationsLink')
const charactersLink = document.querySelector('#charactersLink')

let currentPage = 'characters'

getCharacterByPage()

paginationContainer.addEventListener('click', function (e) {
  e.preventDefault()
  if (e.target.classList.contains('pagination_button')) {
    const page = e.target.getAttribute('href')
    
    if (currentPage === 'characters') {
      getCharacterByPage(page)
    } else {
      getLocationByPage(page)
    }
  }
})

locationsLink.addEventListener('click', function (e) {
  e.preventDefault()
  currentPage = 'locations'

  document.querySelector('.characters').style.display = 'none'
  document.querySelector('.locations').style.display = 'grid'

  getLocationByPage()
})

charactersLink.addEventListener('click', function (e) {
  e.preventDefault()
  currentPage = 'characters'

  document.querySelector('.locations').style.display = 'none'
  document.querySelector('.characters').style.display = 'grid'

  getCharacterByPage()
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