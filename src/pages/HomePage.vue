<script setup>
import { onMounted } from 'vue'
import { useHouseStore } from '@/stores/houseStore'
import HouseCard from '@/components/HouseCard.vue'
import SearchInput from '@/components/ui/SearchInput.vue'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'
import ToggleTabs from '@/components/ui/ToggleTabs.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const houseStore = useHouseStore()

onMounted(() => {
  if (houseStore.status === 'idle') houseStore.fetchHouses()
})

const sortOptions = [
  { label: 'Price', value: 'price' },
  { label: 'Size', value: 'size' },
]

function handleEdit() {
  // TODO: route to edit page or open modal
}
function handleDelete() {
  // TODO: open confirm modal and call houseStore.removeHouse(house.id)
}
function handleCreate() {
  // TODO: route to create page or open modal
}
</script>

<template>
  <div class="houses-page">
    <h1 class="houses-title">Houses</h1>
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
  <div v-else-if="houseStore.filteredSortedList.length === 0" class="houses-empty">
    No houses found.
  </div>
  <div v-else>
    <div v-if="houseStore.searchTerm !== ''" class="houses-found">
      {{ houseStore.filteredSortedList.length }} results found
    </div>
    <HouseCard
      v-for="house in houseStore.filteredSortedList"
      :key="house.id"
      :house="house"
      @edit="handleEdit"
      @delete="handleDelete"
    />
    <div v-if="!houseStore.filteredSortedList.length" class="houses-empty">No houses found.</div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
}
</script>

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
.houses-title {
  font-size: var(--f-h1-desktop);
  font-weight: 700;
  margin: 0;
}
.houses-controls {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
}
.houses-loading,
.houses-error,
.houses-empty {
  text-align: center;
  color: var(--text-color-secondary);
  margin-top: 2rem;
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
