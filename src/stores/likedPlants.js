import { defineStore } from 'pinia'

export const useLikedPlantsStore = defineStore('likedPlantsStore', {
  state: () => ({
    likedPlants: JSON.parse(localStorage.getItem('likedPlants')) || []
  }),
  actions: {
    addLikedPlant(plantId) {
      if (!this.likedPlants.includes(plantId)) {
        this.likedPlants.push(plantId)
        this.updateLocalStorage()
      }
    },
    removeLikedPlant(plantId) {
      this.likedPlants = this.likedPlants.filter((id) => id !== plantId)
      this.updateLocalStorage()
    },
    updateLocalStorage() {
      localStorage.setItem('likedPlants', JSON.stringify(this.likedPlants))
    }
  }
})
