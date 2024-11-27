<template>
  <div class="pagination" v-if="getCountPages > 1">
    <ul class="pagination__list">
      <li
        v-for="page in getCountPages"
        :key="page"
        @click="showPage(page)"
        :class="['pagination__item', { active: currentPage === page }]"
      >
        {{ page }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TheNavigation',
  emits: ['show-page'],
  props: {
    totalPlants: {
      type: Array
    },
    cardsPerPage: {
      type: Number,
      default: 9
    }
  },
  data() {
    return {
      currentPage: 1,
      filterArrayPlants: []
    }
  },

  computed: {
    getCountPages() {
      return Math.ceil(this.totalPlants.length / this.cardsPerPage)
    }
  },
  methods: {
    showPage(page = 1) {
      if (this.totalPlants.length > 0) {
        const start = (page - 1) * this.cardsPerPage
        this.filterArrayPlants = this.totalPlants.slice(start, start + this.cardsPerPage)
        this.currentPage = page
        this.$emit('show-page', this.currentPage)
      }
    }
  },
  mounted() {
    this.showPage(this.currentPage)
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 36px;
  align-self: center;
  @media (min-width: $xl) {
    height: 79px;
    margin: 0 0 136px 0;
  }

  // .pagination__list
  &__list {
    width: 173px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 12px;
    font-size: font-rem(14);
    color: $grey;
    @media (min-width: $md) {
      font-size: font-rem(18);
      gap: 16px;
    }
    @media (min-width: $lg) {
      font-size: font-rem(20);
    }
    @media (min-width: $xl) {
      font-size: font-rem(24);
      margin: 16px auto;
    }
  }
  // .pagination__item
  &__item {
    cursor: pointer;
    font-weight: 700;
    padding: 0;
    width: 27px;
    height: 18px;
    text-align: center;
    @media (min-width: $lg) {
      padding: 10px;
      height: 48px;
      width: 48px;
    }
  }
  &__item.active {
    position: relative;
    color: $secondary-black;
    transition: $time;

    &::before {
      position: absolute;
      top: 0;
      right: 65%;
      content: '/0';
      z-index: 3;
      @media (min-width: $lg) {
        top: 12px;
      }
    }
  }
}
</style>
