<template>
  <main class="plant">
    <div class="plant__cont">
      <ul v-if="bags.length">
        <li v-for="plant in bags" :key="plant.id" class="plant__item">
          <div class="plant__image">
            <img :src="plant?.img" :title="plant?.name" :alt="plant?.name" />
          </div>
          <div class="plant__content">
            <div class="plant__info">
              <span class="plant__name">{{
                $i18n.locale === 'uk' ? plant.name : plant.nameEN
              }}</span>
              <span class="plant__price">{{ plant.count * plant?.price }} ₴</span>
            </div>
            <TheProductCounter :count="plant.count" :plantId="plant.id" />
          </div>
          <button class="plant__remove" @click="removePlantWithBag(plant?.id)"></button>
        </li>
      </ul>
      <div class="empty" v-else>
        <h2 class="empty__title">{{ $t('bag-no-products-title') }}</h2>
        <p class="empty__desc">{{ $t('bag-check-products') }}</p>
        <RouterLink :to="{ name: 'TheCatalogPage' }" @click="togglePopUpBag">
          <TheButtonOrange :width="378" :title="$t('return-catalog')" />
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<script>
import TheButtonOrange from './TheButtonOrange.vue'
import TheProductCounter from './TheProductCounter.vue'
import { mapActions } from 'pinia'
import { useBagsStore } from '@/stores/bags'
export default {
  name: 'TheBagsItem',
  components: {
    TheProductCounter,
    TheButtonOrange
  },
  props: {
    bags: {
      type: Array
    },
    togglePopUpBag: {
      type: Function
    }
  },
  methods: {
    ...mapActions(useBagsStore, ['removePlantWithBag'])
  }
}
</script>

<style lang="scss" scoped>
.plant {
  flex: 1 1 auto;

  // .plant__container
  &__cont {
    margin-top: 16px;
    font-family: 'Lato';
    overflow: scroll;
    max-height: calc(100vh - 228px);
    padding: 0 16px;
  }
  // .plant__item
  &__item {
    display: flex;
    padding: 16px 0 16px 16px;
    border-bottom: 1px solid $grey;
  }
  // .plant__image
  &__image {
    width: 120px;
    height: 120px;
    margin-right: 12px;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }
  }
  // .plant__content
  &__content {
    flex: 1 1 auto;
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  // .plant__info
  &__info {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  // .plant__name
  &__name {
    font-size: font-rem(20);
  }
  // .plant__price
  &__price {
    font-size: font-rem(18);
  }

  // .plant__remove
  &__remove {
    flex: 0 0 46px;
    width: 18px;
    height: 18px;
    position: relative;
    border: none;
    // transform: translateX(-100%);
    &::before {
      position: absolute;
      content: '';
      top: 104px;
      right: 16px;
      background-image: url('@/assets/images/popup/remove.svg');
      width: 18px;
      height: 18px;
    }
  }
}
.empty {
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Lato';
  // .empty__title
  &__title {
    font-size: font-rem(24);
    font-weight: 700;
  }
  // .empty__desc
  &__desc {
    font-size: font-rem(18);
    margin: 16px 0 48px 0;
    width: 536px;
    text-align: center;
  }
}
</style>
