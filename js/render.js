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
export function renderEpisodes (response, currentPage) {
  const { results, info } = response
  let html = ''
  results.forEach(episode => {
    html += `
      <div class="episode">
        <div class="episode_info">
          <h2>${episode.name}</h2>
          <p>Episode: ${episode.episode}</p>
          <p>Air date: ${episode.air_date}</p>
        </div>
      </div>
    `
  })
  document.querySelector('.episodes').innerHTML = html
  renderPagination(info.pages, currentPage, 'episode-pagination')
}
export function renderPagination (totalPages, currentPage = 1, containerId = 'pagination') {
  let html = ''
  const paginationContainer = document.querySelector(`#${containerId}`)
  for (let i = 1; i <= totalPages; i++) {
    html += `<a class="pagination_button ${i === parseInt(currentPage) ? 'active' : ''}" href="${i}">${i}</a>`
  }
  paginationContainer.innerHTML = html
}
