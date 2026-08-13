import fetchData from './api.js'
import renderAllCharacters from './render.js'
const paginationContainer = document.querySelector('#pagination')

getCharacterByPage()

paginationContainer.addEventListener('click', async function (e) {
  e.preventDefault()
  if (e.target.classList.contains('pagination_button')) {
    const page = e.target.getAttribute('href')
    getCharacterByPage(page)
  }
})

charactersContainer.addEventListener('click', async function (e) {
  const detailButton = e.target.closest('.character_detail_button')
  if (!detailButton) return

  const characterId = detailButton.dataset.characterId
  const character = await fetchData(`https://rickandmortyapi.com/api/character/${characterId}`)
  renderCharacterDetail(character)
  modal.classList.add('is-open')
  modal.setAttribute('aria-hidden', 'false')
})

modal.addEventListener('click', function (e) {
  if (!e.target.matches('[data-close-modal]')) return
  modal.classList.remove('is-open')
  modal.setAttribute('aria-hidden', 'true')
})


async function getCharacterByPage (page = 1) {
  const apiUrl = `https://rickandmortyapi.com/api/character?page=${page}`
  const response = await fetchData(apiUrl)
  renderAllCharacters(response, page)
}
