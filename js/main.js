import fetchData from './api.js'

import { renderRandomCharacter } from './render.js'

import renderAllCharacters from './render.js'
const paginationContainer = document.querySelector('#pagination')

const randomButton = document.querySelector('#random-character-button')
let totalCharacters = 0

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

totalCharacters = response.info.count

  renderAllCharacters(response, page)
}


randomButton.addEventListener('click', async function () {
  randomButton.disabled = true

  const randomId = Math.floor(Math.random() * totalCharacters) + 1
  const apiUrl = `https://rickandmortyapi.com/api/character/${randomId}`

  const character = await fetchData(apiUrl)
  renderRandomCharacter(character)

  randomButton.disabled = false
})