export default function renderAllCharacters(characters) {
  const container = document.querySelector(".characters");

  if (!characters.length) {
    container.innerHTML = `
      <p class="empty-message">No se encontraron personajes con esos filtros.</p>
    `;
    return;
  }

  const html = characters
    .map((character) => {
      return `
        <article class="character">
          <img src="${character.image}" alt="${character.name}" />

          <div class="character_info">
            <h2>${character.name}</h2>
            <p><span>Status:</span> ${character.status}</p>
            <p><span>Species:</span> ${character.species}</p>
            <p><span>Gender:</span> ${character.gender}</p>
            <p><span>Origin:</span> ${character.origin?.name ?? "Unknown"}</p>
            <p><span>Location:</span> ${character.location?.name ?? "Unknown"}</p>
            <p><span>Episodes:</span> ${character.episode?.length ?? 0}</p>
          </div>
        </article>
      `;
    })
    .join("");

  container.innerHTML = html;
}