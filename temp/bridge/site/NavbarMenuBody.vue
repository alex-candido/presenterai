<template>
  <div class="navbar-menu-body">
    <div class="navbar-menu-list">
      <span class="sub-heading"> Cursos Super </span>

      <BridgeSiteMenuLink to="/cursos/supermed">
        <BaseIllustrationNavbarLogoSuperMed class="h-6 md:h-auto md:mb-4" />
        <p class="base-text">
          Preparação para conquistar sua vaga nos cursos mais concorridos.
        </p>
      </BridgeSiteMenuLink>

      <BridgeSiteMenuLink to="/cursos/superita">
        <BaseIllustrationNavbarLogoSuperIta class="h-6 md:h-auto md:mb-4" />
        <p class="base-text">
          Preparação completa para os vestibulares militares mais difíceis.
        </p>
      </BridgeSiteMenuLink>
    </div>

    <div class="navbar-menu-list">
      <span class="sub-heading"> Cursos Enem </span>

      <BridgeSiteMenuLink to="/cursos/enem-medicina">
        <h4 class="heading">Enem + MED</h4>
        <p class="base-text">
          Foco no ENEM com aprofundamento para garantir sua vaga em Medicina.
        </p>
      </BridgeSiteMenuLink>

      <BridgeSiteMenuLink to="/cursos/enem">
        <h4 class="heading">Curso Enem</h4>
        <p class="base-text">
          A teoria completa para transformar esforço em resultado no Enem.
        </p>
      </BridgeSiteMenuLink>
    </div>

    <div class="navbar-menu-list">
      <span class="sub-heading"> Cursos Militares </span>

      <BridgeSiteMenuLink to="/cursos/ita-e-ime">
        <h4 class="heading">Curso ITA/IME</h4>
        <p class="base-text">Preparação de excelência para os vestibulares militares.</p>
      </BridgeSiteMenuLink>
      <BridgeSiteMenuLink to="/cursos/espcex">
        <h4 class="heading">Curso EsPCEx</h4>
        <p class="base-text">Conteúdo direcionado para futuros líderes militares.</p>
      </BridgeSiteMenuLink>
      <BridgeSiteMenuLink to="/cursos/afa-academia-da-forca-aerea">
        <h4 class="heading">Curso AFA</h4>
        <p class="base-text">Conteúdo aprofundado para enfrentar os desafios da Força Aérea.</p>
      </BridgeSiteMenuLink>
      <BridgeSiteMenuLink to="/cursos/efomm">
        <h4 class="heading">Curso EFOMM</h4>
        <p class="base-text">Preparação assertiva para a sua vaga na Escola de Formação de Oficiais.</p>
      </BridgeSiteMenuLink>
    </div>
  </div>
</template>

<style>
.navbar-menu-body {
  .navbar-menu-list {
    @apply space-y-2 mb-4 md:!mb-0;
  }
  .sub-heading {
    @apply px-3 text-sm font-semibold uppercase tracking-widest text-gray-400 mb-2;
  }
  .heading {
    @apply text-lg md:text-2xl !mb-0 md:mb-1 normal-case font-medium text-gray-900 transition-colors;
  }
  .base-text {
    @apply hidden md:block text-sm text-gray-500 mt-1 leading-snug;
  }
}

@screen md {
  .navbar-menu-body {
    @apply grid grid-cols-3 gap-2 w-[850px];
  }
  .navbar-menu-list {
    @apply flex flex-col gap-1;
  }
}

</style>
