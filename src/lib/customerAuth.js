import { API_URL } from './api.js'

const TOKEN_KEY = 'elaziz_customer_token'
const CUSTOMER_KEY = 'elaziz_customer_info'

export function getCustomerToken() {
  return localStorage.getItem(TOKEN_KEY)
}
export function getCustomerInfo() {
  try {
    return JSON.parse(localStorage.getItem(CUSTOMER_KEY) || 'null')
  } catch {
    return null
  }
}
export function isCustomerAuthed() {
  return !!getCustomerToken()
}
export function customerLogout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(CUSTOMER_KEY)
}

function saveSession(customer, token) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer))
}

export async function customerLogin(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const body = await res.json().catch(() => null)
  if (!res.ok) throw new Error(body?.error || 'Échec de connexion')
  saveSession(body.customer, body.token)
  return body.customer
}

export async function customerRegister(name, email, phone, password) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, phone, password }),
  })
  const body = await res.json().catch(() => null)
  if (!res.ok) throw new Error(body?.error || 'Échec de l\'inscription')
  saveSession(body.customer, body.token)
  return body.customer
}

/** Wrapper fetch pour les routes client protégées (Authorization: Bearer). */
export async function customerFetch(path, options = {}) {
  const token = getCustomerToken()
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  })

  if (res.status === 401) {
    customerLogout()
    throw new Error('Session expirée, veuillez vous reconnecter')
  }

  let body = null
  try {
    body = await res.json()
  } catch {
    // pas de corps
  }
  if (!res.ok) throw new Error(body?.error || `Erreur API (${res.status})`)
  return body
}
