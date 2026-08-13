import fetchData from './api.js'
import renderAllCharacters, { renderCharacterDetail } from './render.js'
const paginationContainer = document.querySelector('#pagination')
const charactersContainer = document.querySelector('.characters')
const modal = document.querySelector('#character-modal')
const paginationContainer = document.querySelector('#pagination')

getCharacterByPage()

paginationContainer.addEventListener('click', async function (e) {
  e.preventDefault()
  if (e.target.classList.contains('pagination_button')) {
    const page = e.target.getAttribute('href')
    getCharacterByPage(page)
  }
})

async function getCharacterByPage (page = 1) {
  const apiUrl = `https://rickandmortyapi.com/api/character?page=${page}`
  const response = await fetchData(apiUrl)
  renderAllCharacters(response, page)
}
