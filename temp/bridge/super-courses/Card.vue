<script setup lang="ts">
const props = defineProps({
  productSlug: {
    type: String,
    required: true,
  },
  type: {
    type: String as PropType<'enem' | 'militar'>,
    required: true,
    default: 'enem',
  },
})

const localePath = useLocalePath()

import SuperMilitarLogo from '@/components/base/illustration/LogoSuperIta.vue'
import SuperMedLogo from '@/components/base/illustration/LogoSuperMed.vue'

import CarnavalFlag from '@/components/base/illustration/super-courses/CarnavalFlag.vue'

const { data: products } = useProducts()

const product = computed(() =>
  products.value.find((p) => p.slug === props.productSlug)
)
if (!product.value) {
  throw new Error(`Produto ${props.productSlug} não encontrado`)
}

const {
  plan,
  discount,
  hasDiscount,
  fullPriceI18n,
  finalPriceI18n,
  maxInstallment,
  installmentValueFull,
} = usePlan(product.value)

const { buyNow } = useShoppingCart()

const ProductLogo = computed(() => {
  if (props.type === 'militar') {
    return SuperMilitarLogo
  }

  return SuperMedLogo
})

const ProductFlag = computed(() => {
  // if (props.type === 'militar') {
  //   return MilitarFlag
  // }

  // return MedFlag
  return CarnavalFlag
})
</script>
<template>
  <div class="fb-bridge-super-course-card" :class="'is-' + type">
    <div class="discount">
      <div class="discount-text font-carnival">
        <span class="discount-value">{{ discount?.info }}</span
        ><br /><span class="discount-label">OFF</span>
      </div>
      <component :is="ProductFlag" class="flag" />
    </div>
    <div class="fb-bridge-super-course-card-body">
      <component :is="ProductLogo" class="-mx-6" />
      <div class="description">
        <slot name="description"></slot>
      </div>
      <div
        class="bg-[#F4F6F7] pt-6 pb-5 px-6 flex flex-col gap-2 rounded-s-2xl rounded-e-3xl"
      >
        <div v-if="hasDiscount" class="text-primary-dark">
          De
          <span class="line-through">{{ fullPriceI18n }}</span>
          por até
        </div>
        <div class="text-primary-dark text-4xl font-anek-latin leading-none">
          {{ maxInstallment }}x
          <span class="text-5xl font-semibold">{{
            installmentValueFull(maxInstallment)
          }}</span>
        </div>
        <div class="text-primary-dark">{{ finalPriceI18n }} à vista</div>
      </div>

      <BaseButton
        class="w-full mt-6 relative z-20"
        type="primary"
        rounded
        @click="buyNow(plan, product)"
      >
        <span class="flex-1 text-start"> Adquira Agora </span>

        <template #right>
          <BaseIconsBag />
        </template>
      </BaseButton>
    </div>
    <NuxtLink
      :to="localePath({ name: 'courses-id', params: { id: product.slug } })"
      class="absolute inset-0 z-10"
    ></NuxtLink>
  </div>
</template>

<style>
.fb-bridge-super-course-card {
  /* @apply relative p-1 bg-gradient-to-br from-[#CCFDA0] via-[#19A779] to-[#CCFDA0] rounded-3xl; */
  @apply relative p-1 bg-gradient-to-br from-[#CEF100] via-[#C618CC] to-[#CEF100] rounded-3xl;
  &-body {
    @apply bg-white flex flex-col gap-4 pt-14 pb-4 px-6 h-full rounded-3xl;
  }
  .discount {
    @apply absolute right-2 -mt-6 text-white text-xs font-bold px-3 pt-4 pb-5;
    @apply text-center p-4 text-2xl font-anek-latin leading-none;

    .discount-text {
      @apply absolute left-0 right-0 translate-x-2 translate-y-1 z-10;
    }

    .font-carnival {
      @apply font-black text-center uppercase;
      transform: rotate(-8deg) translateY(4px) translateX(2px);
      color: #ffffff;
      text-shadow: -1.3px -1.3px 0 #19a779, 1.3px -1.3px 0 #19a779,
        -1.3px 1.3px 0 #19a779, 1.3px 1.3px 0 #19a779, 3px 3px 0px #c618cc,
        4px 4px 0px #c618cc;
      -webkit-font-smoothing: antialiased;
    }

    .discount-value {
      @apply text-4xl leading-[0.8] tracking-tighter;
    }

    .discount-label {
      @apply text-3xl leading-[0.8] block;
    }

    .flag {
      @apply -mt-2;
    }
  }
  .description {
    @apply flex-1;
  }

  &.is-militar {
    /* @apply bg-gradient-to-bl from-[#F4D180] via-[#9DBA3C] to-[#F4D180]; */
    @apply bg-gradient-to-bl from-[#CEF100] via-[#C618CC] to-[#CEF100];
  }
}
</style>
