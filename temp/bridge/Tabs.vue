<script lang="ts" setup>
const props = defineProps({
  fullwidth: {
    type: Boolean,
    default: false,
  },
})

const modelValue = defineModel<number>('modelValue', { default: 0 })

const { activeTabIndex } = provideTabs(modelValue.value)

// Sincroniza mudanças do provider para o modelValue
watch(activeTabIndex, (newValue) => {
  modelValue.value = newValue
})

// Sincroniza mudanças do modelValue para o provider
watch(modelValue, (newValue) => {
  activeTabIndex.value = newValue
})
</script>

<template>
  <div
    class="fb-bridge-tabs"
    :class="{ 'w-full': fullwidth, 'w-fit': !fullwidth }"
  >
    <slot />
  </div>
</template>

<style>
.fb-bridge-tabs {
  @apply flex gap-2 rounded-full bg-neutral-100/50 max-w-full max-lg:overflow-x-auto;
}
</style>
