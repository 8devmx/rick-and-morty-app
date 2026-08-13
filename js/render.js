// Obtener los personajes favoritos guardados en localStorage
function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || []
}

// Guardar favoritos en localStorage
function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites))
}

// Comprobar si un personaje está en favoritos
function isFavorite(characterId) {
    const favorites = getFavorites()
    return favorites.includes(characterId)
}

// Agregar o quitar un personaje de favoritos
function toggleFavorite(characterId) {
    let favorites = getFavorites()

    if (favorites.includes(characterId)) {
        favorites = favorites.filter(id => id !== characterId)
    } else {
        favorites.push(characterId)
    }

    saveFavorites(favorites)

    return favorites.includes(characterId)
}
export default function renderAllCharacters (response, currentPage) {
  const { results, info } = response
  const characters = results
  let html = ''
  characters.forEach(character => {
    html += `
      <div class="character">
        <div class="character_img">
          <img src="${character.image}" alt="">
        </div>
        <div class="character_info">
          <h2>${character.name}</h2>
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
  })
  document.querySelector('.characters').innerHTML = html

document.querySelectorAll('.favorite_button').forEach(button => {
    button.addEventListener('click', () => {
        const characterId = Number(button.dataset.id)

        const favorite = toggleFavorite(characterId)

        button.textContent = favorite
            ? '❤️ Quitar favorito'
            : '🤍 Agregar favorito'
    })
})

  renderPagination(info.pages, currentPage)
}
export function renderPagination (totalPages, currentPage = 1) {
  let html = ''
  const paginationContainer = document.querySelector('#pagination')
  for (let i = 1; i <= totalPages; i++) {
    html += `<a class="pagination_button ${i === parseInt(currentPage) ? 'active' : ''}" href="${i}">${i}</a>`
  }
  paginationContainer.innerHTML = html
}
