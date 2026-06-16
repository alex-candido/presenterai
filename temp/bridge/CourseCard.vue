<script lang="ts" setup>
const props = defineProps({
  product: {
    type: Object as PropType<Product.Product>,
    required: true,
  },
  intervalCount: {
    type: Number,
    required: false,
    default: 0,
  },
})

const { buyNow } = useShoppingCart()
const localePath = useLocalePath()

const { getProductPicture } = useProducts()

const {
  plan,
  discount,
  hasDiscount,
  fullPriceI18n,
  finalPriceI18n,
  maxInstallment,
  perMonthFull,
  setPlan,
} = usePlan(props.product, props.intervalCount)

const productPicture = getProductPicture(props.product, 'home_page')

watch(
  () => props.intervalCount,
  (newPeriodIntervalCount) => {
    const newPlan = props.product.plans.find(
      (p) => p.interval_count === newPeriodIntervalCount
    )

    if (newPlan) setPlan(newPlan)
  }
)
</script>

<template>
  <div class="fb-bridge-course-card">
    <NuxtImg
      class="fb-bridge-course-card-media"
      :src="productPicture"
      :alt="product.short_description"
      format="webp"
      loading="lazy"
      fetch-priority="low"
    />

    <div class="fb-bridge-course-card-content">
      <div
        v-if="hasDiscount"
        class="absolute top-4 left-4 lg:top-6 lg:left-6 py-2 px-4 bg-primary rounded-full font-anek-latin font-medium"
      >
        {{ discount?.info }} Off
      </div>
      <div class="text-4xl font-anek-latin font-bold mb-3">
        {{ product.title }}
      </div>
      <div v-html="product.short_description || product.description"></div>
      <hr class="my-5 lg:my-6 h-[2px] bg-white/5" />
      <div class="grid grid-cols-1 lg:grid-cols-12 items-end gap-2">
        <div class="flex flex-col gap-1 col-span-5 4xl:col-span-6">
          <div v-if="hasDiscount" class="text-white/80">
            De
            <span class="line-through">{{ fullPriceI18n }}</span>
            por até
          </div>
          <div class="inline-flex lg:block items-end gap-2 max-lg:mb-2">
            <div class="lg:font-bold">
              <span v-if="!plan?.is_recurring" class="lg:text-2xl">
                {{ maxInstallment }}x
              </span>
              <span class="text-2xl font-bold">{{ perMonthFull }}</span>
              <span v-if="plan?.is_recurring" class="text-base">
                / todo mês</span
              >
            </div>
            <div v-if="!plan?.is_recurring" class="text-white/80">
              ou {{ finalPriceI18n }} <span class="max-lg:hidden">à vista</span>
            </div>
          </div>
        </div>
        <div class="col-span-7 4xl:col-span-6">
          <BaseButton
            class="w-full text-left buy-now"
            type="light"
            :rounded="true"
            @click="buyNow(plan, product)"
          >
            <span class="flex-1"> Adquira Agora </span>
            <template #right>
              <BaseIconsBag />
            </template>
          </BaseButton>
        </div>
      </div>
      <div class="fb-bridge-course-card-about">
        <div>Clique e Conheça o Curso</div>
      </div>
    </div>

    <NuxtLink
      :to="localePath({ name: 'courses-id', params: { id: product.slug } })"
      class="absolute inset-0 z-10"
    ></NuxtLink>
  </div>
</template>

<style>
.fb-bridge-course-card {
  @apply relative block bg-black w-full h-full aspect-[3/4] lg:aspect-[1/1] rounded-3xl overflow-hidden select-none hover:cursor-pointer;
  @apply before:content-[''] before:pointer-events-none;
  @apply before:absolute before:inset-0 before:z-[5] before:h-5/6 before:w-full before:mt-auto;
  @apply before:bg-gradient-to-b before:from-transparent before:from-10% before:via-black/75 before:via-80% before:to-black/80;

  &-media {
    @apply absolute top-0 left-0 w-full h-full object-cover object-center;
    @apply transition-transform duration-500 ease-in-out;
  }

  &-content {
    @apply absolute p-5 lg:p-8 flex flex-col justify-end text-white h-full w-full pointer-events-none z-20;
  }

  &-about {
    @apply relative z-10 flex items-center justify-center h-full max-h-0 overflow-hidden transition-all duration-200 ease-linear;
    @apply border-white/5 text-white/5;
  }

  &:hover &-about {
    @apply max-h-20 mt-5 -mb-6 border-t-2 text-white;
  }

  &:hover {
    @apply after:content-[''] after:pointer-events-none;
    @apply after:absolute after:inset-0 after:z-10;
    @apply after:bg-gradient-to-b from-transparent from-10% via-primary/20 via-70% to-primary;
    @apply after:bottom-0 after:left-0 after:mt-auto after:w-full after:h-1/2;
  }

  .buy-now {
    @apply relative z-30 pointer-events-auto;
  }
}
</style>
