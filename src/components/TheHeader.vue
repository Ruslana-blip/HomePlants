<template>
  <header class="header">
    <div class="header__container">
      <div class="header__categories" @click="toggleDropdown">
        <div class="header__menu">
          <img src="@/assets/images/header/menu.svg" alt="Icon of menu" title="Menu" />
        </div>
        <span>Категорії</span>
      </div>
      <div class="header__overlay" v-if="isDropdownOpen">
        <TheDropdown :isDropdownOpen="isDropdownOpen" :toggleDropdown="toggleDropdown" />
      </div>
      <div class="header__logo">
        <RouterLink :to="{ name: 'HomePage' }">КВІТКАРКА </RouterLink>
      </div>
      <div class="header__icons">
        <div class="header__icon" @click="togglePopUpBag">
          <img src="@/assets/images/header/bag.svg" alt="Bag" title="Bag" />
        </div>
        <div v-if="isPopUpVisible" class="header__overlay">
          <PopUpBag :isPopUpVisible="isPopUpVisible" :togglePopUpBag="togglePopUpBag" />
        </div>

        <div class="header__icon" @click="toggleCabinet">
          <img src="@/assets/images/header/user.svg" alt="User profile" title="User profile" />
        </div>

        <div class="header__overlay" v-if="isCabinetOpen">
          <TheProfile :isCabinetOpen="isCabinetOpen" :toggleCabinet="toggleCabinet" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import TheDropdown from './TheDropdown.vue'
import PopUpBag from './PopUpBag.vue'
import TheProfile from '@/pages/auth/TheProfile.vue'

import { mapState } from 'pinia'
import { useUsersStore } from '@/stores/users'

export default {
  name: 'TheHeader',
  components: {
    TheDropdown,
    PopUpBag,
    TheProfile
  },
  data() {
    return {
      isDropdownOpen: false,
      isPopUpVisible: false,
      isCabinetOpen: false
    }
  },
  computed: {
    ...mapState(useUsersStore, ['user'])
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    togglePopUpBag() {
      this.isPopUpVisible = !this.isPopUpVisible
    },
    toggleCabinet() {
      this.isCabinetOpen = !this.isCabinetOpen
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 20px;
  margin-top: 10px;
  @media (min-width: $sm) {
    margin-bottom: 64px;
  }
  // .header__container
  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    @media (min-width: $md) {
      height: 66px;
    }
  }
  // .header__categories
  &__categories {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border: 2px solid $main-black;
    border-radius: 16px;
    cursor: pointer;
    position: relative;
    transition: $time;
    @media (min-width: $sm) {
      width: 143px;
    }
    @media (min-width: $md) {
      width: 193px;
      height: 56px;
    }
    & span {
      display: none;
      @media (min-width: $sm) {
        font-family: 'Lato';
        font-weight: 500;
        font-size: font-rem(24);
        display: flex;
      }
    }
  }
  // .header__menu
  &__menu {
    margin-right: 4px;
  }
  // .header__logo
  &__logo {
    flex: 1 1 auto;
    text-align: center;
    padding: 8px;
    font-family: 'Amatic';
    font-size: font-rem(40);
    color: $green;
  }
  // .header__icons
  &__icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 130px;
    @media (min-width: $md) {
      width: 150px;
      height: 50px;
    }
  }
  // .header__icon
  &__icon {
    cursor: pointer;
  }

  &__overlay {
    position: fixed;
    z-index: 50;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100vw;
    height: 100vh;
  }
}
</style>
