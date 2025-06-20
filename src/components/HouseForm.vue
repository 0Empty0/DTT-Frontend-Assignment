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
})

const emit = defineEmits(['submit'])

const form = ref({})
watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      form.value = { ...form.value, ...newData }
    }
  },
  { immediate: true, deep: true },
)

const formRefs = ref({
  streetName: null,
  houseNumber: null,
  postalCode: null,
  city: null,
  picture: null,
  price: null,
  size: null,
  garage: null,
  bedrooms: null,
  bathrooms: null,
  constructionDate: null,
  description: null,
})

const isRequiredFieldValid = (value) => {
  return value !== null && value !== undefined && value !== ''
}

const requiredValidator = (value) => {
  if (isRequiredFieldValid(value)) {
    return ''
  }
  return 'Required field missing.'
}

const isFormValid = computed(() => {
  const requiredFields = Object.keys(formRefs.value)
  return requiredFields.every((field) => isRequiredFieldValid(form.value[field]))
})

const garageOptions = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
]

const validateForm = () => {
  const validations = Object.values(formRefs.value).map((ref) => ref?.validate())
  return validations.every((isValid) => isValid)
}

const handleSubmit = () => {
  if (validateForm()) {
    emit('submit', form.value)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="house-form">
    <FormInput
      :ref="(el) => (formRefs.streetName = el)"
      id="streetName"
      v-model="form.streetName"
      label="Street name*"
      placeholder="Enter the street name"
      :validator="requiredValidator"
    />

    <div class="form-row">
      <FormInput
        :ref="(el) => (formRefs.houseNumber = el)"
        id="houseNumber"
        v-model="form.houseNumber"
        label="House number*"
        placeholder="Enter house number"
        :validator="requiredValidator"
      />
      <FormInput
        id="addition"
        v-model="form.addition"
        label="Addition (optional)"
        placeholder="e.g. A"
      />
    </div>

    <FormInput
      :ref="(el) => (formRefs.postalCode = el)"
      id="postalCode"
      v-model="form.postalCode"
      label="Postal code*"
      placeholder="e.g. 1000 AA"
      :validator="requiredValidator"
    />
    <FormInput
      :ref="(el) => (formRefs.city = el)"
      id="city"
      v-model="form.city"
      label="City*"
      placeholder="e.g. Utrecht"
      :validator="requiredValidator"
    />
    <FormImageUpload
      :ref="(el) => (formRefs.picture = el)"
      id="picture"
      v-model="form.picture"
      label="Upload picture (PNG or JPG)*"
      :validator="requiredValidator"
      :initial-picture="initialData.picture"
    />
    <FormInput
      :ref="(el) => (formRefs.price = el)"
      id="price"
      v-model="form.price"
      label="Price*"
      placeholder="e.g. €150.000"
      type="text"
      :formatter="(value) => (value ? `€${Number(value).toLocaleString()}` : '')"
      :parser="(value) => value.replace(/[^0-9]/g, '')"
      :validator="requiredValidator"
    />

    <div class="form-row">
      <FormInput
        :ref="(el) => (formRefs.size = el)"
        id="size"
        v-model="form.size"
        label="Size*"
        placeholder="e.g. 60m2"
        :formatter="(value) => (value ? `${Number(value).toLocaleString()} m2` : '')"
        :parser="(value) => value.replace(/[^0-9]/g, '')"
        :validator="requiredValidator"
      />
      <FormSelect
        :ref="(el) => (formRefs.garage = el)"
        id="garage"
        v-model="form.garage"
        label="Garage*"
        :options="garageOptions"
        :validator="requiredValidator"
      />
    </div>

    <div class="form-row">
      <FormInput
        :ref="(el) => (formRefs.bedrooms = el)"
        id="bedrooms"
        v-model="form.bedrooms"
        label="Bedrooms*"
        placeholder="Enter amount"
        :validator="requiredValidator"
      />
      <FormInput
        :ref="(el) => (formRefs.bathrooms = el)"
        id="bathrooms"
        v-model="form.bathrooms"
        label="Bathrooms*"
        placeholder="Enter amount"
        :validator="requiredValidator"
      />
    </div>

    <FormInput
      :ref="(el) => (formRefs.constructionDate = el)"
      id="constructionDate"
      v-model="form.constructionDate"
      label="Construction date*"
      placeholder="e.g. 1990"
      :validator="requiredValidator"
    />
    <FormTextarea
      :ref="(el) => (formRefs.description = el)"
      id="description"
      v-model="form.description"
      label="Description*"
      placeholder="Enter description"
      :validator="requiredValidator"
    />

    <PrimaryButton type="submit" class="primary-btn" :class="{ disabled: !isFormValid }">{{
      isEdit ? 'SAVE' : 'POST'
    }}</PrimaryButton>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem;
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

@media (min-width: 641px) {
  .house-form {
    padding: 0;
  }
}
</style>
