<script setup>
import { computed } from 'vue'

/**
 * Generic icon component that maps directly to PNG assets in
 * `src/assets/icons`. This keeps markup clean and centralises path logic.
 */
const props = defineProps({
  /**
   * Icon name without the `ic_` prefix and `@3x.png` suffix.
   * Example: `bed` → resolves to `src/assets/icons/ic_bed@3x.png`.
   */
  name: { type: String, required: true },
  /** Image size in px (applies to both width and height). */
  size: { type: [Number, String], default: 24 },
  /** Alt text – defaults to the icon name. */
  alt: { type: String, default: '' },
})

const src = computed(
  () => new URL(`../../assets/icons/ic_${props.name}@3x.png`, import.meta.url).href,
)
</script>

<template>
  <img :src="src" :alt="alt || name" :width="size" :height="size" />
</template>

<style scoped>
img {
  display: inline-block;
}
</style>
