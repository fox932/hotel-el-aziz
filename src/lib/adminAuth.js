import { API_URL } from './api.js'

const TOKEN_KEY = 'elaziz_admin_token'
const ADMIN_KEY = 'elaziz_admin_info'

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getAdminInfo() {
  try {
    return JSON.parse(localStorage.getItem(ADMIN_KEY) || 'null')
  } catch {
    return null
  }
}

export function isAdminAuthed() {
  return !!getAdminToken()
}

export function adminLogout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(ADMIN_KEY)
}

export async function adminLogin(username, password) {
  const res = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  const body = await res.json().catch(() => null)
  if (!res.ok) throw new Error(body?.error || 'Échec de connexion')

  localStorage.setItem(TOKEN_KEY, body.token)
  localStorage.setItem(ADMIN_KEY, JSON.stringify(body.admin))
  return body.admin
}

/**
 * Wrapper fetch pour les routes admin protégées.
 * Ajoute automatiquement le header Authorization.
 * En cas de 401 (token expiré/invalide), déconnecte et renvoie vers /admin/login.
 */
export async function adminFetch(path, options = {}) {
  const token = getAdminToken()
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  })

  if (res.status === 401) {
    adminLogout()
    window.location.href = '/admin/login'
    throw new Error('Session expirée, veuillez vous reconnecter')
  }

  let body = null
  try {
    body = await res.json()
  } catch {
    // pas de corps (ex: 204)
  }

  if (!res.ok) {
    throw new Error(body?.error || `Erreur API (${res.status})`)
  }

  return body
}
