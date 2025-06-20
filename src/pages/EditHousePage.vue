<script setup>
import HouseForm from '@/components/HouseForm.vue'
import GoBackButton from '@/components/ui/GoBackButton.vue'
import IconButton from '@/components/ui/IconButton.vue'
import { useHouseStore } from '@/stores/houseStore'
import { computed, ref } from 'vue'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const houseStore = useHouseStore()

const house = ref(null)

const formError = ref('')

const initialFormData = computed(() => {
  if (!house.value) return null
  return {
    streetName: house.value.location.street,
    houseNumber: house.value.location.houseNumber,
    addition: house.value.location.houseNumberAddition,
    postalCode: house.value.location.zip,
    city: house.value.location.city,
    price: house.value.price,
    size: house.value.size,
    garage: house.value.hasGarage ? 'yes' : 'no',
    bedrooms: house.value.rooms.bedrooms,
    bathrooms: house.value.rooms.bathrooms,
    constructionDate: house.value.constructionYear,
    description: house.value.description,
    picture: house.value.image,
  }
})

onMounted(async () => {
  try {
    house.value = await houseStore.fetchHouseById(route.params.id)
  } catch (error) {
    console.error(`Failed to fetch house details for ID ${route.params.id}:`, error)
    router.push({ name: 'Home' })
  }
})

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
    await houseStore.editHouse(house.value.id, payload)
    if (formData.picture && formData.picture instanceof File) {
      await houseStore.uploadImage(house.value.id, formData.picture)
    }
    router.push({ name: 'House', params: { id: house.value.id } })
  } catch (error) {
    console.error('Failed to update listing:', error)
    formError.value = 'Failed to update listing. Please try again.'
  }
}

const goBack = () => {
  router.push({ name: 'House', params: { id: house.value.id } })
}
</script>

<template>
  <div class="edit-listing-page">
    <GoBackButton @goBack="goBack" label="Back to overview" class="go-back-desktop" />
    <div class="title-wrapper">
      <IconButton icon="back_grey" class="back-button go-back-mobile" @click="goBack" />
      <h1 class="title">Edit listing</h1>
    </div>
    <HouseForm
      v-if="initialFormData"
      :initial-data="initialFormData"
      :is-edit="true"
      @submit="handleSubmit"
    />
    <div v-if="formError" class="error-message">{{ formError }}</div>
  </div>
</template>

<style scoped>
.edit-listing-page {
  max-width: 500px;
  padding-bottom: 24px;
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
