const userLocale =
  typeof navigator !== 'undefined' && navigator.language ? navigator.language : 'en-US'

export const formatDateTime = (isoString) => {
  if (!isoString) return '-'

  return new Date(isoString).toLocaleString(userLocale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const formatDate = (isoString) => {
  if (!isoString) return '-'

  return new Date(isoString).toLocaleString(userLocale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// 🕐 Sadece tarih (gg.aa.yyyy)
export const formatShortDate = (isoString) => {
  if (!isoString) return '-'

  return new Date(isoString).toLocaleDateString(userLocale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export const truncateText = (text, maxLength = 100) => {
  if (typeof text !== 'string') return ''
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}

export const isEmpty = (value) => {
  if (value === null || value === undefined) return true
  if (typeof value === 'string' && value.trim() === '') return true
  if (Array.isArray(value) && value.length === 0) return true
  if (typeof value === 'object' && Object.keys(value).length === 0) return true
  return false
}
