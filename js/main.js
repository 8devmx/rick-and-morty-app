import fetchData from './api.js'
import renderAllCharacters, { renderAllEpisodes } from './render.js'

const paginationContainer = document.querySelector('#pagination')
const pageEpisodes = document.querySelectorAll('#episodes')

let currentSection = 'characters'

getCharacterByPage()

paginationContainer.addEventListener('click', async function (e) {
  e.preventDefault()
  if (e.target.classList.contains('pagination_button')) {
    const page = e.target.getAttribute('href')
    if (currentSection === 'characters') {
      getCharacterByPage(page)
    } else {
      getEpisodesByPage(page)
    }
  }
})

async function getCharacterByPage (page = 1) {
  const apiUrl = `https://rickandmortyapi.com/api/character?page=${page}`
  const response = await fetchData(apiUrl)
  renderAllCharacters(response, page)
}

async function getEpisodesByPage (page = 1) {
  const apiUrl = `https://rickandmortyapi.com/api/episode?page=${page}`
  const response = await fetchData(apiUrl)
  renderAllEpisodes(response, page)
}


