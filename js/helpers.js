import { getJsonItem } from './storage.js'
import { fetchMultiple } from './api.js'
import { getFavoritesIDs } from './favorites.js'

function getCachedCharactersById (ids) {
  const pagesCache = getJsonItem('characters_cache', {})
  const allCharacters = Object.values(pagesCache).flatMap(page => page.results)
  return allCharacters.filter(character => ids.includes(character.id))
}

// Devuelve los personajes favoritos completos, tomándolos del cache de páginas
// ya visitadas y trayendo de la API los que falten (favoritos agregados desde
// páginas que nunca se cargaron en esta sesión).
export async function getFavoriteCharacters () {
  const favoriteIds = getFavoritesIDs()
  if (!favoriteIds.length) return []

  const cached = getCachedCharactersById(favoriteIds)
  const cachedIds = cached.map(character => character.id)
  const missingIds = favoriteIds.filter(id => !cachedIds.includes(id))

  let fetched = []
  if (missingIds.length) {
    const urls = missingIds.map(id => `https://rickandmortyapi.com/api/character/${id}`)
    fetched = await fetchMultiple(urls)
  }

  const allFavoriteCharacters = [...cached, ...fetched]

  // Se conserva el orden en el que se marcaron como favoritos
  return favoriteIds
    .map(id => allFavoriteCharacters.find(character => character.id === id))
    .filter(Boolean)
}
