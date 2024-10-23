import { defineStore } from 'pinia'

export const useBagsStore = defineStore('bagsStore', {
  state: () => ({
    bags: JSON.parse(localStorage.getItem('bags')) || []
  }),
  actions: {
    addPlantInBag(plantId, productCount = 1, plantImg, plantName, plantPrice) {
      const existingItem = this.bags.find((item) => item.id === plantId)
      if (existingItem) {
        existingItem.count += productCount
      } else {
        this.bags.push({
          id: plantId,
          count: productCount,
          img: plantImg,
          name: plantName,
          price: plantPrice
        })
      }
      this.updateLocalStorage()
    },
    removePlantWithBag(plantId) {
      this.bags = this.bags.filter((item) => item.id !== plantId)
      this.updateLocalStorage()
    },
    updatePlantCount(plantId, newCount) {
      const existingItem = this.bags.find((item) => item.id === plantId)
      if (existingItem) {
        if (newCount > 0) {
          existingItem.count = newCount
        } else {
          this.removePlantWithBag(plantId)
        }
        this.updateLocalStorage()
      }
    },
    updateLocalStorage() {
      localStorage.setItem('bags', JSON.stringify(this.bags))
    },
    clearBags() {
      this.bags = []
      this.updateLocalStorage()
    }
  }
})
