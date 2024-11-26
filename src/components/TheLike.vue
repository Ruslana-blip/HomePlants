<template>
  <div class="actions">
    <div class="actions__wrapper">
      <div class="actions__bag" @click="addPlantToBag"></div>
      <div class="actions__like" @click="toggleLike"></div>
    </div>
    <teleport to="body">
      <div v-if="isPopUpVisible" class="actions__overlay">
        <PopUpBag :isPopUpVisible="isPopUpVisible" :togglePopUpBag="togglePopUpBag" />
      </div>
    </teleport>
  </div>
</template>

<script>
import PopUpBag from './PopUpBag.vue'

import { useLikedPlantsStore } from '@/stores/likedPlants'
import { mapActions } from 'pinia'
import { useBagsStore } from '@/stores/bags'

export default {
  name: 'TheLike',
  components: {
    PopUpBag
  },
  props: {
    plantId: {
      type: Number,
      required: true
    },
    plantImg: {
      type: String,
      required: true
    },
    plantName: {
      type: String,
      required: true
    },
    plantPrice: {
      type: Number,
      required: true
    },
    plantNameEn: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isPopUpVisible: false,
      currentCount: 1
    }
  },
  methods: {
    ...mapActions(useLikedPlantsStore, ['addLikedPlant', 'removeLikedPlant']),
    ...mapActions(useBagsStore, ['addPlantInBag']),
    toggleLike() {
      if (this.liked) {
        this.removeLikedPlant(this.plantId)
      } else {
        this.addLikedPlant(this.plantId)
      }
    },
    togglePopUpBag() {
      this.isPopUpVisible = !this.isPopUpVisible
    },
    addPlantToBag() {
      this.addPlantInBag(
        this.plantId,
        this.currentCount,
        this.plantImg,
        this.plantName,
        this.plantPrice,
        this.plantNameEn
      )
      this.togglePopUpBag()
    }
  }
}
</script>

<style lang="scss" scoped>
.actions {
  &__wrapper {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    width: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: $secondary-green;
    @media (min-width: $md) {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      width: 64px;
      height: 116px;
      background-color: $ligth-green;
      transition: $time;
      border-top-left-radius: 16px;
    }
  }

  &__bag,
  &__like {
    cursor: pointer;
    width: 24px;
    height: 24px;
    padding: 6px;
    margin: 8px;
    @media (min-width: $md) {
    }
  }
  &__bag {
    background-image: url('@/assets/images/liked/bag.svg');
    @media (min-width: $md) {
      background-image: url('@/assets/images/catalog/bag-tick.svg');
      background-repeat: no-repeat;
    }
  }
  &__like {
    background-image: url('@/assets/images/liked/like-white.svg');
    @media (min-width: $md) {
      background-image: url('@/assets/images/catalog/like.svg');
      background-repeat: no-repeat;
    }
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
