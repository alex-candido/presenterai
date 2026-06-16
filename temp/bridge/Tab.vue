<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})

const { isActive, select } = useTabItem()
</script>

<template>
  <div
    class="fb-bridge-tab"
    :class="{ 'is-active': isActive }"
    role="button"
    @click="select"
  >
    {{ title }}
  </div>
</template>

<style>
.fb-bridge-tab {
  @apply py-3 px-6 cursor-pointer select-none text-center text-sm font-semibold;
  @apply text-sm lg:text-base text-neutral-600 bg-transparent rounded-full;
  @apply transition-all duration-75;

  &.is-active {
    @apply text-white bg-primary;
  }
}
</style>
