<script setup>
import { ref, watch, computed } from 'vue'
import FormInput from '@/components/ui/FormInput.vue'
import FormTextarea from '@/components/ui/FormTextarea.vue'
import FormSelect from '@/components/ui/FormSelect.vue'
import FormImageUpload from '@/components/ui/FormImageUpload.vue'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'

const props = defineProps({
  initialData: { type: Object, default: () => ({}) },
  isEdit: { type: Boolean, default: false },
  errors: { type: Object, default: () => ({}) },
})

const isDisabled = computed(() => {
  return Object.values(props.errors).some((error) => error !== '')
})

const emit = defineEmits(['submit'])

const form = ref({
  streetName: '',
  houseNumber: '',
  addition: '',
  postalCode: '',
  city: '',
  price: '',
  size: '',
  garage: '',
  bedrooms: '',
  bathrooms: '',
  constructionDate: '',
  description: '',
  picture: null,
})

const garageOptions = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
]

watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      form.value = { ...form.value, ...newData }
    }
  },
  { immediate: true, deep: true },
)

const handleSubmit = () => {
  emit('submit', form.value)
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <FormInput
      id="streetName"
      v-model="form.streetName"
      label="Street name*"
      placeholder="Enter the street name"
      :error="errors.streetName"
    />

    <div class="form-row">
      <FormInput
        id="houseNumber"
        v-model="form.houseNumber"
        label="House number*"
        placeholder="Enter house number"
        :error="errors.houseNumber"
      />
      <FormInput
        id="addition"
        v-model="form.addition"
        label="Addition (optional)"
        placeholder="e.g. A"
      />
    </div>

    <FormInput
      id="postalCode"
      v-model="form.postalCode"
      label="Postal code*"
      placeholder="e.g. 1000 AA"
      :error="errors.postalCode"
    />
    <FormInput
      id="city"
      v-model="form.city"
      label="City*"
      placeholder="e.g. Utrecht"
      :error="errors.city"
    />
    <FormImageUpload
      id="picture"
      v-model="form.picture"
      label="Upload picture (PNG or JPG)*"
      :error="errors.picture"
    />
    <FormInput
      id="price"
      v-model="form.price"
      label="Price*"
      placeholder="e.g. €150.000"
      :error="errors.price"
    />

    <div class="form-row">
      <FormInput
        id="size"
        v-model="form.size"
        label="Size*"
        placeholder="e.g. 60m2"
        :error="errors.size"
      />
      <FormSelect
        id="garage"
        v-model="form.garage"
        label="Garage*"
        :options="garageOptions"
        :error="errors.garage"
      />
    </div>

    <div class="form-row">
      <FormInput
        id="bedrooms"
        v-model="form.bedrooms"
        label="Bedrooms*"
        placeholder="Enter amount"
        :error="errors.bedrooms"
      />
      <FormInput
        id="bathrooms"
        v-model="form.bathrooms"
        label="Bathrooms*"
        placeholder="Enter amount"
        :error="errors.bathrooms"
      />
    </div>

    <FormInput
      id="constructionDate"
      v-model="form.constructionDate"
      label="Construction date*"
      placeholder="e.g. 1990"
      :error="errors.constructionDate"
    />
    <FormTextarea
      id="description"
      v-model="form.description"
      label="Description*"
      placeholder="Enter description"
      :error="errors.description"
    />

    <PrimaryButton type="submit" :disabled="isDisabled">{{
      isEdit ? 'SAVE' : 'POST'
    }}</PrimaryButton>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.primary-btn {
  align-self: flex-end;
  width: 150px;
  justify-content: center;
}
</style>
