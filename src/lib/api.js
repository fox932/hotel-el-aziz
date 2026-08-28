const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

/**
 * Wrapper around fetch for the Hôtel El Aziz API.
 * Throws an Error with the API's message on non-2xx responses.
 */
export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })

  let body = null
  try {
    body = await res.json()
  } catch {
    // pas de corps JSON (ex: 204)
  }

  if (!res.ok) {
    throw new Error(body?.error || `Erreur API (${res.status})`)
  }

  return body
}

export { API_URL }
