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
    priceFilterArray: [],
    a: null
  }),
  actions: {
    async getCategories() {
      this.loading = true
      try {
        const { data } = await axios.get('plants')
        this.categories = data ? Object.keys(data) : []
        // this.a = Object.values(data)

        // console.log(this.a)

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
        this.foliage = Object.values(data['Decorative deciduous'])
        this.decorativeFlorentem = Object.values(data['Ornamental-flowering'])
        this.orchidaceae = Object.values(data['Orchids'])
        this.succulenta = Object.values(data['Succulents'])
        this.citrus = Object.values(data['Citrus plants'])
        this.exotic = Object.values(data['Exotic plants'])
        this.florariums = Object.values(data['Florariums'])
        this.bonsai = Object.values(data['Bonsai'])
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
        router.push({ name: 'TheError' })
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
      this.loading = true
      try {
        const { data } = await axios.get('plants')
        this.priceFilterArray = []
        const plantsArray = Object.values(data).flatMap((category) => Object.values(category))
        this.priceFilterArray = plantsArray.filter((plant) => plant.price)
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
})
