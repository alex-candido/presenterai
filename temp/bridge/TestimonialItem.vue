<script setup lang="ts">
import * as cheerio from 'cheerio'

const props = defineProps({
  testimonialStudent: {
    type: Object as PropType<Testimonial>,
    required: true,
  },
})

const maxLengthDescription = 100
const isFullDescription = ref(false)

const description = computed(() => {
  const $ = cheerio.load('<div></div>')
  $('div').html(props.testimonialStudent.description)
  return $('div').text()
})

function toggleDescription() {
  isFullDescription.value = !isFullDescription.value
}
</script>

<template>
  <div class="fb-bridge-testimonial-item">
    <div class="fb-bridge-testimonial-item-content">
      <BaseIconsCitation class="text-primary mb-3" />

      <div class="font-semibold mb-2">
        {{ testimonialStudent.short_description }}
      </div>
    </div>

    <div class="fb-bridge-testimonial-item-text mb-4">
      <div
        :class="{
          'line-clamp-none': isFullDescription,
        }"
        class="line-clamp-3 text-left mb-2"
      >
        {{ description }}
      </div>
      <div
        class="font-medium"
        v-if="description.length > maxLengthDescription"
        @click="toggleDescription"
      >
        <a v-if="!isFullDescription">Ler mais</a>
        <a v-else>Ler menos</a>
      </div>
    </div>

    <div class="fb-bridge-testimonial-item-profile">
      <div class="overflow-hidden rounded-full h-[28px] w-[28px]">
        <NuxtImg
          :src="testimonialStudent.avatar"
          :alt="testimonialStudent.name"
          class="object-cover"
          loading="lazy"
          format="webp"
          quality="35"
          fetch-priority="low"
          :width="40"
          :height="40"
        />
      </div>

      <div class="text-ellipsis line-clamp-1">
        {{ testimonialStudent.name }}
      </div>
    </div>
  </div>
</template>

<style>
.fb-bridge-testimonial-item {
  @apply bg-neutral-50/60 px-10 py-8 select-none rounded-[32px] h-full;

  &-profile {
    @apply bg-white flex gap-2 items-center w-fit rounded-full p-[6px] pr-4 font-anek-latin font-semibold;
  }
}
</style>
