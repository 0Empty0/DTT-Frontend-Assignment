<script setup>
import HouseCard from '@/components/HouseCard.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'
import SearchInput from '@/components/ui/SearchInput.vue'
import ToggleTabs from '@/components/ui/ToggleTabs.vue'
import { useHouseStore } from '@/stores/houseStore'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import emptyHouses from '@/assets/images/img_empty_houses@3x.png'

const router = useRouter()
const houseStore = useHouseStore()

onMounted(() => {
  houseStore.fetchHouses()
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
  <div class="home-page">
    <div class="houses-page">
      <h1 class="title">Houses</h1>
      <PrimaryButton @click="handleCreate"
        ><BaseIcon name="plus_white" size="16" :class="['plus-icon']" /> CREATE NEW</PrimaryButton
      >
      <button class="mobile-btn" @click="handleCreate">
        <BaseIcon name="plus_grey" size="24" />
      </button>
    </div>
    <div class="houses-controls">
      <SearchInput v-model="houseStore.searchTerm" placeholder="Search for a house" />
      <ToggleTabs v-model="houseStore.sortBy" :options="sortOptions" />
    </div>
    <div v-if="houseStore.status === 'loading'" class="houses-loading">Loading…</div>
    <div v-else-if="houseStore.status === 'error'" class="houses-error">{{ houseStore.error }}</div>

    <div v-else>
      <p
        v-if="houseStore.searchTerm !== '' && houseStore.filteredSortedList.length !== 0"
        class="houses-found"
      >
        {{ houseStore.filteredSortedList.length }} results found
      </p>
      <HouseCard
        v-for="house in houseStore.filteredSortedList"
        :key="house.id"
        :house="house"
        class="house-card-item"
      />
      <div v-if="!houseStore.filteredSortedList.length" class="houses-empty">
        <img :src="emptyHouses" alt="No results found" />
        <p class="message">No results found.</p>
        <p>Please try another keyword.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  padding-bottom: 24px;
}
.plus-icon {
  margin-right: 1rem;
}

.houses-page {
  display: grid;
  grid-template-columns: 32px 1fr 32px;
  grid-template-rows: 1fr;
  grid-template-areas: '. title button';
  justify-content: center;
  align-items: center;
  padding: 1rem;
  padding-bottom: 0;
  margin-bottom: 2rem;
}
.title {
  text-align: center;
  grid-area: title;
}
.mobile-btn {
  grid-area: button;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
.primary-btn {
  display: none;
}
.houses-controls {
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
}
.houses-found {
  margin-bottom: 1rem;
  font-size: var(--f-body-desktop);
  font-weight: 700;
}
.house-card-item {
  margin: 0 1rem;
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

@media (min-width: 641px) {
  .mobile-btn {
    display: none;
  }
  .primary-btn {
    display: inline-flex;
  }
  .houses-page {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    grid-template-columns: unset;
    grid-template-rows: unset;
    grid-template-areas: unset;
  }
  .title {
    text-align: left;
  }
  .houses-controls {
    flex-direction: row;
    margin-bottom: 2rem;
    padding: 0;
  }
  .houses-found {
    margin-bottom: 2rem;
  }
  .house-card-item {
    margin: 0;
  }
}
</style>
