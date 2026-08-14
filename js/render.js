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
export function renderPagination (totalPages, currentPage = 1) {
  let html = ''
  const paginationContainer = document.querySelector('#pagination')
  for (let i = 1; i <= totalPages; i++) {
    html += `<a class="pagination_button ${i === parseInt(currentPage) ? 'active' : ''}" href="${i}">${i}</a>`
  }
  paginationContainer.innerHTML = html
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
   renderPagination(info.pages, currentPage)
   }
