<script setup>
import { onMounted } from 'vue'
import { useHouseStore } from '@/stores/houseStore'
import HouseCard from '@/components/HouseCard.vue'
import SearchInput from '@/components/ui/SearchInput.vue'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'
import ToggleTabs from '@/components/ui/ToggleTabs.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import { useRouter } from 'vue-router'

import emptyHouses from '@/assets/images/img_empty_houses@3x.png'

const router = useRouter()
const houseStore = useHouseStore()

onMounted(() => {
  if (houseStore.status === 'idle') houseStore.fetchHouses()
})

const sortOptions = [
  { label: 'Price', value: 'price' },
  { label: 'Size', value: 'size' },
]

const handleCreate = () => {
  router.push({ name: 'NewHouse' })
}
</script>

<template>
  <div class="houses-page">
    <h1 class="title">Houses</h1>
    <PrimaryButton @click="handleCreate"
      ><BaseIcon name="plus_white" size="16" :class="['plus-icon']" /> CREATE NEW</PrimaryButton
    >
  </div>
  <div class="houses-controls">
    <SearchInput v-model="houseStore.searchTerm" placeholder="Search for a house" />
    <ToggleTabs v-model="houseStore.sortBy" :options="sortOptions" />
  </div>
  <div v-if="houseStore.status === 'loading'" class="houses-loading">Loading…</div>
  <div v-else-if="houseStore.status === 'error'" class="houses-error">{{ houseStore.error }}</div>

  <div v-else>
    <div
      v-if="houseStore.searchTerm !== '' && houseStore.filteredSortedList.length !== 0"
      class="houses-found"
    >
      {{ houseStore.filteredSortedList.length }} results found
    </div>
    <HouseCard v-for="house in houseStore.filteredSortedList" :key="house.id" :house="house" />
    <div v-if="!houseStore.filteredSortedList.length" class="houses-empty">
      <img :src="emptyHouses" alt="No results found" />
      <p class="message">No results found.</p>
      <p>Please try another keyword.</p>
    </div>
  </div>
</template>

<style scoped>
.plus-icon {
  margin-right: 1rem;
}
.houses-page {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}
.houses-controls {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
}
.houses-loading,
.houses-error {
  text-align: center;
  color: var(--text-color-secondary);
  margin-top: 2rem;
}
.houses-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 5rem;
  text-align: center;
  color: var(--text-color-secondary);
}
.houses-empty img {
  width: 250px;
}
.houses-empty .message {
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--text-color-primary);
  margin: 0;
}
.houses-found {
  font-size: var(--f-body-desktop);
  font-weight: 700;
  margin-bottom: 2rem;
}
@media (max-width: 600px) {
  .houses-header,
  .houses-controls {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  .houses-title {
    font-size: var(--f-h1-mobile);
  }
}
</style>
