import fetchData, { fetchMultiple } from './api.js'
import renderAllCharacters, { renderAllLocations, renderAllEpisodes, renderRandomCharacter, renderCharacterModal, renderEpisodeModal, renderNoCharacters, renderFavorites, renderPagination, renderLocationResidents } from './render.js'
import { getJsonItem, setJsonItem } from './storage.js'
import { getFavoriteCharacters } from './helpers.js'
import { toggleFavorite } from './favorites.js'

let totalCharacters = 0
let navLinks
const characterFilters = { name: '', status: '', species: '', gender: '' }

let favoritesData = []
let  currentFavoritesPage = 1
const FAVORITES_PER_PAGE = 8

document.addEventListener('DOMContentLoaded', () => {
  const paginationContainer = document.querySelector('#pagination')
  const locationPaginationContainer = document.querySelector('#location-pagination')
  const episodePaginationContainer = document.querySelector('#episode-pagination')
  const favoritePaginationContainer = document.querySelector('#favorite-pagination')
  const charactersContainer = document.querySelector('.characters')
  const episodesContainer = document.querySelector('.episodes')
  const favoritesContainer = document.querySelector('.favorites')
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
    if (e.target.classList.contains('favorite_button')) {
      const characterId = Number(e.target.dataset.id)
      const isFav = toggleFavorite(characterId)
      e.target.textContent = isFav ? '❤️ Quitar favorito' : '🤍 Agregar favorito'
      return
    }
    const card = e.target.closest('.character')
    if (card) openCharacterDetail(card.dataset.id)
  })

  favoritesContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('favorite_button')) {
      const characterId = Number(e.target.dataset.id)
      toggleFavorite(characterId)
      removeFavoriteFromView(characterId)
      return
    }
    const card = e.target.closest('.character')
    if (card) openCharacterDetail(card.dataset.id)
  })

  favoritePaginationContainer.addEventListener('click', function (e) {
    e.preventDefault()
    if (e.target.classList.contains('pagination_button')) {
      const page = Number(e.target.getAttribute('href'))
      renderFavoritesPage(page)
    }
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
      if (view === 'favorites') {
        loadFavorites(1)
      }
    })
  })

  if (randomButton) {
    randomButton.addEventListener('click', async function () {
      randomButton.disabled = true
      const randomId = Math.floor(Math.random() * totalCharacters) + 1
      const apiUrl = `https://rickandmortyapi.com/api/character/${randomId}`
      const character = await fetchData(apiUrl)
      renderRandomCharacter(character)
      randomButton.disabled = false
    })
  }
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

const sleep = ms => new Promise(r => setTimeout(r, ms))

async function safeFetch (url) {
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    return await res.json()
  } catch { return null }
}

async function fetchCharactersByIds (ids) {
  if (!ids.length) return []
  const data = await safeFetch(`https://rickandmortyapi.com/api/character/${ids.join(',')}`)
  if (!data) return []
  return Array.isArray(data) ? data : [data]
}

async function fetchCharactersSafe (urls) {
  const ids = urls.map(u => u.split('/').pop()).filter(Boolean)
  if (!ids.length) return []
  const results = []
  for (let i = 0; i < ids.length; i += 20) {
    const chunk = ids.slice(i, i + 20)
    const batch = await fetchCharactersByIds(chunk)
    if (batch.length > 0) {
      results.push(...batch)
    } else {
      for (const id of chunk) {
        const ch = await safeFetch(`https://rickandmortyapi.com/api/character/${id}`)
        if (ch) results.push(ch)
      }
    }
    if (i + 20 < ids.length) await sleep(300)
  }
  return results
}

async function getLocationByPage (page = '1') {
  page = String(page)
  const apiUrl = `https://rickandmortyapi.com/api/location?page=${page}`
  const response = await fetchData(apiUrl)
  if (!response) return
  const withResidents = response.results.filter(l => l.residents.length > 0)
  renderAllLocations({ ...response, results: withResidents }, page)
  for (const location of withResidents) {
    const characters = await fetchCharactersSafe(location.residents)
    location._residentsData = { characters }
    renderLocationResidents(location)
    await sleep(400)
  }
}

async function getEpisodesByPage (page = 1) {
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

async function loadFavorites (page = 1) {
  favoritesData = await getFavoriteCharacters()
  renderFavoritesPage(page)
}

function renderFavoritesPage (page = 1) {
  currentFavoritesPage = page
  const totalPages = Math.max(1, Math.ceil(favoritesData.length / FAVORITES_PER_PAGE))
  const start = (page - 1) * FAVORITES_PER_PAGE
  const pageItems = favoritesData.slice(start, start + FAVORITES_PER_PAGE)
  renderFavorites(pageItems)
  const favoritePaginationContainer = document.querySelector('#favorite-pagination')
  favoritePaginationContainer.innerHTML = ''
  if (favoritesData.length > FAVORITES_PER_PAGE) {
    renderPagination(totalPages, page, 'favorite-pagination')
  }
}

function removeFavoriteFromView (characterId) {
  favoritesData = favoritesData.filter(character => character.id !== characterId)
  const totalPages = Math.max(1, Math.ceil(favoritesData.length / FAVORITES_PER_PAGE))
  if (currentFavoritesPage > totalPages) currentFavoritesPage = totalPages
  renderFavoritesPage(currentFavoritesPage)
}
