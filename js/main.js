import fetchData, { fetchMultiple } from './api.js'
import renderAllCharacters, { renderAllLocations, renderAllEpisodes, renderRandomCharacter, renderCharacterModal, renderEpisodeModal, renderNoCharacters } from './render.js'
import { getJsonItem, setJsonItem } from './storage.js'

let totalCharacters = 0
let navLinks
const characterFilters = { name: '', status: '', species: '', gender: '' }

document.addEventListener('DOMContentLoaded', () => {
  const paginationContainer = document.querySelector('#pagination')
  const locationPaginationContainer = document.querySelector('#location-pagination')
  const episodePaginationContainer = document.querySelector('#episode-pagination')
  const charactersContainer = document.querySelector('.characters')
  const episodesContainer = document.querySelector('.episodes')
  const randomButton = document.querySelector('#random-character-button')
  const nameInput = document.querySelector('#character-search-name')
  const speciesSelect = document.querySelector('#character-search-species')
  const statusSelect = document.querySelector('#character-filter-status')
  const genderSelect = document.querySelector('#character-filter-gender')
  const searchButton = document.querySelector('#character-search-button')
  navLinks = document.querySelectorAll('nav ul a')

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

  charactersContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('favorite_button')) return
    const card = e.target.closest('.character')
    if (card) openCharacterDetail(card.dataset.id)
  })

  searchButton.addEventListener('click', () => {
    characterFilters.name = nameInput.value.trim()
    characterFilters.species = speciesSelect.value
    characterFilters.status = statusSelect.value
    characterFilters.gender = genderSelect.value
    getCharacterByPage(1)
  })

  episodesContainer.addEventListener('click', function (e) {
    const card = e.target.closest('.episode')
    if (card) openEpisodeDetail(card.dataset.id)
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

  randomButton.addEventListener('click', async function () {
    randomButton.disabled = true

    const randomId = Math.floor(Math.random() * totalCharacters) + 1
    const apiUrl = `https://rickandmortyapi.com/api/character/${randomId}`

    const character = await fetchData(apiUrl)
    renderRandomCharacter(character)

    randomButton.disabled = false
  })
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


function showView (view) {
  document.querySelectorAll('.view').forEach(section => {
    section.style.display = section.id === view ? 'block' : 'none'
  })
}

function setActiveLink (activeLink) {
  navLinks.forEach(link => link.classList.remove('active'))
  activeLink.classList.add('active')
}

function getCachedPage (section, page) {
  const cache = getJsonItem(`${section}_cache`, {})
  return cache[page] || null
}

function cachePage (section, page, data) {
  const cache = getJsonItem(`${section}_cache`, {})
  cache[page] = data
  setJsonItem(`${section}_cache`, cache)
}

function hasActiveCharacterFilters () {
  return Object.values(characterFilters).some(value => value !== '')
}

function buildCharacterUrl (page) {
  const params = new URLSearchParams({ page })
  if (characterFilters.name) params.set('name', characterFilters.name)
  if (characterFilters.status) params.set('status', characterFilters.status)
  if (characterFilters.species) params.set('species', characterFilters.species)
  if (characterFilters.gender) params.set('gender', characterFilters.gender)
  return `https://rickandmortyapi.com/api/character?${params.toString()}`
}

async function getCharacterByPage (page = 1) {
  const filtered = hasActiveCharacterFilters()

  if (!filtered) {
    const cached = getCachedPage('characters', page)
    if (cached) {
      totalCharacters = cached.info.count
      renderAllCharacters(cached, page)
      return
    }
  }

  const apiUrl = buildCharacterUrl(page)
  const response = await fetchData(apiUrl)
  if (!response) {
    if (filtered) renderNoCharacters()
    return
  }

  if (!filtered) {
    totalCharacters = response.info.count
    cachePage('characters', page, response)
  }
  renderAllCharacters(response, page, filtered ? null : 'characters_cache')
}

async function getLocationByPage (page = 1) {
  const cached = getCachedPage('locations', page)
  if (cached) {
    renderAllLocations(cached, page)
    return
  }

  const apiUrl = `https://rickandmortyapi.com/api/location?page=${page}`
  const response = await fetchData(apiUrl)
  if (!response) return
  cachePage('locations', page, response)
  renderAllLocations(response, page)
}

async function getEpisodesByPage (page = 1) {
  const cached = getCachedPage('episodes', page)
  if (cached) {
    renderAllEpisodes(cached, page)
    return
  }

  const apiUrl = `https://rickandmortyapi.com/api/episode?page=${page}`
  const response = await fetchData(apiUrl)
  if (!response) return
  cachePage('episodes', page, response)
  renderAllEpisodes(response, page)
}

async function openCharacterDetail (id) {
  const apiUrl = `https://rickandmortyapi.com/api/character/${id}`
  const character = await fetchData(apiUrl)
  if (!character) return

  const episodes = await fetchMultiple(character.episode)
  renderCharacterModal(character, episodes)
}

async function openEpisodeDetail (id) {
  const apiUrl = `https://rickandmortyapi.com/api/episode/${id}`
  const episode = await fetchData(apiUrl)
  if (!episode) return

  const characters = await fetchMultiple(episode.characters)
  renderEpisodeModal(episode, characters)
}
