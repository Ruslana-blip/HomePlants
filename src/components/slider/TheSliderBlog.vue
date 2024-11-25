<template>
  <section class="blog">
    <div class="blog__container">
      <h2 class="blog__title">{{ title }}</h2>
      <swiper-container
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
        :breakpoints="{
          320: {
            slidesPerView: 1.1,
            spaceBetween: 16
          },
          576: {
            slidesPerView: 1.4
          },
          700: {
            slidesPerView: 2.1,
            spaceBetween: 24
          },
          992: {
            slidesPerView: 2.5,
            spaceBetween: 50
          },
          1050: {
            slidesPerView: 3
          },
          1400: {
            slidesPerView: 2,
            spaceBetween: 72
          }
        }"
      >
        <swiper-slide v-for="article in articles" :key="article.id" class="blog__wrapp">
          <div class="blog__img">
            <img :src="article.img" :alt="article.title" :title="article.title" />
          </div>
          <div class="blog__content">
            <div class="blog__info">
              <span class="blog__heading">{{ article.title }}</span>
              <span class="blog__data">{{ article.data }}</span>
              <RouterLink
                :to="{ name: 'TheBlogSinglePage', params: { id: article.id } }"
                class="blog__link"
                >{{ $t('read') }}</RouterLink
              >
            </div>
          </div>
        </swiper-slide>
      </swiper-container>
      <div class="swiper-pagination-progressbar-blog" ref="progressBarSlider"></div>
      <div class="blog__navigation">
        <div class="swiper-button-prev prev"></div>
        <div class="swiper-button-next next"></div>
      </div>
    </div>
  </section>
</template>

<script>
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import { register } from 'swiper/element/bundle'

export default {
  name: 'TheSliderBlog',
  data() {
    return {
      articles: []
    }
  },
  props: {
    title: {
      type: String
    }
  },
  watch: {
    '$i18n.locale'(newLocale) {
      this.updateArticles(newLocale)
    }
  },
  methods: {
    updateArticles(locale) {
      this.articles = this.$i18n.messages[locale].articles || []
    }
  },
  mounted() {
    register()
    this.updateArticles(this.$i18n.locale)
  }
}
</script>

<style lang="scss" scoped>
.blog {
  margin-bottom: 120px;
  @media (min-width: $lg) {
    margin-bottom: 210px;
  }
  @media (min-width: $xl) {
    margin-bottom: 280px;
  }
  &__container {
    position: relative;
    // margin-top: 25px;
    // @media (min-width: $md) {
    //   margin-top: 75px;
    // }
  }
  &__wrapp {
    min-width: 240px !important;
    @media (min-width: $sm) {
      min-width: 300px !important;
    }
    @media (min-width: $lg) {
      min-width: 500px !important;
    }
  }
  &__title {
    position: absolute;
    top: -52px;
    left: 0;
    margin-left: 15px;
    transform: translateY(-50%);
    font-size: font-rem(28);
    font-weight: 400;
    text-transform: uppercase;
    color: $secondary-black;
    @media (min-width: $sm) {
      top: -60px;
      font-size: font-rem(34);
    }
    @media (min-width: $md) {
      font-size: font-rem(40);
      top: -98px;
    }
  }
  &__img {
    height: 220px;
    width: 100%;
    @media (min-width: $md) {
      height: 300px;
    }
    @media (min-width: $lg) {
      max-height: 440px;
    }
    @media (min-width: $lg) {
      height: 440px;
      max-width: 840px;
    }

    & img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 24px;
    }
  }
  &__heading {
    height: 72px;
    color: $secondary-black;
    font-weight: 500;
    font-size: font-rem(18);
    display: block;
    margin: 0px 0 0 0;
    order: 2;
    margin-top: 8px;

    @media (min-width: $md) {
      margin-top: 8px;
      height: 60px;
    }
    @media (min-width: $lg) {
      margin-top: 0;
      height: 40px;
      order: 1;
      flex-basis: 100%;
    }
  }
  &__content {
    display: flex;
    justify-content: space-between;

    margin-top: 24px;
  }
  &__info {
    font-family: 'Lato';
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media (min-width: $lg) {
      flex-direction: row;
      flex-wrap: wrap;
    }
    @media (min-width: $xxl) {
      width: 100%;
    }
  }
  &__data {
    color: $grey;
    font-size: font-rem(14);
    order: 1;
    @media (min-width: $md) {
      font-size: font-rem(16);
    }
    @media (min-width: $lg) {
      order: 2;
      align-self: flex-end;
    }
  }
  &__link {
    order: 3;
    width: 158px;
    height: 43px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid $secondary-green;
    border-radius: 12px;
    color: $secondary-green;
    font-weight: 500;
    margin-top: 16px;
    transition: $time;

    @media (min-width: $lg) {
      height: 54px;
      align-self: flex-end;
      margin-top: 0;
      height: 43px;
      &:hover {
        color: $white;
        background-color: $secondary-green;
      }
    }
    @media (min-width: $xxl) {
      align-self: flex-end;
    }
  }
  &__navigation {
    width: 232px;
    height: 64px;
    position: absolute;
    top: -84px;
    right: 15px;
    transform: translate(0%, -100%);
  }
}

.swiper-pagination-progressbar-blog {
  position: absolute;
  top: -35px;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: $grey;
  @media (min-width: $lg) {
    top: -72px;
  }
}

.prev,
.next {
  display: none;
  justify-content: center;
  align-items: center;
  border: 1.5px solid $main-black;
  border-radius: 16px;
  width: 50px;
  height: 50px;
  @media (min-width: $lg) {
    display: flex;
    &::after {
      content: '';
      background-size: cover;
      background-position: center;
      height: 18px;
      width: 9px;
    }
  }
  @media (min-width: $xl) {
    width: 54px;
    height: 54px;
  }
}
.prev {
  &::after {
    background-image: url('@/assets/images/newPlants/arrow-left.svg');
  }
}
.next {
  &::after {
    background-image: url('@/assets/images/newPlants/arrow-rigth.svg');
  }
}
</style>
