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
  <TheAbout v-if="$route.name === ''" />
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
    margin-bottom: 200px;
    @media (min-width: $md) {
      margin-bottom: 300px;
    }
  }
  & h1 {
    font-size: font-rem(70);
    text-transform: uppercase;
    font-weight: 400;
    text-align: center;
    @media (min-width: $sm) {
      font-size: font-rem(80);
    }
    @media (min-width: $md) {
      font-size: font-rem(100);
    }
    @media (min-width: $lg) {
      font-size: font-rem(140);
    }
  }
  // .home__img
  &__img {
    max-height: 680px;
    margin-top: 20px;
    & img {
      width: 100%;
      min-height: 200px;
      object-fit: cover;
    }
  }

  &__btn {
    cursor: pointer;
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 100%;
    background-color: $orange;
    border-radius: 16px;
    font-size: font-rem(32);
    font-family: 'ZenAntique';
    color: $white;
    text-transform: uppercase;
    @media (min-width: $sm) {
      margin-top: 0;
      position: absolute;
      max-width: 240px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      bottom: 46px;
      left: 50%;
      transform: translateX(-50%);
    }
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
  }
}
</style>
