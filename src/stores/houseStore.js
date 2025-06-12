import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  getHouses,
  getHouseById,
  createHouse,
  updateHouse,
  deleteHouse,
  uploadHouseImage,
} from '@/services/houseApi'

/**
 * Centralized state for all house-related screens.
 * Handles data fetching, mutations and client-side search/sort so
 * presentation components stay dumb & reusable.
 */
export const useHouseStore = defineStore('houses', () => {
  // State
  const list = ref(/** @type {import('@/services/houseApi').House[]} */ ([]))
  const status = ref(/** @type {'idle' | 'loading' | 'success' | 'error'} */ ('idle'))
  const error = ref(/** @type {string | null} */ (null))

  // UI filters
  const searchTerm = ref('')
  const sortBy = ref(/** @type {'price' | 'size'} */ ('price'))

  // Getters
  const filteredSortedList = computed(() => {
    let result = [...list.value]

    // text search over several fields
    const term = searchTerm.value.trim().toLowerCase()
    if (term) {
      result = result.filter((h) => {
        return (
          h.city.toLowerCase().includes(term) ||
          h.streetName.toLowerCase().includes(term) ||
          `${h.houseNumber}`.includes(term) ||
          `${h.zip}`.toLowerCase().includes(term)
        )
      })
    }

    // sort
    result.sort((a, b) => {
      if (sortBy.value === 'price') return a.price - b.price
      return a.size - b.size
    })

    return result
  })

  // Actions – wrap API methods & keep state in sync.
  async function fetchHouses() {
    status.value = 'loading'
    error.value = null
    try {
      list.value = await getHouses()
      status.value = 'success'
    } catch (e) {
      status.value = 'error'
      error.value = /** @type {Error} */ (e).message
    }
  }

  /**
   * Fetch a single house (detail page).
   * We don't store it globally; just return the data.
   */
  const fetchHouseById = (id) => getHouseById(id)

  async function addHouse(payload) {
    const created = await createHouse(payload)
    list.value.push(created)
    return created
  }

  async function editHouse(id, payload) {
    const updated = await updateHouse(id, payload)
    const idx = list.value.findIndex((h) => h.id === Number(id))
    if (idx !== -1) list.value[idx] = updated
    return updated
  }

  async function removeHouse(id) {
    await deleteHouse(id)
    const idx = list.value.findIndex((h) => h.id === Number(id))
    if (idx !== -1) list.value.splice(idx, 1)
  }

  async function replaceImage(id, file) {
    const updated = await uploadHouseImage(id, file)
    const idx = list.value.findIndex((h) => h.id === Number(id))
    if (idx !== -1) list.value[idx] = updated
    return updated
  }

  return {
    // state
    list,
    status,
    error,
    searchTerm,
    sortBy,

    // getters
    filteredSortedList,

    // actions
    fetchHouses,
    fetchHouseById,
    addHouse,
    editHouse,
    removeHouse,
    replaceImage,
  }
})
