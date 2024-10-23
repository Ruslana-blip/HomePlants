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
  margin: 0 0 136px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 79px;
  // .pagination__list
  &__list {
    display: flex;
    justify-content: space-around;
    gap: 16px;
    font-size: font-rem(24);
    color: $grey;
    margin: 16px;
  }
  // .pagination__item
  &__item {
    cursor: pointer;
    font-weight: 700;
    padding: 10px;
    height: 48px;
    width: 48px;
    text-align: center;
  }
  &__item.active {
    position: relative;
    color: $secondary-black;
    transition: $time;

    &::before {
      position: absolute;
      top: 12px;
      right: 65%;
      content: '/0';
      z-index: 3;
    }
  }
}
</style>
