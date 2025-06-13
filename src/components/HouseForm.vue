<script setup>
import { ref, watch } from 'vue'
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

const streetNameRef = ref(null)
const houseNumberRef = ref(null)
const postalCodeRef = ref(null)
const cityRef = ref(null)
const pictureRef = ref(null)
const priceRef = ref(null)
const sizeRef = ref(null)
const garageRef = ref(null)
const bedroomsRef = ref(null)
const bathroomsRef = ref(null)
const constructionDateRef = ref(null)
const descriptionRef = ref(null)

const requiredValidator = (value) => (value ? '' : 'Required field missing.')

const garageOptions = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
]

const validateForm = () => {
  const refs = [
    streetNameRef,
    houseNumberRef,
    postalCodeRef,
    cityRef,
    pictureRef,
    priceRef,
    sizeRef,
    garageRef,
    bedroomsRef,
    bathroomsRef,
    constructionDateRef,
    descriptionRef,
  ]
  const validations = refs.map((ref) => ref.value?.validate())
  return validations.every((isValid) => isValid)
}

const handleSubmit = () => {
  if (validateForm()) {
    emit('submit', form.value)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <FormInput
      ref="streetNameRef"
      id="streetName"
      v-model="form.streetName"
      label="Street name*"
      placeholder="Enter the street name"
      :validator="requiredValidator"
    />

    <div class="form-row">
      <FormInput
        ref="houseNumberRef"
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
      ref="postalCodeRef"
      id="postalCode"
      v-model="form.postalCode"
      label="Postal code*"
      placeholder="e.g. 1000 AA"
      :validator="requiredValidator"
    />
    <FormInput
      ref="cityRef"
      id="city"
      v-model="form.city"
      label="City*"
      placeholder="e.g. Utrecht"
      :validator="requiredValidator"
    />
    <FormImageUpload
      ref="pictureRef"
      id="picture"
      v-model="form.picture"
      label="Upload picture (PNG or JPG)*"
      :validator="requiredValidator"
    />
    <FormInput
      ref="priceRef"
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
        ref="sizeRef"
        id="size"
        v-model="form.size"
        label="Size*"
        placeholder="e.g. 60m2"
        :formatter="(value) => (value ? `${Number(value).toLocaleString()} m2` : '')"
        :parser="(value) => value.replace(/[^0-9]/g, '')"
        :validator="requiredValidator"
      />
      <FormSelect
        ref="garageRef"
        id="garage"
        v-model="form.garage"
        label="Garage*"
        :options="garageOptions"
        :validator="requiredValidator"
      />
    </div>

    <div class="form-row">
      <FormInput
        ref="bedroomsRef"
        id="bedrooms"
        v-model="form.bedrooms"
        label="Bedrooms*"
        placeholder="Enter amount"
        :validator="requiredValidator"
      />
      <FormInput
        ref="bathroomsRef"
        id="bathrooms"
        v-model="form.bathrooms"
        label="Bathrooms*"
        placeholder="Enter amount"
        :validator="requiredValidator"
      />
    </div>

    <FormInput
      ref="constructionDateRef"
      id="constructionDate"
      v-model="form.constructionDate"
      label="Construction date*"
      placeholder="e.g. 1990"
      :validator="requiredValidator"
    />
    <FormTextarea
      ref="descriptionRef"
      id="description"
      v-model="form.description"
      label="Description*"
      placeholder="Enter description"
      :validator="requiredValidator"
    />

    <PrimaryButton type="submit">{{ isEdit ? 'SAVE' : 'POST' }}</PrimaryButton>
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
