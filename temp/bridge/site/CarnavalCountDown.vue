<script lang="ts" setup>
const { $dayjs } = useNuxtApp()
const { settings } = useVercelStorage()

const endDate = $dayjs(settings?.siteCountDownEndAt || '2026-02-22')
</script>

<template>
  <div class="fb-carnaval-countdown">
    <BaseContainer>
      <div class="carnaval-background">
        <div
          class="flex flex-col items-center justify-between gap-4 lg:flex-row w-full"
        >
          <h2 class="carnaval-title">
            Aproveite os descontos até
            <span>{{ endDate.format('DD/MM/YY') }}</span>
          </h2>
          <ClientOnly>
            <BaseCountDown
              :end-date="endDate.toDate()"
              label="Oferta Carnaval"
              v-slot="{ days, hours, minutes, seconds }"
            >
              <div class="countdown">
                <div class="countdown-item">
                  <div class="time">{{ days }}</div>
                  <span class="label">DIAS</span>
                </div>
                <span class="separator">:</span>
                <div class="countdown-item">
                  <div class="time">{{ hours }}</div>
                  <span class="label">HORAS</span>
                </div>
                <span class="separator">:</span>
                <div class="countdown-item">
                  <div class="time">{{ minutes }}</div>
                  <span class="label">MIN</span>
                </div>
                <span class="separator">:</span>
                <div class="countdown-item">
                  <div class="time">{{ seconds }}</div>
                  <span class="label">SEG</span>
                </div>
              </div>
            </BaseCountDown>
          </ClientOnly>
        </div>
      </div>
    </BaseContainer>
  </div>
</template>

<style>
.fb-carnaval-countdown {
  .carnaval-background {
    @apply bg-[#D9F110] rounded-3xl px-10 py-4 mt-12 flex items-center shadow-sm
         bg-repeat bg-cover bg-center;
    background-image: url('/images/front-page/bg-carnaval-stars.png');
  }

  .carnaval-title {
    @apply text-[#0a473d] font-semibold text-xl lg:text-3xl;
  }

  .countdown {
    @apply flex items-center gap-4 bg-[#c618cc] py-3 px-8 rounded-[20px];
  }

  .countdown-item {
    @apply flex flex-col items-center;
  }

  .time {
    @apply text-white font-bold text-3xl h-6 flex items-center justify-center rounded-full;
  }

  .label {
    @apply text-white text-sm;
  }

  .separator {
    @apply text-white font-bold text-lg mb-4;
  }
}
</style>
