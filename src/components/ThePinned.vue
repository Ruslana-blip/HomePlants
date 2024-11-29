<template>
  <div v-if="liked" class="actions__pinned" @click.prevent.stop="toggleLike">
    <img
      src="@/assets/images/catalog/save_selected.svg"
      alt="add to liked plants"
      title="Add to liked plants"
    />
  </div>
</template>

<script>
import { useLikedPlantsStore } from '@/stores/likedPlants'
import { mapActions, mapState } from 'pinia'
export default {
  name: 'ThePinned',
  props: {
    plantId: {
      type: Number,
      required: true
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
    }
  }
}
</script>

<style lang="scss" scoped>
.actions__pinned {
  cursor: pointer;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 38px;
  height: 38px;
  padding: 7px;
  border-bottom-left-radius: 8px;
  background-color: $secondary-green;
  @media (min-width: $md) {
    border-bottom-left-radius: 0px;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateX(-100%);
    left: 100%;
    height: 64px;
    width: 64px;
    background-color: $ligth-green;
    border-top-left-radius: 16px;
  }
}
</style>
