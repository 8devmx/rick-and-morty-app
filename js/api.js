import { showModal } from './modal.js'

export default async function fetchData (url) {
  try {
    const response = await fetch(url)

    if (hasError(response)) return null

    return await response.json()
  } catch (error) {
    console.error(error.message)
    showModal('No se pudo conectar con el servidor. Intenta de nuevo.')
    return null
  }
}

function hasError (response) {
  if (response.status === 429) {
    showModal('Se han hecho demasiadas solicitudes, intenta de nuevo en un momento.')
    return true
  }

  if (response.status === 404) {
    return true
  }

  if (!response.ok) {
    showModal('Ocurrió un error al obtener los datos. Intenta de nuevo más tarde.')
    return true
  }

  return false
}

export async function fetchMultiple (urls) {
  if (!urls.length) return []

  const ids = urls.map(url => url.split('/').pop()).join(',')
  const base = urls[0].slice(0, urls[0].lastIndexOf('/'))
  const data = await fetchData(`${base}/${ids}`)
  if (!data) return []

  return Array.isArray(data) ? data : [data]
}
