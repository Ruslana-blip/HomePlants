<template>
  <div class="actions" v-bind="$attrs">
    <div class="actions__wrapper">
      <div class="actions__bag" @click="togglePopUpBag">
        <img src="@/assets/images/catalog/bag-tick.svg" alt="icon bag" title="icon bag" />
      </div>
      <div class="actions__like" @click="toggleLike">
        <img :src="likeImage" alt="icon like" title="icon like" />
      </div>
    </div>
    <div v-if="isPopUpVisible" class="actions__overlay">
      <PopUpBag :isPopUpVisible="isPopUpVisible" :togglePopUpBag="togglePopUpBag" />
    </div>
    <div v-if="liked" class="actions__pinned">
      <div class="actions__like" @click="toggleLike">
        <img :src="likeActiveImage" alt="icon like" title="icon like" />
      </div>
    </div>
  </div>
</template>

<script>
import likeImage from '@/assets/images/catalog/like.svg'
import likeActiveImage from '@/assets/images/catalog/save_selected.svg'
import PopUpBag from './PopUpBag.vue'

import { useLikedPlantsStore } from '@/stores/likedPlants'
import { mapActions, mapState } from 'pinia'

export default {
  name: 'TheLike',
  components: {
    PopUpBag
  },
  props: {
    plantId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isPopUpVisible: false,
      likeImage: likeImage,
      likeActiveImage: likeActiveImage
    }
  },
  computed: {
    ...mapState(useLikedPlantsStore, ['likedPlants']),
    liked() {
      return this.likedPlants.includes(this.plantId)
    }
  },
  methods: {
    ...mapActions(useLikedPlantsStore, ['addLikedPlant', 'removeLikedPlant']),
    toggleLike() {
      if (this.liked) {
        this.removeLikedPlant(this.plantId)
      } else {
        this.addLikedPlant(this.plantId)
      }
    },
    togglePopUpBag() {
      this.isPopUpVisible = !this.isPopUpVisible
    }
  },
  inheritAttrs: false
}
</script>

<style lang="scss" scoped>
.actions {
  position: relative;

  &__wrapper {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 64px;
    height: 116px;
    opacity: 0;
    background-color: $ligth-green;
    transition: $time;
    border-top-left-radius: 16px;
    &:hover {
      opacity: 1;
    }
  }

  &__bag,
  &__like {
    display: block;
    z-index: 3;
    width: 48px;
    height: 48px;
    padding: 12px;
    margin: 8px;
    cursor: pointer;
  }
  &__pinned {
    height: 58px;
    width: 64px;
    background-color: $ligth-green;
    border-top-left-radius: 16px;
    position: absolute;
    bottom: 0;
    right: 0;
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
