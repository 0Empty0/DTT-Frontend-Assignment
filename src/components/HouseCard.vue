<script setup>
import BaseIcon from './ui/BaseIcon.vue'
import IconButton from './ui/IconButton.vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

/**
 * @typedef {import('@/services/houseApi').House} House
 */

const props = defineProps({
  /**
   * House object to display.
   * @type {House}
   */
  house: { type: Object, required: true },
})

const router = useRouter()

const address = computed(() => {
  const { street, houseNumber, houseNumberAddition } = props.house.location
  return `${street} ${houseNumber}${houseNumberAddition ? houseNumberAddition : ''}`
})

const imageUrl = computed(
  () =>
    props.house.image ||
    new URL('@/assets/images/img_placeholder_house@3x.png', import.meta.url).href,
)

const goToDetails = () => {
  router.push({ name: 'Listing', params: { id: props.house.id } })
}
</script>

<template>
  <div class="house-card" @click="goToDetails">
    <img :src="imageUrl" class="house-img" :alt="house.location.street" />
    <div class="house-content">
      <div class="house-header">
        <h2 class="house-title">{{ address }}</h2>
        <div class="house-actions">
          <IconButton icon="edit" aria-label="Edit" @click.stop="$emit('edit', house)" size="16" />
          <IconButton
            icon="delete"
            aria-label="Delete"
            @click.stop="$emit('delete', house)"
            size="16"
          />
        </div>
      </div>
      <div class="house-price">€ {{ house.price.toLocaleString('nl-NL') }}</div>
      <div class="house-location">{{ house.location.zip }} {{ house.location.city }}</div>
      <div class="house-meta">
        <span class="meta-item"><BaseIcon name="bed" size="16" /> {{ house.rooms.bedrooms }}</span>
        <span class="meta-item"
          ><BaseIcon name="bath" size="16" /> {{ house.rooms.bathrooms }}</span
        >
        <span class="meta-item"><BaseIcon name="size" size="16" /> {{ house.size }} m²</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.house-card {
  padding: 1rem;
  display: flex;
  background: var(--color-background-2);
  border-radius: 0.375rem;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.04);
  overflow: hidden;
  align-items: stretch;
  cursor: pointer;
}
.house-card + .house-card {
  margin-top: 1rem;
}
.house-img {
  height: 152px;
  aspect-ratio: 1/1;
  object-fit: cover;
  flex-shrink: 0;
  background: var(--color-tertiary);
  border-radius: 0.5rem;
}
.house-content {
  flex: 1;
  padding: 1rem;
  padding-left: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.house-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.house-title {
  font-size: var(--f-h2-desktop);
  font-weight: 700;
  margin: 0 0 0.25rem 0;
}
.house-actions {
  display: flex;
  gap: 0.5rem;
}
.house-price {
  font-weight: 500;
  margin-bottom: 0.25rem;
}
.house-location {
  color: var(--text-color-secondary);
  margin-bottom: 0.5rem;
}
.house-meta {
  display: flex;
  gap: 1.5rem;
  font-size: var(--f-meta-desktop);
  color: var(--text-color-secondary);
}
.meta-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
