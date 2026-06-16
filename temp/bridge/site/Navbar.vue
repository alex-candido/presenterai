<script setup lang="ts">
import { vScrollTo } from '@/utils/directives'

const localePath = useLocalePath()
const { store } = useAuth()
const { classRoomUrl } = useSite()

const isActive = ref(false)
const isVisible = ref(false)
const lastScrollY = ref(0)

const user = computed(() => store.user)

const handleScroll = () => {
  const currentScrollY = window.scrollY

  if (currentScrollY > 84) {
    isActive.value = true
    isVisible.value = currentScrollY < lastScrollY.value
  } else {
    isActive.value = false
    isVisible.value = false
  }

  lastScrollY.value = currentScrollY
}

onMounted(() => {
  document.body.classList.add('fb-bridge-site-navbar')
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div
    class="fb-bridge-site-navbar"
    :class="{ 'is-active': isActive, 'is-visible': isVisible }"
  >
    <BridgeNavbar>
      <template #brand>
        <NuxtLink :to="localePath({ name: 'index' })">
          <NuxtImg
            src="landing/icons/logo_fbonline.svg"
            :width="90"
            :height="50"
            alt="Fbonline cursos online."
            fetch-priority="low"
            class="fb-footer-logo"
          />
        </NuxtLink>
      </template>
      <template #start>
        <BridgeSiteNavbarMenu>
          <div class="navbar-menu-item">
            <div
              v-scroll-to="{ hash: '#materiais' }"
              class="navbar-menu-link font-bold hover:cursor-pointer whitespace-nowrap"
              role="button"
            >
              Materiais Didáticos
            </div>
          </div>
        </BridgeSiteNavbarMenu>
      </template>
      <template #end>
        <ClientOnly>
          <AuthProfileButton v-if="user?.email" :dark="false" />
          <BaseButton
            v-else
            type="primary"
            tag="nuxt-link"
            :to="localePath({ name: 'auth-signin' })"
            rounded
          >
            Já sou aluno
          </BaseButton>
        </ClientOnly>
      </template>
      <template #default>
        <div v-if="user?.email" class="menu-profile">
          <BridgeSiteMenuLink :to="classRoomUrl" target="_blank">
            <div class="flex items-center gap-4">
              <div class="avatar">
                <NuxtImg
                  :src="String(user?.avatar)"
                  width="36"
                  height="36"
                  alt="avatar"
                  fetch-priority="low"
                />
              </div>
              <div class="details">
                <p class="name">{{ user?.name }}</p>
                <p class="base-text">Acessar a plataforma</p>
              </div>
            </div>
          </BridgeSiteMenuLink>
          <BridgeSiteMenuLink
            :to="localePath({ name: 'signout' })"
            :icon="false"
          >
            <div class="w-full flex items-center justify-between">
              <span class="text-red-500 font-base">Sair</span>
              <BaseIconsSignout class="h-5 w-5 text-red-500" />
            </div>
          </BridgeSiteMenuLink>
        </div>
        <BaseButton
          v-else
          type="primary"
          tag="nuxt-link"
          :to="localePath({ name: 'auth-signin' })"
          rounded
          class="!bg-[#1e7c5d] hover:!bg-[#1E7C5D] !text-[#FFFF]"
        >
          Já sou aluno
        </BaseButton>
      </template>
    </BridgeNavbar>
  </div>
</template>

<style>
.fb-bridge-site-navbar {
  .fb-bridge-navbar {
    @apply h-[84px];
    @apply transition-all duration-200 ease-linear;
  }

  .menu-profile {
    @apply flex flex-col gap-2;
    .avatar {
      @apply w-10 h-10 rounded-full overflow-hidden bg-gray-200;
      img {
        @apply h-full w-full object-cover;
      }
    }
    .details {
      .name {
        @apply leading-4 font-bold text-base text-gray-900;
      }
      .base-text {
        @apply text-sm font-medium text-gray-500;
      }
    }
  }

  &.is-active {
    .fb-bridge-navbar {
      @apply bg-white/65 backdrop-blur-md -translate-y-full;
    }
  }

  &.is-visible {
    .fb-bridge-navbar {
      @apply translate-y-0;
    }
  }
}
</style>
