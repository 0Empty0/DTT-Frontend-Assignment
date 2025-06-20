/**
 * House API service layer. Handles all network communication with DTT houses API.
 * Uses the native Fetch API so we don't add an extra dependency.
 */

// Domain type
/**
 * @typedef {Object} House
 * @property {number} id
 * @property {string} image
 * @property {number} price
 * @property {{ bedrooms: number, bathrooms: number }} rooms
 * @property {number} size
 * @property {string} description
 * @property {{ street: string, houseNumber: number, houseNumberAddition: string|null, city: string, zip: string }} location
 * @property {string} createdAt
 * @property {number} constructionYear
 * @property {boolean} hasGarage
 * @property {boolean} madeByMe
 */

const API_BASE = import.meta.env.VITE_APP_BASE_API_URL

/**
 * Generic network helper that wraps the Fetch API.
 * Throws an Error for non-2xx responses so callers can handle uniformly.
 *
 * @template T
 * @param {string} endpoint
 * @param {{ method?: string; body?: BodyInit }} [options]
 * @returns {Promise<T>}
 */
async function request(endpoint, { method = 'GET', body } = {}) {
  const headers = {
    'X-Api-Key': import.meta.env.VITE_APP_API_KEY,
  }

  if (body && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  const resp = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers,
    body,
  })

  if (!resp.ok) {
    let message = `Request failed with status ${resp.status}`
    try {
      const { error } = await resp.clone().json()
      if (error) message = error
    } catch {
      // Failed to parse error response
    }
    throw new Error(message)
  }

  // DELETE endpoints may return 204 No Content.
  if (resp.status === 204) return /** @type {T} */ (undefined)

  return /** @type {Promise<T>} */ (resp.json())
}

/**
 * Convert a plain house payload into `FormData` as required by the API.
 *
 * @param {Record<string, any>} payload
 * @returns {FormData}
 */
function toFormData(payload) {
  const data = new FormData()
  for (const [key, value] of Object.entries(payload)) {
    if (value !== undefined && value !== null) data.append(key, value)
  }
  return data
}

/**
 * Fetch all houses.
 * @returns {Promise<House[]>}
 */
export const getHouses = () => request('/houses')

/**
 * Fetch single house by id.
 * @param {number | string} id
 * @returns {Promise<House>}
 */
export const getHouseById = (id) => request(`/houses/${id}`)

/**
 * Create new house.
 * @param {Omit<House, 'id' | 'image'> & { image?: File | null }} payload
 * @returns {Promise<House>}
 */
export const createHouse = (payload) =>
  request('/houses', {
    method: 'POST',
    body: toFormData(payload),
  })

/**
 * Update an existing house.
 * @param {number | string} id
 * @param {Partial<Omit<House, 'id' | 'image'>> & { image?: File | null }} payload
 * @returns {Promise<House>}
 */
export const updateHouse = (id, payload) =>
  request(`/houses/${id}`, {
    method: 'POST',
    body: toFormData(payload),
  })

/**
 * Delete a house.
 * @param {number | string} id
 * @returns {Promise<void>}
 */
export const deleteHouse = (id) =>
  request(`/houses/${id}`, {
    method: 'DELETE',
  })

/**
 * Upload/replace image for a house.
 * @param {number | string} id
 * @param {File} file
 * @returns {Promise<House>}
 */
export const uploadHouseImage = (id, file) => {
  const data = new FormData()
  data.append('image', file)
  return request(`/houses/${id}/upload`, {
    method: 'POST',
    body: data,
  })
}

export const houseApiClient = {
  getHouses,
  getHouseById,
  createHouse,
  updateHouse,
  deleteHouse,
  uploadHouseImage,
}
