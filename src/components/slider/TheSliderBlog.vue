<template>
  <section class="blog">
    <div class="blog__container">
      <h2 class="blog__title">{{ title }}</h2>
      <swiper-container
        :slides-per-view="slidesPerView"
        loop="true"
        :pagination="{
          type: 'progressbar',
          el: '.swiper-pagination-progressbar-blog'
        }"
        space-between="72"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }"
      >
        <swiper-slide v-for="article in articles" :key="article.id">
          <div class="blog__img">
            <img :src="article.img" :alt="article.title" :title="article.title" />
          </div>
          <div class="blog__content">
            <div class="blog__info">
              <span class="blog__heading">{{ article.title }}</span>
              <span class="blog__data">{{ article.data }}</span>
            </div>
            <RouterLink
              :to="{ name: 'TheBlogSinglePage', params: { id: article.id } }"
              class="blog__link"
              >Читати більше</RouterLink
            >
          </div>
        </swiper-slide>
      </swiper-container>
      <div class="swiper-pagination-progressbar-blog" ref="progressBarSlider"></div>
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
import { mapState } from 'pinia'
import { useBlogsStore } from '@/stores/blogs'

export default {
  name: 'TheSliderBlog',
  data() {
    return {}
  },
  props: {
    title: {
      type: String
    },
    slidesPerView: {
      type: Number
    }
  },
  computed: {
    ...mapState(useBlogsStore, ['articles'])
  },
  mounted() {
    register()
  }
}
</script>

<style lang="scss" scoped>
.blog {
  margin-bottom: 280px;
  &__container {
    position: relative;
    margin-top: 75px;
  }
  &__title {
    position: absolute;
    top: -98px;
    left: 0;
    margin-left: 15px;
    transform: translateY(-50%);
    font-size: font-rem(40);
    font-weight: 400;
    text-transform: uppercase;
    color: $secondary-black;
    @media (min-width: $xl) {
      margin-left: 0;
    }
  }
  &__img {
    max-height: 440px;
    border-radius: 24px;
    & img {
      height: 100%;
    }
  }
  &__heading {
    color: $secondary-black;
    font-weight: 500;
    font-size: font-rem(18);
    display: block;
    margin: 0px 0 0 0;
  }
  &__content {
    display: flex;
    justify-content: space-between;
    height: 80px;
    margin-top: 24px;
  }
  &__info {
    font-family: 'Lato';
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__data {
    color: $grey;
  }
  &__link {
    flex: 0 0 158px;
    height: 54px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid $secondary-green;
    border-radius: 12px;
    color: $secondary-green;
    font-weight: 500;
    align-self: flex-end;
    transition: $time;
    &:hover {
      color: $white;
      background-color: $secondary-green;
    }
  }
}

.swiper-pagination-progressbar-blog {
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
