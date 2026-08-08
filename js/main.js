import fetchData from './api.js'
import renderAllCharacters from './render.js'

const apiUrl = 'https://rickandmortyapi.com/api/character'
const response = await fetchData(apiUrl)
renderAllCharacters(response.results)
