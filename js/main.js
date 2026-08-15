import fetchData from './api.js'
import renderAllCharacters, { renderEpisodes } from './render.js'

const paginationContainer = document.querySelector('#pagination')
const episodePaginationContainer = document.querySelector('#episode-pagination')
const navLinks = document.querySelectorAll('nav ul a')

showView('characters')
setActiveLink(document.querySelector('nav ul a[data-view="characters"]'))
getCharacterByPage()

paginationContainer.addEventListener('click', async function (e) {
  e.preventDefault()
  if (e.target.classList.contains('pagination_button')) {
    const page = e.target.getAttribute('href')
    getCharacterByPage(page)
  }
})

episodePaginationContainer.addEventListener('click', async function (e) {
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
  renderAllCharacters(response, page)
}

async function getEpisodesByPage (page = 1) {
  const apiUrl = `https://rickandmortyapi.com/api/episode?page=${page}`
  const response = await fetchData(apiUrl)
  renderEpisodes(response, page)
}
