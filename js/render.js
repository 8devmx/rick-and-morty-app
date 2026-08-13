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
        </div>
      </div>
    `
  })
  document.querySelector('.characters').innerHTML = html
  renderPagination(info.pages, currentPage)
}

export function renderCharacterDetail (character) {
  const origin = character.origin.name || 'Desconocido'
  const location = character.location.name || 'Desconocida'

  document.querySelector('#character-detail').innerHTML = `
    <img class="detail_image" src="${character.image}" alt="${character.name}">
    <div class="detail_info">
      <h2 id="modal-title">${character.name}</h2>
      <p><strong>Estado:</strong> ${character.status}</p>
      <p><strong>Especie:</strong> ${character.species}</p>
      <p><strong>Tipo:</strong> ${character.type || 'No especificado'}</p>
      <p><strong>Género:</strong> ${character.gender}</p>
      <p><strong>Origen:</strong> ${origin}</p>
      <p><strong>Ubicación:</strong> ${location}</p>
      <p><strong>Episodios:</strong> ${character.episode.length}</p>
    </div>
  `
}
export function renderPagination (totalPages, currentPage = 1) {
  let html = ''
  const paginationContainer = document.querySelector('#pagination')
  for (let i = 1; i <= totalPages; i++) {
    html += `<a class="pagination_button ${i === parseInt(currentPage) ? 'active' : ''}" href="${i}">${i}</a>`
  }
  paginationContainer.innerHTML = html
}
