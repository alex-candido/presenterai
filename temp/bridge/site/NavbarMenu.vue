<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'

const isOpenMenu = ref<boolean>(false)
const timeoutId = ref<ReturnType<typeof setTimeout> | null>(null)

const router = useRouter()
const isMobile = useMediaQuery('(max-width: 768px)')

const activeMenu = () => {
  if (timeoutId.value) clearTimeout(timeoutId.value)
  isOpenMenu.value = true
}

const closeMenu = () => {
  if (timeoutId.value) clearTimeout(timeoutId.value)
  timeoutId.value = setTimeout(() => {
    isOpenMenu.value = false
  }, 150)
}

router.afterEach(() => {
  isOpenMenu.value = false
})
</script>

<template>
  <div class="fb-bridge-site-navbar-menu z-60 flex items-center justify-center">
    <ClientOnly>
      <div
        v-if="!isMobile"
        class="navbar-menu-wrapper group relative flex flex-1 list-none items-center justify-center gap-3"
      >
        <div class="navbar-menu-item">
          <button
            class="navbar-menu-trigger relative group inline-flex h-10 w-max items-center justify-center rounded-md transition-colors duration-300"
            @mouseenter="activeMenu()"
            @mouseleave="closeMenu()"
          >
            <span class="font-bold cursor-pointer">Nossos Cursos</span>
            <BaseIconsChevronDown
              class="ml-1 h-4 w-4 transition-transform duration-300 text-gray-400"
              :class="{ 'rotate-180': isOpenMenu }"
            />
          </button>
          <div
            v-if="isOpenMenu"
            class="navbar-menu-content absolute top-full left-0 z-50 mt-2 rounded-xl border border-gray-200 bg-white p-6 shadow-xl text-gray-900"
            @mouseenter="activeMenu()"
            @mouseleave="closeMenu()"
          >
            <BridgeSiteNavbarMenuBody />
          </div>
        </div>
        <slot />
      </div>

      <div v-if="isMobile" class="navbar-menu-wrapper-mobile h-full w-full">
        <BridgeSiteNavbarMenuBody />
      </div>
    </ClientOnly>
  </div>
</template>

<style>
.fb-bridge-site-navbar-menu {
  @apply flex items-center justify-center h-full gap-12;
  .navbar-menu-item {
    @apply relative h-10 mx-3 flex items-center;
  }
  .navbar-menu-item::after {
    @apply absolute bottom-0 left-1/2 h-[2px] w-0 bg-[#00d1b2] transition-all duration-300 ease-in-out -translate-x-1/2 content-[''];
  }

  .navbar-menu-item:hover::after {
    @apply w-full text-gray-900;
  }
}
</style>
