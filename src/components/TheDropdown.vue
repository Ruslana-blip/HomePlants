<template>
  <div class="main">
    <header class="header">
      <span>Категорії</span>
      <button class="header__close" @click="toggleDropdown"></button>
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
  top: 0;
  left: 0;
  width: 100vw;
  height: auto;
  background-color: $white;
  font-size: font-rem(20);
  @media (min-width: $sm) {
    width: 70%;
  }
  @media (min-width: $lg) {
    font-size: font-rem(24);
    width: 50%;
  }
  @media (min-width: $xxl) {
    width: 700px;
    height: 100vh;
    top: 16px;
    left: 15px;
  }
}
.header {
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 16px;
  border: 1px solid $grey;
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
  margin: 40px 16px 90px 16px;
  color: $grey;
  text-transform: uppercase;
  @media (min-width: $lg) {
    height: 1018px;

    & ul {
      margin-bottom: 210px;
      margin-right: 40px;
    }
  }

  // .nav__item
  &__item {
    height: 56px;
    display: flex;
    align-items: center;
    border-top: 1px solid $dark-purple-gray;
    cursor: pointer;
    transition: $time;
    &:last-child {
      border-bottom: 1px solid $dark-purple-gray;
    }
    @media (min-width: $lg) {
      height: 80px;
      padding-left: 40px;
      &:hover {
        border-bottom: 2px solid $secondary-black;
        color: $secondary-black;
      }
    }
  }
}
</style>
