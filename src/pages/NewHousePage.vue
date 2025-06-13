<script setup>
import HouseForm from '@/components/HouseForm.vue'
import GoBackButton from '@/components/ui/GoBackButton.vue'
import IconButton from '@/components/ui/IconButton.vue'
import { useHouseStore } from '@/stores/houseStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const houseStore = useHouseStore()
const formError = ref('')

const handleSubmit = async (formData) => {
  const payload = {
    streetName: formData.streetName,
    houseNumber: formData.houseNumber,
    houseNumberAddition: formData.addition,
    zip: formData.postalCode,
    city: formData.city,
    price: Number(formData.price),
    size: Number(formData.size),
    hasGarage: formData.garage === 'yes',
    bedrooms: Number(formData.bedrooms),
    bathrooms: Number(formData.bathrooms),
    constructionYear: Number(formData.constructionDate),
    description: formData.description,
  }

  try {
    const house = await houseStore.addHouse(payload)
    if (formData.picture && formData.picture instanceof File) {
      await houseStore.uploadImage(house.id, formData.picture)
    }
    router.push({ name: 'House', params: { id: house.id } })
  } catch (error) {
    console.error('Failed to create new listing:', error)
    formError.value = 'Failed to create new listing. Please try again.'
  }
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="new-listing-page">
    <GoBackButton @goBack="goBack" label="Back to overview" class="go-back-desktop" />
    <div class="title-wrapper">
      <IconButton icon="back_grey" class="back-button" @click="goBack" />
      <h1 class="title">Create new listing</h1>
    </div>
    <HouseForm @submit="handleSubmit" />
    <div v-if="formError" class="error-message">{{ formError }}</div>
  </div>
</template>

<style scoped>
.new-listing-page {
  max-width: 500px;
}
.title {
  margin-block: 1rem;
}
.error-message {
  color: red;
  margin-top: 1rem;
  text-align: center;
}

@media (min-width: 641px) {
  .go-back-mobile {
    display: none;
  }
}

@media (max-width: 640px) {
  .new-listing-page {
    width: 100%;
    max-width: unset;
  }
  .go-back-desktop {
    display: none;
  }
  .title-wrapper {
    display: grid;
    grid-template-columns: 32px 1fr 32px;
    grid-template-rows: 1fr;
    grid-template-areas: 'button title .';
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
    padding-bottom: 1rem;
  }
  .go-back-mobile {
    grid-area: button;
  }
  .title {
    grid-area: title;
    text-align: center;
  }
}
</style>
