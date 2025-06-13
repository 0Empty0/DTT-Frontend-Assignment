<script setup>
import HouseCard from '@/components/HouseCard.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import DeleteModal from '@/components/ui/DeleteModal.vue'
import GoBackButton from '@/components/ui/GoBackButton.vue'
import IconButton from '@/components/ui/IconButton.vue'
import { useHouseStore } from '@/stores/houseStore'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const houseStore = useHouseStore()

const house = ref(null)
const showDeleteModal = ref(false)

const houseImageUrl = computed(() => {
  if (house.value?.image) {
    return house.value.image
  }
  return ''
})

const recommendedList = computed(() => {
  if (!house.value) return []
  return houseStore.filteredSortedList
    .filter((item) => item && item.id !== house.value.id)
    .slice(0, 3)
})

const fetchHouseDetails = async (id) => {
  try {
    house.value = await houseStore.fetchHouseById(route.params.id)

    if (!houseStore.list.length) {
      await houseStore.fetchHouses()
    }
  } catch (error) {
    console.error(`Failed to fetch house details for ID ${id}:`, error)
    router.push({ name: 'Home' })
  }
}

onMounted(() => {
  fetchHouseDetails(route.params.id)
})

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      fetchHouseDetails(newId)
    }
  },
)

const goBack = () => {
  router.push({ name: 'Home' })
}

const goToEdit = () => {
  router.push({ name: 'EditHouse', params: { id: house.value.id } })
}

const deleteListing = () => {
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  try {
    await houseStore.removeHouse(house.value.id)
    router.push({ name: 'Home' })
  } catch (error) {
    console.error('Failed to delete listing:', error)
    alert('Failed to delete listing.')
  } finally {
    showDeleteModal.value = false
  }
}
</script>

<template>
  <div class="listing-page" v-if="house">
    <div class="main-content">
      <GoBackButton @goBack="goBack" label="Back to overview" class="go-back-button-desktop" />
      <div class="image-header">
        <img :src="houseImageUrl" alt="House image" class="house-image" />
        <div class="header-actions">
          <IconButton icon="back_white" class="back-button" @click="goBack" />
          <div v-if="house.madeByMe" class="actions">
            <IconButton icon="edit_white" @click="goToEdit" />
            <IconButton icon="delete_white" @click="deleteListing" />
          </div>
        </div>
      </div>

      <article class="house-details">
        <div class="house-details-content">
          <div class="heading">
            <h1 class="street-info">
              {{ house.location.street }} {{ house.location.houseNumber }}
            </h1>
            <div v-if="house.madeByMe" class="actions-desktop">
              <IconButton icon="edit" @click="goToEdit" />
              <IconButton icon="delete" @click="deleteListing" />
            </div>
          </div>

          <div class="location-info">
            <BaseIcon name="location" size="16" />
            <span>{{ house.location.zip }} {{ house.location.city }}</span>
          </div>

          <div class="details">
            <div class="detail-item">
              <BaseIcon name="price" size="16" />
              <span>{{ house.price.toLocaleString() }}</span>
            </div>
            <div class="detail-item">
              <BaseIcon name="size" size="16" />
              <span>{{ house.size }} m2</span>
            </div>
            <div class="detail-item">
              <BaseIcon name="construction_date" size="16" />
              <span>Built in {{ house.constructionYear }}</span>
            </div>
          </div>
          <div class="details">
            <div class="detail-item">
              <BaseIcon name="bed" size="16" />
              <span>{{ house.rooms.bedrooms }}</span>
            </div>
            <div class="detail-item">
              <BaseIcon name="bath" size="16" />
              <span>{{ house.rooms.bathrooms }}</span>
            </div>
            <div class="detail-item">
              <BaseIcon name="garage" size="16" />
              <span>{{ house.hasGarage ? 'Yes' : 'No' }}</span>
            </div>
          </div>

          <p class="description">{{ house.description }}</p>
        </div>
      </article>
    </div>

    <aside class="sidebar">
      <h2>Recommended for you</h2>
      <div v-if="recommendedList.length" class="recommended-list">
        <HouseCard v-for="item in recommendedList" :key="item.id" :house="item" />
      </div>
      <div v-else>
        <p>No other houses available.</p>
      </div>
    </aside>
  </div>
  <div v-else class="loading">
    <p>Loading house details...</p>
  </div>
  <DeleteModal :show="showDeleteModal" @close="showDeleteModal = false" @confirm="confirmDelete" />
</template>

<style scoped>
.listing-page {
  background-color: var(--color-background-2);
}
.main-content {
  flex: 2;
}
.house-details {
  background-color: var(--color-background-2);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.image-header {
  position: relative;
}

.header-actions {
  position: absolute;
  top: 2rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  padding: 0 1rem;
}
.house-details-content {
  padding: 1.25rem;
}
.sidebar {
  flex: 1;
  min-width: 300px;
  margin-top: 2.5rem;
}
.recommended-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  container-type: inline-size;
  container-name: house-card-container;
}
.house-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}
.heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
.street-info {
  font-size: 1.75rem;
  font-weight: bold;
}
.actions {
  display: flex;
  gap: 1rem;
}
.actions-desktop {
  display: none;
  gap: 1rem;
}
.location-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}
.details {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}
.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.description {
  line-height: 1.6;
  color: var(--text-secondary);
}
.sidebar h2 {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.loading {
  text-align: center;
  padding: 4rem;
}

.go-back-button-desktop {
  display: none;
}

@media (max-width: 1024px) {
  .listing-page {
    flex-direction: column;
  }
}

@media (min-width: 641px) {
  .go-back-button-desktop {
    display: flex;
  }

  .listing-page {
    display: flex;
    gap: 2rem;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    background-color: var(--color-background-1);
  }

  .image-header {
    position: static;
  }

  .header-actions {
    display: none;
  }

  .actions-desktop {
    display: flex;
  }

  .house-details-content {
    padding: 1.25rem;
  }
}

@media (max-width: 640px) {
  .go-back-button-desktop {
    display: none;
  }
  .house-image {
    height: 55vh;
  }
  .main-content {
    padding: 0;
  }
  .listing-page {
    padding: 0;
  }
  .house-details-content {
    padding: 1.5rem;
    margin-top: -5rem;
    background: var(--color-background-2);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    position: relative;
    z-index: 5;
  }
  .actions-desktop {
    display: none;
  }
  .location-info {
    margin-bottom: 0.5rem;
  }
  .sidebar {
    margin-top: 0;
    padding: 1rem;
  }
  .house-details-content {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
