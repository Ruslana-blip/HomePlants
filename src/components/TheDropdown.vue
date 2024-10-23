<template>
  <div class="main">
    <header class="header">
      <div class="header__container">
        <span>Категорії</span>
        <button class="header__close" @click="toggleDropdown"></button>
      </div>
    </header>
    <nav class="nav">
      <ul>
        <li v-for="category in categories" :key="category" class="nav__item">
          <RouterLink
            :to="{ name: 'TheCatalogPage', params: { category: category } }"
            @click="toggleDropdown"
            >{{ category }}</RouterLink
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { useCategoriesStore } from '@/stores/categories'
import { mapActions, mapState } from 'pinia'

export default {
  name: 'TheDropdown',
  props: {
    toggleDropdown: {
      type: Function
    },
    isDropdownOpen: {
      type: Boolean
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(useCategoriesStore, ['categories']),
    isDataExists() {
      return Boolean(localStorage.getItem('categories'))
    }
  },
  methods: {
    ...mapActions(useCategoriesStore, ['getCategories'])
  },
  async created() {
    if (!this.isDataExists) {
      await this.getCategories()
    }
  },
  async mounted() {
    await this.getCategories()
  }
}
</script>

<style lang="scss" scoped>
.main {
  position: fixed;
  top: 16px;
  left: 0;
  width: 700px;
  height: 1080px;
  background-color: $white;
  font-size: font-rem(24);
}
.header {
  text-transform: uppercase;

  // .header__container
  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
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
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1018px;
  color: $grey;
  text-transform: uppercase;
  // .nav__item
  &__item {
    height: 80px;
    display: flex;
    align-items: center;
    padding-left: 40px;
    cursor: pointer;
    transition: $time;
    &:hover {
      border-bottom: 2px solid $secondary-black;
      color: $secondary-black;
    }
  }
}
</style>
