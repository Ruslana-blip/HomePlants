import { defineStore } from 'pinia'

export const useUsersStore = defineStore('usersStore', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('activeUser')) || {
      name: '',
      lastName: '',
      number: '',
      email: ''
    },
    // Якщо usersList — це об'єкт, перетворіть його в масив
    usersList: Object.values(JSON.parse(localStorage.getItem('usersList')) || [])
  }),
  getters: {
    isLoggedIn: (state) => !!state.user
  },
  actions: {
    updateUserData(key, value) {
      this.user[key] = value
      this.updateLocalStorage()
      this.updateUserInList()
    },
    updateLocalStorage() {
      localStorage.setItem('activeUser', JSON.stringify(this.user))
    },
    registerUser(user) {
      if (!this.usersList.some((element) => user.number === element.number)) {
        this.usersList.push(user)
        localStorage.setItem('usersList', JSON.stringify(this.usersList))
        this.user = user
        localStorage.setItem('activeUser', JSON.stringify(user))
      }
    },
    setActiveUser(user) {
      this.user.name = user.name
      this.user.number = user.number
      this.user.lastName = user.lastName || ''
      this.user.email = user.email || ''
      localStorage.setItem('activeUser', JSON.stringify(this.user))
    },
    isUserInUserList(number) {
      return !!this.usersList.find((user) => user.number === number)
    },
    updateUserInList() {
      const index = this.usersList.findIndex((element) => element.number === this.user.number)
      if (index !== -1) {
        this.usersList[index] = { ...this.user }
        localStorage.setItem('usersList', JSON.stringify(this.usersList))
        this.updateLocalStorage()
      }
    },
    removeActiveUser() {
      // Видаляємо активного користувача з localStorage
      localStorage.removeItem('activeUser')
      // Очищаємо дані активного користувача в state
      this.user = {
        name: '',
        lastName: '',
        number: '',
        email: ''
      }
      alert('Ви вийшли з аккаунтв')
    }
  }
})
