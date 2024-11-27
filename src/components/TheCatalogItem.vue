<template>
  <ul class="plant">
    <li class="plant__item" v-for="plant in showPlants" :key="plant.id">
      <div class="plant__img">
        <img
          :src="Array.isArray(plant.img) ? plant.img[0] : plant.img"
          :title="$i18n.locale === 'uk' ? plant.name : plant.name_en"
          :alt="$i18n.locale === 'uk' ? plant.name : plant.name_en"
        />

        <TheLike
          :plantId="plant.id"
          :plantImg="plant?.img[0]"
          :plantName="plant?.name"
          :plantPrice="plant?.price"
          :plantNameEn="plant?.name_en"
          class="plant__actions"
        />
        <ThePinned :plantId="plant.id" />
      </div>

      <div class="plant__content">
        <RouterLink
          :to="{ name: 'TheSinglePlantPage', params: { id: plant.id } }"
          class="plant__name"
        >
          {{ $i18n.locale === 'uk' ? plant.name : plant.name_en }}
        </RouterLink>
        <div class="plant__main">
          <div v-if="plant.status === 'Розпродаж'">
            <span class="plant__originalPrice">{{ plant.price }} ₴ </span>
            <span class="plant__salesPrice"> {{ plant.price * 0.7 }} ₴ </span>
          </div>
          <div v-else>
            <span>{{ plant.price }} ₴</span>
          </div>
          <span :class="getStatusClass(plant?.status)">{{
            $i18n.locale === 'uk' ? plant.status : plant.status_en
          }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useCategoriesStore } from '@/stores/categories'
import TheLike from './TheLike.vue'
import ThePinned from './ThePinned.vue'
export default {
  name: 'TheCatalogItem',
  components: {
    TheLike,
    ThePinned
  },
  props: {
    showPlants: {
      type: Object
    }
  },
  computed: {
    ...mapState(useCategoriesStore, ['catalog'])
  },
  watch: {
    '$i18n.locale': function (newLocale) {
      return newLocale
    }
  },
  methods: {
    ...mapActions(useCategoriesStore, ['getAllPlants']),
    getStatusClass(status) {
      if (status === 'Новинки') {
        return 'plant__newPlants'
      } else if (status === 'Розпродаж') {
        return 'plant__sales'
      } else if (status === 'Топ продажів') {
        return 'plant__top'
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// .plant
.plant {
  &__name {
    font-size: font-rem(14);
    transition: $time;
    &:hover {
      color: $dark-purple-gray;
    }
    @media (min-width: $md) {
      font-size: font-rem(18);
    }
  }
  // .plant__item
  &__item {
    flex: 1 1 146px;
    @media (min-width: $sm) {
      // flex: 1 1 260;
      flex: 1 1 calc(50% - 24px);
    }
    @media (min-width: $lg) {
      // flex: 1 1 250px;
      flex: 1 1 calc(50% - 40px);
    }
    @media (min-width: $xxl) {
      flex: 1 0 calc(33.33% - 72px);
    }
  }
  // .plant__img
  &__img {
    position: relative;
    height: 240px;
    @media (min-width: $sm) {
      width: 100%;
      height: 380px;
    }
    @media (min-width: $md) {
      width: 100%;
      height: 480px;
    }
    @media (min-width: $xxl) {
      max-width: 384px;
    }

    &:hover {
      .plant__actions {
        opacity: 1;
      }
    }
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 16px;
    }
  }

  &__actions {
    @media (min-width: $md) {
      transition: $time;
      opacity: 0;
    }
  }

  &__content {
    margin-top: 12px;
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media (min-width: $md) {
      height: 64px;
      margin-top: 16px;
    }
  }
  // .plant__main
  &__main {
    display: flex;
    justify-content: space-between;
  }
  &__newPlants,
  &__sales,
  &__top {
    width: 70px;
    font-family: 'Lato';
    height: 18px;
    font-size: font-rem(8);
    border-radius: 4px;
    text-transform: uppercase;
    color: $white;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (min-width: $sm) {
      width: 90px;
      height: 20px;
    }
    @media (min-width: $md) {
      font-size: font-rem(14);
      width: 128px;
      height: 26px;
    }
  }
  &__newPlants {
    background-color: $green;
  }
  &__sales {
    background-color: $secondary-red;
  }
  &__top {
    background-color: $secondary-black;
  }

  // .plant__originalPrice
  &__originalPrice {
    font-size: font-rem(14);
    color: $secondary-black;
    text-decoration: line-through;
    @media (min-width: $md) {
      margin-right: 16px;
    }
  }
  // .plant__salesPrice
  &__salesPrice {
    font-size: font-rem(14);
    color: $secondary-red;
    font-family: 'Roboto';
    font-weight: 700;
    @media (min-width: $md) {
    }
  }
}
</style>
