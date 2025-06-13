<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useHouseStore } from '@/stores/houseStore'
import GoBackButton from '@/components/ui/GoBackButton.vue'
import HouseForm from '@/components/HouseForm.vue'

const router = useRouter()
const houseStore = useHouseStore()
const errorMessage = ref('')

const handleSubmit = async (formData) => {
  const {
    streetName,
    houseNumber,
    postalCode,
    city,
    price,
    size,
    garage,
    bedrooms,
    bathrooms,
    constructionDate,
    description,
    picture,
  } = formData

  if (
    !streetName ||
    !houseNumber ||
    !postalCode ||
    !city ||
    !price ||
    !size ||
    !garage ||
    !bedrooms ||
    !bathrooms ||
    !constructionDate ||
    !description ||
    !picture
  ) {
    errorMessage.value = 'All fields are required, except for the addition.'
    return
  }
  errorMessage.value = ''

  const payload = {
    streetName,
    houseNumber,
    houseNumberAddition: formData.addition,
    zip: postalCode,
    city,
    price: Number(price),
    size: Number(size),
    hasGarage: garage === 'yes',
    bedrooms: Number(bedrooms),
    bathrooms: Number(bathrooms),
    constructionYear: Number(constructionDate),
    description,
    image: picture,
  }

  try {
    await houseStore.addHouse(payload)
    router.push('/')
  } catch (error) {
    console.error('Failed to create new listing:', error)
    errorMessage.value = 'Failed to create new listing. Please try again.'
  }
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="new-listing-page">
    <GoBackButton @goBack="goBack" label="Back to overview" />
    <h1 class="title">Create new listing</h1>
    <HouseForm @submit="handleSubmit" />
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  name: 'NewListingPage',
}
</script>

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
}
</style>
