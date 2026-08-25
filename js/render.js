import { showDetailModal } from './modal.js'
import { getJsonItem } from './storage.js'
import { isFavorite } from './favorites.js'

function characterCardTemplate (character) {
  return `
    <div class="character" data-id="${character.id}">
      <div class="character_img">
        <img src="${character.image}" alt="">
      </div>
      <div class="character_info">
        <h2 class="character_name">${character.name}</h2>
        <p>Status: ${character.status}</p>
        <p>Species: ${character.species}</p>
        <p>Gender: ${character.gender}</p>

        <button
          class="favorite_button"
          data-id="${character.id}">
          ${isFavorite(character.id)
      ? '❤️ Quitar favorito'
      : '🤍 Agregar favorito'}
        </button>
      </div>
    </div>
  `
}

export default function renderAllCharacters (response, currentPage, cacheKey = 'characters_cache') {
  const { results, info } = response
  document.querySelector('.characters').innerHTML = results.map(characterCardTemplate).join('')
  renderPagination(info.pages, currentPage, 'pagination', cacheKey)
}

export function renderFavorites (characters) {
  const container = document.querySelector('.favorites')

  if (!characters.length) {
    container.innerHTML = '<p class="no_results">Aún no tienes personajes favoritos. Marca alguno con 🤍 desde Characters.</p>'
    return
  }

  container.innerHTML = characters.map(characterCardTemplate).join('')
}

export function renderNoCharacters () {
  document.querySelector('.characters').innerHTML = '<p class="no_results">No se encontraron personajes con esos filtros.</p>'
  document.querySelector('#pagination').innerHTML = ''
}

export function renderAllLocations (response, currentPage) {
  const { results, info } = response
  let html = ''
  results.forEach(location => {
    html += `
      <div class="location">
        <div class="location_info">
          <h2>${location.name}</h2>
          <p>Type: ${location.type}</p>
          <p>Dimension: ${location.dimension}</p>
          <p>Residents: ${location.residents.length}</p>
        </div>
      </div>
    `
  })
  document.querySelector('.locations').innerHTML = html
  renderPagination(info.pages, currentPage, 'location-pagination', 'locations_cache')
}

export function renderAllEpisodes (response, currentPage) {
  const { results, info } = response
  let html = ''
  results.forEach(episode => {
    html += `
      <div class="episode" data-id="${episode.id}">
        <div class="episode_info">
          <h2>${episode.name}</h2>
          <p>Episode: ${episode.episode}</p>
          <p>Air date: ${episode.air_date}</p>
        </div>
      </div>
    `
  })
  document.querySelector('.episodes').innerHTML = html
  renderPagination(info.pages, currentPage, 'episode-pagination', 'episodes_cache')
}

export function renderPagination (totalPages, currentPage = 1, containerId = 'pagination', cacheKey = null) {
  const cache = cacheKey ? getJsonItem(cacheKey, {}) : {}
  let html = ''
  const paginationContainer = document.querySelector(`#${containerId}`)
  for (let i = 1; i <= totalPages; i++) {
    const classes = ['pagination_button']
    if (i === parseInt(currentPage)) classes.push('active')
    if (cache[i]) classes.push('cached')
    html += `<a class="${classes.join(' ')}" href="${i}">${i}</a>`
  }
  paginationContainer.innerHTML = html
}

export function renderRandomCharacter (character) {
  const html = `
    <div class="character">
      <img src="${character.image}" alt="${character.name}">
      <div class="character_info">
        <h2 class="character_name">${character.name}</h2>
        <p>Status: ${character.status}</p>
        <p>Species: ${character.species}</p>
        <p>Location: ${character.location.name}</p>
      </div>
    </div>
  `

  document.querySelector('#random-character').innerHTML = html
}

export function renderCharacterModal (character, episodes) {
  const episodesHtml = episodes
    .map(episode => `<span class="episode_chip">${episode.episode}</span>`)
    .join('')

  const html = `
    <img src="${character.image}" alt="${character.name}">
    <h2 class="character_name">${character.name}</h2>
    <p>Status: ${character.status}</p>
    <p>Species: ${character.species}</p>
    <p>Gender: ${character.gender}</p>
    <p>Origin: ${character.origin.name}</p>
    <p>Location: ${character.location.name}</p>
    <p>Episodes: ${character.episode.length}</p>
    <div class="episode_chip_list">${episodesHtml}</div>
  `

  showDetailModal(html)
}

export function renderEpisodeModal (episode, characters) {
  const charactersHtml = characters
    .map(character => `
      <div class="episode_character">
        <img src="${character.image}" alt="${character.name}">
        <p>${character.name}</p>
      </div>
    `)
    .join('')

  const html = `
    <h2>${episode.name}</h2>
    <p>Episode: ${episode.episode}</p>
    <p>Air Date: ${episode.air_date}</p>
    <p>Characters: ${episode.characters.length}</p>
    <div class="episode_character_grid">${charactersHtml}</div>
  `

  showDetailModal(html)
}
