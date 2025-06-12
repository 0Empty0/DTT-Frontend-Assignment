<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHouseStore } from '@/stores/houseStore'
import HouseCard from '@/components/HouseCard.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import IconButton from '@/components/ui/IconButton.vue'

const route = useRoute()
const router = useRouter()
const houseStore = useHouseStore()

const house = ref(null)

const houseImageUrl = computed(() => {
  if (house.value?.image) {
    return house.value.image
  }
  return ''
})

const recommendedList = computed(() => {
  return houseStore.filteredSortedList.filter((item) => item.id !== house.value?.id).slice(0, 3)
})

onMounted(async () => {
  try {
    house.value = await houseStore.fetchHouseById(route.params.id)
    if (!houseStore.list.length) {
      await houseStore.fetchHouses()
    }
  } catch (error) {
    console.error('Failed to fetch house details:', error)
    // Optionally, redirect to a not-found page
    router.push({ name: 'Home' })
  }
})

const goBack = () => {
  router.back()
}

const goToEdit = () => {
  router.push(`/house/edit/${house.value.id}`)
}

const deleteListing = async () => {
  if (window.confirm('Are you sure you want to delete this listing?')) {
    try {
      await houseStore.removeHouse(house.value.id)
      router.push({ name: 'Home' })
    } catch (error) {
      console.error('Failed to delete listing:', error)
      alert('Failed to delete listing.')
    }
  }
}
</script>

<template>
  <div class="listing-page" v-if="house">
    <div class="main-content">
      <div class="back-link" @click="goBack">
        <BaseIcon name="back" color="grey" :size="[18, 18]" />
        <span>Back to overview</span>
      </div>

      <img :src="houseImageUrl" alt="House image" class="house-image" />

      <div class="heading">
        <h1 class="street-info">{{ house.location.street }} {{ house.location.houseNumber }}</h1>
        <div v-if="house.madeByMe" class="actions">
          <IconButton icon="edit" @click="goToEdit" />
          <IconButton icon="delete" @click="deleteListing" />
        </div>
      </div>

      <div class="location-info">
        <BaseIcon name="location" />
        <span>{{ house.location.zip }} {{ house.location.city }}</span>
      </div>

      <div class="details">
        <div class="detail-item">
          <BaseIcon name="price" />
          <span>€ {{ house.price.toLocaleString() }}</span>
        </div>
        <div class="detail-item">
          <BaseIcon name="size" />
          <span>{{ house.size }} m2</span>
        </div>
        <div class="detail-item">
          <BaseIcon name="construction" />
          <span>Built in {{ house.constructionYear }}</span>
        </div>
        <div class="detail-item">
          <BaseIcon name="bed" />
          <span>{{ house.rooms.bedrooms }}</span>
        </div>
        <div class="detail-item">
          <BaseIcon name="bath" />
          <span>{{ house.rooms.bathrooms }}</span>
        </div>
        <div class="detail-item">
          <BaseIcon name="garage" />
          <span>{{ house.hasGarage ? 'Yes' : 'No' }}</span>
        </div>
      </div>

      <p class="description">{{ house.description }}</p>
    </div>

    <div class="sidebar">
      <h2>Recommended for you</h2>
      <div v-if="recommendedList.length">
        <HouseCard v-for="item in recommendedList" :key="item.id" :house="item" />
      </div>
      <div v-else>
        <p>No other houses available.</p>
      </div>
    </div>
  </div>
  <div v-else class="loading">
    <p>Loading house details...</p>
  </div>
</template>

<style scoped>
.listing-page {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.main-content {
  flex: 3;
}

.sidebar {
  flex: 1;
  min-width: 300px;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  margin-bottom: 1rem;
  font-weight: 600;
}

.house-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 1.5rem;
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

.location-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
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
</style>
