import { defineStore } from 'pinia'
import axios from '@/axios'

export const useCategoriesStore = defineStore('categoriesStore', {
  state: () => ({
    categories: JSON.parse(localStorage.getItem('categories')) || [],
    foliage: [],
    decorativeFlorentem: [],
    orchidaceae: [],
    succulenta: [],
    citrus: [],
    exotic: [],
    florariums: [],
    bonsai: [],
    catalog: [],
    selectedPlant: null,
    selectedCategory: null,
    newsPlants: JSON.parse(localStorage.getItem('newsPlants')) || [],
    salesPlants: [],
    topPlants: [],
    priceFilterArray: []
  }),
  actions: {
    async getCategories() {
      try {
        this.loading = true
        const { data } = await axios.get('plants')
        this.categories = Object.keys(data)
        localStorage.setItem('categories', JSON.stringify(this.categories))
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async getAllPlants() {
      this.loading = true
      try {
        const { data } = await axios.get('plants')
        this.foliage = Object.values(data['Декоративно-листяні'])
        this.decorativeFlorentem = Object.values(data['Декоративно-квітучі'])
        this.orchidaceae = Object.values(data['Орхідеї'])
        this.succulenta = Object.values(data['Сукуленти'])
        this.citrus = Object.values(data['Цитрусові рослини'])
        this.exotic = Object.values(data['Екзотичні кімнатні рослини'])
        this.florariums = Object.values(data['Флораріуми'])
        this.bonsai = Object.values(data['Бонсай'])
        this.catalog = [
          ...this.foliage,
          ...this.decorativeFlorentem,
          ...this.orchidaceae,
          ...this.succulenta,
          ...this.citrus,
          ...this.exotic,
          ...this.florariums,
          ...this.bonsai
        ]
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async getPlantById(id) {
      this.loading = true
      try {
        const { data } = await axios.get(`plants/id/${id}`)
        this.selectedPlant = data
        return data
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async getCategoryByName(category) {
      this.loading = true
      try {
        const { data } = await axios.get(`plants/${category}`)
        this.selectedCategory = data
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async getStatusPlants() {
      this.loading = true
      try {
        const { data } = await axios.get('plants')
        this.newsPlants = []
        this.salesPlants = []
        this.topPlants = []

        const plantsArray = Object.values(data).flatMap((category) => Object.values(category))

        plantsArray.forEach((plant) => {
          if (plant?.status === 'Новинки') {
            this.newsPlants.push(plant)
          } else if (plant?.status === 'Розпродаж') {
            this.salesPlants.push(plant)
          } else if (plant?.status === 'Топ продажів') {
            this.topPlants.push(plant)
          }
        })
        localStorage.setItem('newsPlants', JSON.stringify(this.newsPlants))
      } catch (error) {
        console.error('Помилка при отриманні даних:', error)
      } finally {
        this.loading = false
      }
    },
    async getPlantsFilterPrice() {
      try {
        const { data } = await axios.get('plants')
        this.priceFilterArray = []
        const plantsArray = Object.values(data).flatMap((category) => Object.values(category))
        this.priceFilterArray = plantsArray.filter((plant) => plant.price)
      } catch (error) {
        console.log(error)
      }
    }
  }
})
