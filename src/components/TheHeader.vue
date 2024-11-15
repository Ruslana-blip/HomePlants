<template>
  <header class="header">
    <div class="header__container">
      <div class="header__categories" @click="toggleDropdown">
        <div class="header__menu">
          <img src="@/assets/images/header/menu.svg" alt="Icon of menu" title="Menu" />
        </div>
        <span>{{ category }}</span>
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
        <div class="header__overlay" v-if="isCabinetOpen && !this.user.length">
          <TheProfile :isCabinetOpen="isCabinetOpen" :toggleCabinet="toggleCabinet" />
        </div>
        <div v-else-if="this.user.length">
          <RouterLink :to="{ name: 'TheAccountPage' }">
            <img src="@/assets/images/header/user_exit.svg" alt="icon" title="icon" />
          </RouterLink>
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
      isCabinetOpen: false,
      category: 'Категорії'
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
  padding-top: 10px;
  @media (min-width: $md) {
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
    width: 32px;
    height: 32px;
    border: 2px solid $main-black;
    border-radius: 8px;
    cursor: pointer;
    position: relative;
    transition: $time;
    @media (min-width: $sm) {
      width: 143px;
      height: 40px;
    }
    @media (min-width: $md) {
      width: 193px;
      height: 56px;
    }
    @media (min-width: $xl) {
      width: 206px;
    }
    & span {
      display: none;
      @media (min-width: $sm) {
        font-family: 'Lato';
        font-weight: 500;
        font-size: font-rem(18);
        display: flex;
      }
      @media (min-width: $md) {
        font-size: font-rem(24);
      }
    }
  }
  // .header__menu
  &__menu {
  }
  // .header__logo
  &__logo {
    flex: 1 1 66px;
    margin-left: 16px;
    font-family: 'Amatic';
    font-size: font-rem(20);
    font-weight: 700;
    padding: 3px 4px;
    color: $green;
    @media (min-width: $sm) {
      font-size: font-rem(30);
      text-align: center;
    }
    @media (min-width: $lg) {
      font-size: font-rem(40);
    }
  }
  // .header__icons
  &__icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80px;
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
