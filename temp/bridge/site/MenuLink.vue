<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';

const props = defineProps({
  to: {
    type: [String, Object],
    default: null,
  },
  icon: {
    type: Boolean,
    default: true,
  },
})

const isMobile = useMediaQuery('(max-width: 768px)')
</script>

<template>
  <NuxtLink
    v-if="isMobile"
    :to="props.to || '#'"
    class="sheet-link flex items-center justify-between p-3 bg-gray-100 rounded-xl transition-all active:scale-[0.98] active:bg-gray-100 group/sheet-link"
  >
    <div
      class="w-full text-lg normal-case font-normal text-gray-900 transition-colors flex items-center gap-2"
    >
      <slot />
    </div>
    <BaseIconsArrowUpRight
      v-if="props.icon"
      class="h-5 w-5 text-gray-400 transition-transform group-hover/sheet-link:translate-x-0.5 group-hover/sheet-link:-translate-y-0.5"
    />
  </NuxtLink>
  <NuxtLink
    v-else
    :to="props.to || '#'"
    class="navbar-menu-link relative block group/card select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-200/80 focus:bg-gray-100"
  >
    <slot />
    <BaseIconsArrowUpRight
      class="absolute top-3 right-3 h-5 w-5 text-gray-400 opacity-0 transition-all duration-300 group-hover/card:opacity-100 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
    />
  </NuxtLink>
</template>