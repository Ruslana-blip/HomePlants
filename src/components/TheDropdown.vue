<template>
  <div class="main">
    <header class="header">
      <span>{{ $t('categories') }}</span>
      <button class="header__close" @click="toggleDropdown"></button>
    </header>
    <nav class="nav">
      <ul>
        <li v-for="category in localizedCategories" :key="category" class="nav__item">
          <RouterLink
            :to="{ name: 'TheCatalogPage', params: { category: category } }"
            @click="toggleDropdown"
            class="nav__link"
            >{{ category }}</RouterLink
          >
        </li>
      </ul>
    </nav>
    <div class="main__langs">
      <div class="main__lang" :class="{ active: currentLang === 'uk' }" @click="changeLang('uk')">
        UK
      </div>
      <div class="main__lang" :class="{ active: currentLang === 'en' }" @click="changeLang('en')">
        EN
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useCategoriesStore } from '@/stores/categories'
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
    return {
      categories: [],
      currentLang: this.$i18n.locale
    }
  },
  computed: {
    localizedCategories() {
      return [
        this.$t('flow-plants'),
        this.$t('foliage'),
        this.$t('orchids'),
        this.$t('succulents'),
        this.$t('citrus'),
        this.$t('exotic'),
        this.$t('florariums'),
        this.$t('bonsai')
      ]
    }
  },
  methods: {
    ...mapActions(useCategoriesStore, ['getCategories']),
    changeLang(lang) {
      this.$i18n.locale = lang
      this.currentLang = lang
    }
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
  &__langs {
    display: flex;
    gap: 24px;
    margin-left: 16px;
    margin-bottom: 24px;
    font-family: 'ZenAntique';
    @media (min-width: $md) {
      display: none;
    }
  }
  &__lang {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid $grey;
    height: 50px;
    width: 51px;
    border-radius: 4px;
  }
}
.main__lang.active {
  transition: $time;
  background-color: $secondary-green;
  color: $white;
  border: none;
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
  align-items: center;
  margin: 40px 0 24px 0;
  padding: 0 16px;
  color: $grey;
  text-transform: uppercase;
  & ul {
    width: 100%;
  }
  @media (min-width: $md) {
    margin-bottom: 90px;
    justify-content: center;
  }
  @media (min-width: $lg) {
    height: 1018px;

    & ul {
      margin-bottom: 210px;
      margin-right: 40px;
    }
  }
  &__item {
    // min-width: 288px;

    &:last-child {
      border-bottom: 1px solid $dark-purple-gray;
    }

    // @media (min-width: $md) {
    //   width: 350px;
    // }
    @media (min-width: $lg) {
      &:last-child {
        border-bottom: none;
      }
    }
  }
  // .nav__item
  &__link {
    height: 56px;
    display: flex;
    align-items: center;
    border-top: 1px solid $dark-purple-gray;
    cursor: pointer;
    transition: $time;

    @media (min-width: $lg) {
      height: 80px;
      padding-left: 40px;
      border: none;
      transition: $time;
      &:last-child {
        border: none;
      }
      &:hover {
        border-top: 2px solid $secondary-black;
        border-bottom: 2px solid $secondary-black;
        color: $secondary-black;
      }
    }
  }
}
</style>
