import { useEffect, useState } from 'react'
import { apiFetch } from '../lib/api.js'
import { normalizeRoom } from '../lib/normalizeRoom.js'

/**
 * Remplace l'ancien `import { rooms } from '../data/rooms.js'`.
 * Retourne { rooms, loading, error } — rooms est [] pendant le chargement.
 */
export function useRooms() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    apiFetch('/rooms')
      .then((data) => {
        if (!cancelled) setRooms((data || []).map(normalizeRoom))
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { rooms, loading, error }
}

/**
 * Variante pour une seule chambre (page de détail), par slug.
 */
export function useRoom(slug) {
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    setLoading(true)

    apiFetch(`/rooms/${slug}`)
      .then((data) => {
        if (!cancelled) setRoom(normalizeRoom(data))
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  return { room, loading, error }
}
