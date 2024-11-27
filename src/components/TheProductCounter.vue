<template>
  <div class="actions">
    <button
      class="actions__decrement"
      @click="decrementCount"
      :disabled="countProducts === 1"
    ></button>
    <span class="actions__count">{{ currentCount }}</span>
    <button
      class="actions__increment"
      @click="incrementCount"
      :disabled="countProducts === 10"
    ></button>
  </div>
</template>

<script>
import { useBagsStore } from '@/stores/bags'
import { mapActions } from 'pinia'

export default {
  name: 'TheProductCounter',
  data() {
    return {
      countProducts: this.count
    }
  },
  props: {
    count: {
      type: Number,
      required: true
    },
    plantId: {
      type: Number
    }
  },
  computed: {
    currentCount() {
      return this.countProducts
    }
  },
  methods: {
    ...mapActions(useBagsStore, ['updatePlantCount', 'updateLocalStorage']),
    decrementCount() {
      if (this.countProducts > 1) {
        this.countProducts--
        this.updatePlantCount(this.plantId, this.countProducts)
      }
    },
    incrementCount() {
      if (this.countProducts < 10) {
        this.countProducts++
        this.updatePlantCount(this.plantId, this.countProducts)
      }
    }
  },
  watch: {
    count(newVal) {
      this.countProducts = newVal
    }
  }
}
</script>

<style lang="scss" scoped>
.actions {
  display: flex;
  width: 100px;
  height: 38px;
  justify-content: space-between;
  padding: 4px;
  border: 1px solid $grey;
  border-radius: 8px;
  @media (min-width: $lg) {
    width: 160px;
    height: 48px;
    padding: 8px;
  }
  &__decrement,
  &__increment {
    border: none;
    position: relative;
    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
    &::before {
      position: absolute;
      top: 0;
      content: '';
      width: 32px;
      height: 32px;
    }
  }
  // .actions__decrement
  &__decrement {
    &::before {
      background-image: url('@/assets/images/counter/minus.svg');
      left: 0;
      width: 28px;
      height: 32px;
      margin-top: 4px;
    }
  }
  // .actions__count
  &__count {
    font-size: font-rem(20);
  }
  // .actions__increment
  &__increment {
    &::before {
      background-image: url('@/assets/images/counter/add.svg');
      right: 0;
    }
  }
}
</style>
