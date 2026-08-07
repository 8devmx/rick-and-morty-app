import fetchData from "./api.js";
import renderAllCharacters from "./render.js";

const apiUrl = "https://rickandmortyapi.com/api/character";

const searchInput = document.querySelector("#search");
const statusSelect = document.querySelector("#status");
const speciesSelect = document.querySelector("#species");
const genderSelect = document.querySelector("#gender");
const resetButton = document.querySelector("#reset-filters");
const container = document.querySelector(".characters");

let debounceTimer;

async function loadCharacters() {
  try {
    container.innerHTML = `<p class="loading-message">Cargando personajes...</p>`;

    const params = new URLSearchParams();

    if (searchInput.value.trim()) {
      params.set("name", searchInput.value.trim());
    }

    if (statusSelect.value) {
      params.set("status", statusSelect.value);
    }

    if (speciesSelect.value) {
      params.set("species", speciesSelect.value);
    }

    if (genderSelect.value) {
      params.set("gender", genderSelect.value);
    }

    const url = params.toString() ? `${apiUrl}?${params.toString()}` : apiUrl;
    const data = await fetchData(url);

    renderAllCharacters(data.results ?? []);
  } catch (error) {
    renderAllCharacters([]);
  }
}

function debounceLoad() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(loadCharacters, 350);
}

searchInput.addEventListener("input", debounceLoad);
statusSelect.addEventListener("change", loadCharacters);
speciesSelect.addEventListener("change", loadCharacters);
genderSelect.addEventListener("change", loadCharacters);

resetButton.addEventListener("click", () => {
  searchInput.value = "";
  statusSelect.value = "";
  speciesSelect.value = "";
  genderSelect.value = "";
  loadCharacters();
});

loadCharacters();