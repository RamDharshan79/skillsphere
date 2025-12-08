export function parseBoolean(value) {
  if (value === undefined || value === null) return undefined
  const v = String(value).toLowerCase().trim()
  if (v === 'true' || v === '1' || v === 'yes') return true
  if (v === 'false' || v === '0' || v === 'no') return false
  return undefined
}

export function normalizeString(value) {
  if (value === undefined || value === null) return undefined
  const v = String(value).trim()
  return v.length ? v : undefined
}
