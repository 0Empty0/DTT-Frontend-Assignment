<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useHouseStore } from '@/stores/houseStore'
import { useDebounce } from '@/composables/useDebounce'
import GoBackButton from '@/components/ui/GoBackButton.vue'
import HouseForm from '@/components/HouseForm.vue'

const router = useRouter()
const houseStore = useHouseStore()
const errors = ref({})

const validate = (formData) => {
  errors.value = {}
  const requiredMessage = 'Required field missing.'
  const newErrors = {}

  const requiredFields = [
    'streetName',
    'houseNumber',
    'postalCode',
    'city',
    'price',
    'size',
    'garage',
    'bedrooms',
    'bathrooms',
    'constructionDate',
    'description',
    'picture',
  ]

  for (const field of requiredFields) {
    if (!formData[field]) {
      newErrors[field] = requiredMessage
    }
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const debouncedValidate = useDebounce(validate, 200)

const handleSubmit = async (formData) => {
  // if (!validate(formData)) {
  //   return
  // }

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
    await houseStore.uploadImage(house.id, formData.picture)
    router.push(`/listing/${house.id}`)
  } catch (error) {
    console.error('Failed to create new listing:', error)
    errors.value = { form: 'Failed to create new listing. Please try again.' }
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
    <HouseForm @submit="handleSubmit" @update="debouncedValidate" :errors="errors" />
    <div v-if="errors.form" class="error-message">{{ errors.form }}</div>
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
  text-align: center;
}
</style>
