<template>
  <section class="home">
    <div class="home__container">
      <h1>Ваші рослини тут</h1>
      <div class="home__img">
        <img src="@/assets/images/homePage/home.png" alt="Photo plants" title="Photo plants" />
      </div>
      <RouterLink class="home__btn" :to="{ name: 'TheCatalogPage' }"> Каталог </RouterLink>
    </div>
  </section>
  <TheSlider :title="title" :values="newsPlants" :sliderName="'news'" :slidesPerView="1" />
  <!-- <TheAbout v-if="$route.name === ''" /> -->
  <TheAbout />
  <TheOftenQuestions />
  <TheSliderBlog :title="blogTitle" :slidesPerView="slidesPerView" />
</template>

<script>
import TheSlider from '@/components/slider/TheSlider.vue'
import TheSliderBlog from '@/components/slider/TheSliderBlog.vue'
import TheAbout from '@/components/TheAbout.vue'
import TheOftenQuestions from '@/components/TheOftenQuestions.vue'

import { mapState, mapActions } from 'pinia'
import { useCategoriesStore } from '@/stores/categories'
export default {
  name: 'HomePage',
  components: {
    TheSlider,
    TheAbout,
    TheOftenQuestions,
    TheSliderBlog
  },
  data() {
    return {
      title: 'НОВИНКИ',
      blogTitle: 'БЛОГ',
      slidesPerView: 2
    }
  },

  computed: {
    ...mapState(useCategoriesStore, ['newsPlants']),
    isDataExists() {
      return Boolean(localStorage.getItem('newsPlants'))
    }
  },
  methods: {
    ...mapActions(useCategoriesStore, ['getStatusPlants'])
  },
  async created() {
    if (!localStorage.getItem('newsPlants')) {
      await this.getStatusPlants()
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  &__container {
    position: relative;
    margin-bottom: 160px;
    @media (min-width: $md) {
      margin-bottom: 300px;
    }
    @media (min-width: $lg) {
      margin-bottom: 428px;
    }
  }
  & h1 {
    font-size: font-rem(40);
    text-transform: uppercase;
    font-weight: 400;
    text-align: center;
    @media (min-width: $sm) {
      font-size: font-rem(60);
    }
    @media (min-width: $md) {
      font-size: font-rem(100);
    }
    @media (min-width: $xl) {
      font-size: font-rem(120);
    }
    @media (min-width: $xxl) {
      font-size: font-rem(140);
    }
  }
  // .home__img
  &__img {
    height: 412px;
    margin-top: 20px;
    @media (min-width: $md) {
      height: 520px;
    }
    @media (min-width: $lg) {
      height: 600px;
    }
    @media (min-width: $xl) {
      height: 680px;
    }
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__btn {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 67px;
    min-width: 288px;
    background-color: $orange;
    border-radius: 16px;
    font-size: font-rem(24);
    font-family: 'ZenAntique';
    color: $white;
    text-transform: uppercase;
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    @media (min-width: $md) {
      max-width: 305px;
      height: 78px;
      transition: $time;
      &:hover {
        box-shadow: 0px 6px 6px 0px $primary-orange;
      }
      &:active {
        bottom: 48px;
      }
    }
    @media (min-width: $lg) {
      width: 305px;
      font-size: font-rem(32);
    }
  }
}
</style>
