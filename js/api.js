export default async function fetchData(url) {
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("No se encontraron resultados.");
    }

    throw new Error("Ocurrió un problema al consultar la API.");
  }

  return response.json();
}