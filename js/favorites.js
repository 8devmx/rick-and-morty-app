
import { getJsonItem, setJsonItem } from './storage.js'

export function getFavoritesIDs () {
  return getJsonItem('favorites', [])
}

export function saveFavorites (favorites) {
  setJsonItem('favorites', favorites)
}

export function isFavorite (characterId) {
  const favorites = getFavoritesIDs()
  return favorites.includes(characterId)
}

export function toggleFavorite (characterId) {
  let favorites = getFavoritesIDs()

  if (favorites.includes(characterId)) {
    favorites = favorites.filter(id => id !== characterId)
  } else {
    favorites.push(characterId)
  }

  saveFavorites(favorites)

  return favorites.includes(characterId)
}
