<template>
  <div class="bag" ref="myBag">
    <header class="header">
      <div class="header__cont">
        <h2>{{ $t('bag') }}</h2>
        <button class="header__close" @click="togglePopUpBag"></button>
      </div>
    </header>
    <TheBagsItem :bags="bags" :togglePopUpBag="togglePopUpBag" />
    <footer class="footer" v-if="bags.length">
      <div class="footer__cont">
        <div class="footer__sum">
          <span>{{ $t('total-pay') }} :</span>
          <span>{{ totalSum }} ₴</span>
        </div>
        <div class="footer__actions">
          <RouterLink
            :to="{ name: 'TheCatalogPage' }"
            class="footer__next"
            @click="togglePopUpBag"
            >{{ $t('continue-shop') }}</RouterLink
          >
          <RouterLink
            :to="{ name: 'TheBasketPage' }"
            class="footer__continue"
            @click="togglePopUpBag"
            >{{ $t('place-order') }}</RouterLink
          >
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useBagsStore } from '@/stores/bags'
import TheBagsItem from './TheBagsItem.vue'
export default {
  name: 'PupUpBag',
  components: {
    TheBagsItem
  },
  props: {
    isPopUpVisible: {
      type: Boolean
    },
    togglePopUpBag: {
      type: Function
    }
  },
  data() {
    return {
      plantIds: []
    }
  },
  computed: {
    ...mapState(useBagsStore, ['bags']),
    isDataExists() {
      return Boolean(localStorage.getItem('bags'))
    },
    totalSum() {
      return this.bags.reduce((total, plant) => total + plant.price * plant.count, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.bag {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  right: 0;
  z-index: 40;
  background-color: $secondary-white;
  @media (min-width: $lg) {
    width: 640px;
  }
  @media (min-width: $xl) {
    width: 760px;
  }
  @media (min-width: $xxl) {
    width: 880px;
    transition: $time;
  }
}

.header {
  border-bottom: 1px solid $grey;
  // .header__container
  &__cont {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 0 16px;

    & h2 {
      font-size: font-rem(18);
      color: $secondary-black;
      font-weight: 400;
      @media (min-width: $lg) {
        font-size: font-rem(24);
      }
    }
  }
  // .header__close
  &__close {
    position: relative;
    width: 24px;
    height: 24px;
    border: none;
    &::before {
      position: absolute;
      content: '';
      top: 0;
      right: 0;
      background-image: url('@/assets/images/popup/close.svg');
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
}

.footer {
  border-top: 1px solid $grey;
  // .footer__container
  &__cont {
    height: 168px;
    padding: 0 16px;
  }
  // .footer__sum
  &__sum {
    display: flex;
    justify-content: space-between;
    margin: 16px 0 24px 0;
    & span {
      font-size: font-rem(16);
      font-family: 'Lato';

      @media (min-width: $lg) {
        font-size: font-rem(18);
      }
    }
  }
  // .footer__actions
  &__actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    font-size: font-rem(16);
    font-family: 'ZenAntique';
    text-transform: uppercase;
    @media (min-width: $sm) {
      height: 90px;
      flex-direction: row;
    }
    @media (min-width: $lg) {
      font-size: font-rem(18);
      gap: 24px;
    }
  }
  // .footer__next
  &__next,
  &__continue {
    width: 100%;
    height: 48px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (min-width: $sm) {
      flex: 1 1 calc(50% - 24px);
    }
    @media (min-width: $lg) {
      border-radius: 16px;

      height: 58px;
      transition: $time;
      &:active {
        position: relative;
        top: 2px;
        left: 2px;
      }
    }
  }
  &__next {
    border: 2px solid $primary-red-orange;
    color: $primary-red-orange;
    @media (min-width: $lg) {
      &:hover {
        background-color: $primary-red-orange;
        color: $white;
      }
    }
  }
  // .footers__continue
  &__continue {
    background-color: $primary-red-orange;
    color: $secondary-white;
    @media (min-width: $lg) {
      &:hover {
        box-shadow: 0px 6px 6px 0px $primary-orange;
      }
    }
  }
}
</style>
