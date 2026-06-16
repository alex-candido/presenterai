<script setup lang="ts">
definePageMeta({
  layout: 'frontpage',
})

const banners = await queryCollection('banners').all()
const { data: products } = useProducts()

const { fetchTestimonials, institutionAgoYearFoundation } = useSite()

const title =
  'Farias Brito Online | Cursos Preparatórios Militar, Medicina e Vestibulares'

const currentYear = new Date().getFullYear()

const description = `Estude com a metodologia líder em aprovações no Brasil e garanta sua aprovação. Cursos online completos para ITA, IME, Medicina e ENEM ${currentYear}.`

const keywords =
  'Cursinho online Farias Brito, melhor preparatório militar, melhor cursinho online, curso pré-vestibular medicina, FB Online, aprovação ITA IME, metodologia Farias Brito'

useSeo(title, description, keywords)

const { data: testimonials } = await useAsyncData('testimonials', async () => {
  const { data } = await fetchTestimonials()
  return data || []
})

const hasSuperCourses = computed(() => {
  return products.value.some((product) => product.type === 'super')
})
</script>

<template>
  <div id="frontpage-index">
    <BridgeSiteNavbar />

    <BaseSection>
      <BaseContainer>
        <LandingBannerCarousel
          v-if="banners"
          :banners="banners"
          data-theme="light"
        />
      </BaseContainer>
      <BridgeSiteCarnavalCountDown />
    </BaseSection>

    <FrontpageSectionSuperCourses v-if="hasSuperCourses" />

    <FrontpageSectionCourses id="cursos" category="ENEM" tag="enem">
      <template #heading>
        <h1>
          A preparação de <span class="text-primary">referência</span> <br />
          para o <span class="text-primary">Enem e Medicina</span>
        </h1>
      </template>

      <template #description>
        <div class="text-lg text-neutral-700">
          Tenha a metodologia Farias Brito em sua casa. Um curso preparatório
          com cronograma estratégico para você garantir sua vaga no curso que
          desejar.
        </div>
      </template>
    </FrontpageSectionCourses>

    <FrontpageSectionCourses category="Militares" tag="militar">
      <template #heading>
        <h1>
          A preparação de <span class="text-primary">referência</span> <br />
          para a sua <span class="text-primary">Carreira Militar</span>
        </h1>
      </template>

      <template #description>
        <div class="text-lg text-neutral-700">
          Supere a concorrência com a disciplina e a metodologia Farias Brito,
          uma tradição de 90 anos em ensino.
        </div>
      </template>
    </FrontpageSectionCourses>

    <FrontpageSectionAbout id="materiais" />

    <FrontpageSectionStatistics />

    <FrontpageTestimonials :testimonials="testimonials">
      <template #heading>
        <h2>
          Eles confiaram na nossa <br />
          metodologia e <span class="text-primary">conquistaram a vaga</span>
        </h2>
      </template>
    </FrontpageTestimonials>

    <FrontpageSectionFaq />
  </div>
</template>
