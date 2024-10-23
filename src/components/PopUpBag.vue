<template>
  <div class="bag" ref="myBag">
    <header class="header">
      <div class="header__container">
        <h2>МІЙ КОШИК</h2>
        <button class="header__close" @click="togglePopUpBag"></button>
      </div>
    </header>
    <TheBagsItem :bags="bags" :togglePopUpBag="togglePopUpBag" />
    <footer class="footer">
      <div class="footer__container">
        <div class="footer__sum">
          <span>Разом до сплати:</span>
          <span>{{ totalSum }} ₴</span>
        </div>
        <div class="footer__actions">
          <RouterLink :to="{ name: 'TheCatalogPage' }" class="footer__next" @click="togglePopUpBag"
            >продовжити покупки</RouterLink
          >
          <RouterLink
            :to="{ name: 'TheBasketPage' }"
            class="footer__continue"
            @click="togglePopUpBag"
            >Оформити замовлення</RouterLink
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
  background-color: $secondary-white;
  position: fixed;
  width: 880px;
  height: 76vh;
  z-index: 40;
  top: 20px;
  right: 0;
  display: flex;
  flex-direction: column;
  transition: $time;
}

.header {
  border-bottom: 1px solid $grey;
  // .header__container
  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;

    & h2 {
      font-size: font-rem(24);
      color: $secondary-black;
      font-weight: 400;
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
  &__container {
    height: 168px;
  }
  // .footer__sum
  &__sum {
    display: flex;
    justify-content: space-between;
    margin: 16px 0 24px 0;
    & span {
      font-size: font-rem(18);
      font-family: 'Lato';
    }
  }
  // .footer__actions
  &__actions {
    height: 90px;
    display: flex;
    align-items: center;
    gap: 24px;
    font-size: font-rem(18);
    font-family: 'ZenAntique';
    text-transform: uppercase;
  }
  // .footer__next
  &__next,
  &__continue {
    flex: 1 1 calc(50% - 24px);
    height: 58px;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__next {
    border: 2px solid $primary-red-orange;
    color: $primary-red-orange;
    transition: $time;
    &:hover {
      background-color: $primary-red-orange;
      color: $white;
    }
    &:active {
      position: relative;
      top: 2px;
      left: 2px;
    }
  }
  // .footers__continue
  &__continue {
    background-color: $primary-red-orange;
    color: $secondary-white;
    transition: $time;
    &:hover {
      box-shadow: 0px 6px 6px 0px $primary-orange;
    }
    &:active {
      position: relative;
      top: 2px;
      left: 2px;
    }
  }
}
</style>
