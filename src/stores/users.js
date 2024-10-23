import { defineStore } from 'pinia'

export const useUsersStore = defineStore('usersStore', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('activeUser')) || {
      name: '',
      lastName: '',
      number: '',
      email: ''
    },
    usersList: JSON.parse(localStorage.getItem('usersList')) || []
  }),
  actions: {
    updateUserName(name) {
      this.user.name = name
      this.updateLocalStorage()
      this.updateUserInList()
    },
    updateUserLastName(lastName) {
      this.user.lastName = lastName
      this.updateLocalStorage()
      this.updateUserInList()
    },
    updateUserNumber(number) {
      this.user.number = number
      this.updateLocalStorage()
      this.updateUserInList()
    },
    updateUserEmail(email) {
      this.user.email = email
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
        alert('Користувач зареєстрований: ' + user.name)
      } else {
        alert('Користувач вже зареєстрований')
      }
    },
    setActiveUser(user) {
      this.user = user
      localStorage.setItem('activeUser', JSON.stringify(user))
    },
    isUserInUserList(number) {
      if (number) {
        const user = this.usersList.find((user) => user.number === number)
        console.log(user ? 1 : 0)
        return !!user
      }
      return false
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
      alert('Активний користувач видалений')
    }
  }
})
