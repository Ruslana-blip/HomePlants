<template>
  <ul class="plant">
    <li class="plant__item" v-for="plant in showPlants" :key="plant.id">
      <div class="plant__img">
        <img
          :src="Array.isArray(plant.img) ? plant.img[0] : plant.img"
          :title="$i18n.locale === 'uk' ? plant.name : plant.name_en"
          :alt="$i18n.locale === 'uk' ? plant.name : plant.name_en"
        />
        <div class="actions"><TheLike :plantId="plant.id" /></div>
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
export default {
  name: 'TheCatalogItem',
  components: {
    TheLike
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
    transition: $time;
    &:hover {
      color: $dark-purple-gray;
    }
  }
  // .plant__item
  &__item {
    flex: 0 1 384px;
  }
  // .plant__img
  &__img {
    max-width: 384px;
    height: 480px;
    position: relative;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 16px;
    }
  }

  &__content {
    margin-top: 16px;
    height: 64px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  // .plant__main
  &__main {
    display: flex;
    justify-content: space-between;
  }
  &__newPlants,
  &__sales,
  &__top {
    width: 128px;
    height: 26px;
    text-transform: uppercase;
    color: $white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Lato';
    font-size: font-rem(14);
    border-radius: 4px;
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
    color: $secondary-black;
    text-decoration: line-through;
    margin-right: 16px;
  }
  // .plant__salesPrice
  &__salesPrice {
    color: $secondary-red;
    font-family: 'Roboto';
    font-weight: 700;
  }
}
</style>
