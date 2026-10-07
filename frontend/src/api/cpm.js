export async function fetchProducts({ q = '', page = 1, limit = 20 } = {}) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) })
  if (q) params.set('q', q)

  const res = await fetch(`/api/cpm?${params}`)
  if (!res.ok) {
    throw new Error('Failed to load products')
  }
  return res.json()
}

export async function fetchProduct(pcmNo) {
  const res = await fetch(`/api/cpm/${encodeURIComponent(pcmNo)}`)
  if (res.status === 404) return null
  if (!res.ok) {
    throw new Error('Failed to load product')
  }
  return res.json()
}
