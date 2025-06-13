<script>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useHouseStore } from '@/stores/houseStore'
import GoBackButton from '@/components/ui/GoBackButton.vue'
import HouseForm from '@/components/HouseForm.vue'
import { onMounted } from 'vue'

const route = useRoute()
const router = useRouter()

const houseStore = useHouseStore()

const house = ref(null)

const formError = ref('')

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
    const house = await houseStore.addHouse(payload)
    if (formData.picture) {
      await houseStore.uploadImage(house.id, formData.picture)
    }
    router.push(`/listing/${house.id}`)
  } catch (error) {
    console.error('Failed to create new listing:', error)
    formError.value = 'Failed to create new listing. Please try again.'
  }
}

const goBack = () => {
  router.push(`/listing/${house.value.id}`)
}
</script>

<template>
  <div class="edit-listing-page">
    <GoBackButton @goBack="goBack" label="Back to detail page" />
    <h1 class="title">Edit listing</h1>
    <HouseForm @submit="handleSubmit" />
    <div v-if="formError" class="error-message">{{ formError }}</div>
  </div>
</template>

<script>
export default {
  name: 'EditListingPage',
}
</script>

<style scoped>
.edit-listing-page {
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
</style>
