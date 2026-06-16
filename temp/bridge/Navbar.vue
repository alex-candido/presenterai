<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'

const isOpenSheet = ref(false)

const router = useRouter()
const isMobile = useMediaQuery('(max-width: 768px)')

const toggleSheet = () => (isOpenSheet.value = !isOpenSheet.value)
const closeSheet = () => (isOpenSheet.value = false)

watch(isMobile, (bool) => {
  if (isOpenSheet.value) {
    isOpenSheet.value = bool
  }
})

watch(isOpenSheet, (val) => {
  if (import.meta.client) {
    document.documentElement.style.overflow = val ? 'hidden' : ''
  }
})

router.afterEach(() => {
  isOpenSheet.value = false
})
</script>

<template>
  <nav class="fb-bridge-navbar">
    <BaseContainer class="flex w-full h-full">
      <div class="fb-navbar-brand h-[83px] w-[10rem] flex items-center justify-left">
        <slot name="brand" />
      </div>

      <div class="fb-navbar-content w-full flex justify-between">
        <div
          class="fb-navbar-start relative hidden md:flex mr-auto items-center justify-center"
        >
          <slot name="start" />
        </div>

        <div class="fb-navbar-end ml-auto flex items-center justify-center">
          <slot name="end" :is-open="isOpenSheet" />
          <button
            class="sheet-trigger md:hidden p-2 transition-colors hover:bg-gray-100 rounded-lg outline-none ml-4"
            @click="toggleSheet()"
          >
            <BaseIconsBurger
              class="h-6 w-6 transition-transform duration-0 text-gray-400"
            />
          </button>
        </div>
      </div>
    </BaseContainer>
  </nav>
  <Teleport to="body">
    <div class="fb-bridge-navbar-mobile relative">
      <Transition name="sheet">
        <div
          v-if="isOpenSheet"
          class="sheet fixed right-0 top-0 left-0 z-[101] h-full w-full bg-[#ffff] shadow-2xl flex flex-col overflow-hidden"
        >
          <div
            class="sheet-header h-[83px] flex items-center justify-between py-3 mb-6 px-4"
          >
            <slot name="brand" />
            <button
              @click="closeSheet()"
              class="p-1 transition-colors hover:bg-gray-100 rounded-lg outline-none"
            >
              <BaseIconsClose class="h-6 w-6" />
            </button>
          </div>
          <div class="sheet-content flex-1 overflow-y-auto px-4">
            <slot name="start" />
          </div>
          <div class="sheet-footer mt-auto py-5 border-t border-gray-200 px-4">
            <slot />
          </div>
        </div>
      </Transition>
      <Transition name="backdrop">
        <div
          v-if="isOpenSheet"
          @click="closeSheet()"
          class="sheet-backdrop fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
        />
      </Transition>
    </div>
  </Teleport>
</template>

<style>
.fb-bridge-navbar {
  @apply fixed h-[84px] top-0 left-0 right-0 z-50 bg-white;
}

.fb-bridge-navbar-mobile {
  .backdrop-enter-active,
  .backdrop-leave-active {
    @apply transition-opacity duration-0 ease-in-out;
  }
  .backdrop-enter-from,
  .backdrop-leave-to {
    @apply opacity-0;
  }
  .backdrop-enter-to,
  .backdrop-leave-from {
    @apply opacity-100;
  }

  .sheet-enter-active {
    @apply transition-transform duration-0;
    transition-timing-function: cubic-bezier(0.32, 0.72, 0, 1);
  }
  .sheet-leave-active {
    @apply transition-transform duration-0 ease-in-out;
  }
  .sheet-enter-from,
  .sheet-leave-to {
    @apply translate-x-full;
  }
  .sheet-enter-to,
  .sheet-leave-from {
    @apply translate-x-0;
  }
}
</style>
