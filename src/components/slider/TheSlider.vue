<template>
  <section class="slider">
    <div class="slider__container">
      <h2 class="slider__title">{{ title }}</h2>
      <swiper-container
        ref="sliderName"
        :slides-per-view="slidesPerView"
        :loop="true"
        :pagination="{
          type: 'progressbar',
          el: '.swiper-pagination-progressbar '
        }"
        space-between="72"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }"
        :breakpoints="{
          400: {
            slidesPerView: 1.1,
            spaceBetween: 30
          },
          500: {
            slidesPerView: 1.5,
            spaceBetween: 40
          },
          700: {
            slidesPerView: 1.8
          },
          992: {
            slidesPerView: 2.5,
            spaceBetween: 50
          },
          1050: {
            slidesPerView: 3
          },
          1572: {
            slidesPerView: 4,
            spaceBetween: 72
          }
        }"
      >
        <swiper-slide v-for="value in values" :key="value.id">
          <TheSliderItem :value="value" :new-arrivals="title" />
        </swiper-slide>
      </swiper-container>
      <div class="swiper-pagination-progressbar" ref="progressBar">
        <span class="swiper-pagination-progressbar-fill"></span>
      </div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </section>
</template>

<script>
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import { register } from 'swiper/element/bundle'
import TheSliderItem from './TheSliderItem.vue'
export default {
  name: 'TheSlider',
  components: {
    TheSliderItem
  },
  props: {
    values: {
      type: Array,
      required: true
    },
    title: {
      type: String
    },
    sliderName: {
      type: String
    },
    slidesPerView: {
      type: Number
    }
  },
  mounted() {
    register()
  }
}
</script>

<style lang="scss" scoped>
.slider {
  margin-bottom: 100px;
  @media (min-width: $md) {
    margin-bottom: 180px;
  }
  @media (min-width: $lg) {
    margin-bottom: 280px;
  }
  // .slider__container
  &__container {
    position: relative;
    margin-top: 40px;
    @media (min-width: $sm) {
      margin-top: 75px;
    }
  }
  &__title {
    position: absolute;
    top: -98px;
    left: 15px;
    transform: translateY(-50%);
    font-size: font-rem(40);
    font-weight: 400;
    text-transform: uppercase;
    color: $secondary-black;
  }
}
.swiper-pagination-progressbar {
  position: absolute;
  top: -75px;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: $grey;
}

.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: -88px;
  width: 36px;
  height: 36px;
  border: 1.5px solid $main-black;
  border-radius: 16px;
  transform: translate(-100%, -50%);
  @media (min-width: $lg) {
    width: 50px;
    height: 50px;
  }
  @media (min-width: $xl) {
    width: 54px;
    height: 54px;
  }
  &::after {
    content: '';
    background-size: cover;
    background-position: center;
    height: 18px;
    width: 9px;
  }
}
.swiper-button-prev {
  left: 86%;
  @media (min-width: $sm) {
    left: 90.57%;
  }
  &::after {
    background-image: url('@/assets/images/newPlants/arrow-left.svg');
  }
}
.swiper-button-next {
  left: 99%;
  @media (min-width: $xl) {
    left: 100%;
  }
  &::after {
    background-image: url('@/assets/images/newPlants/arrow-rigth.svg');
  }
}
</style>
