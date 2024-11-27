<template>
  <div class="main">
    <header class="header">
      <div class="header__cont">
        <span>{{ $t('personal-account') }}</span>
        <button class="header__close" @click="toggleCabinet"></button>
      </div>
    </header>
    <TheTabsWrapper
      class="actions"
      :borderWidth="Number(1)"
      :selectedTab="selectedTab"
      @updateTab="goToNextTab"
    >
      <TheTab :title="$t('registration')" class="actions__title" :selectedTitle="selectedTab === 0">
        <VeeForm class="actions__form form" @submit="closeAndRegister">
          <div class="form__field">
            <label for="name"></label>
            <Field :rules="validateName" type="text" id="name" name="name" class="form__input" />
            <ErrorMessage name="name" class="form__error" />
          </div>
          <div class="form__field">
            <label for="number"></label>
            <Field
              :rules="validateNumber"
              type="tel"
              id="number"
              name="number"
              class="form__input"
              value="+380"
            />
            <ErrorMessage name="number" class="form__error" />
          </div>
          <TheButtonOrange :title="$t('create-account')" class="form__btn" />
        </VeeForm>
      </TheTab>
      <TheTab
        :title="$t('authorization')"
        class="actions__title"
        :selectedTitle="selectedTab === 1"
      >
        <VeeForm class="actions__form form" @submit="handleLogin">
          <div class="form__field">
            <label for="numberUser"></label>
            <Field
              :rules="validateNumber"
              type="tel"
              id="numberUser"
              name="numberUser"
              class="form__input"
              value="+380"
            />
            <ErrorMessage name="numberUser" class="form__error" />
          </div>
          <TheButtonOrange :title="$t('log-in')" class="form__btn" />
        </VeeForm>
      </TheTab>
    </TheTabsWrapper>
  </div>
</template>

<script>
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate'
import TheTabsWrapper from '@/components/tab/TheTabsWrapper.vue'
import TheTab from '@/components/tab/TheTab.vue'
import TheButtonOrange from '@/components/TheButtonOrange.vue'
import { mapActions, mapState } from 'pinia'
import { useUsersStore } from '@/stores/users'

export default {
  name: 'TheDropdown',
  components: {
    TheTabsWrapper,
    TheTab,
    VeeForm,
    Field,
    ErrorMessage,
    TheButtonOrange
  },
  data() {
    return {
      selectedTab: 0
    }
  },
  props: {
    toggleCabinet: {
      type: Function
    },
    isCabinetOpen: {
      type: Boolean
    }
  },
  computed: {
    ...mapState(useUsersStore, ['usersList'])
  },
  methods: {
    ...mapActions(useUsersStore, ['registerUser', 'isUserInUserList', 'setActiveUser']),
    validateName(name) {
      if (!name) return 'Це поле є обов’язковим.'
      const validNameRegex = /^[A-Za-zА-Яа-яІіЇїЄє'`]+$/
      if (!validNameRegex.test(name)) {
        return 'Ім’я може містити лише букви та апостроф.'
      }
      return true
    },
    validateNumber(number) {
      if (!number) return 'Це поле є обов’язковим.'
      const validPhoneRegex = /^\+380\d{9}$/
      if (!validPhoneRegex.test(number)) {
        return 'Номер повинен містити 13 символів'
      }
      return true
    },
    handleLogin(values) {
      const number = values.numberUser
      const user = Object.values(this.usersList).find((user) => user.number === number)

      if (user) {
        this.setActiveUser(user)
        this.$router.push({ name: 'TheAccountPage' })
        this.toggleCabinet()
      } else {
        alert('Користувача не знайдено')
      }
    },
    closeAndRegister(values) {
      const user = {
        name: values.name,
        number: values.number
      }
      // Додаємо нового користувача
      if (user) {
        this.registerUser(user)
        this.setActiveUser(user)
        this.$router.push({ name: 'TheAccountPage' })
        this.toggleCabinet()
      }
    },
    goToNextTab(tabIndex) {
      this.selectedTab = tabIndex
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  position: fixed;
  top: 0;
  right: 0;
  background-color: $bg-white;
  width: 100vw;
  height: 100vh;
  @media (min-width: $md) {
    top: 50%;
    right: 50%;
    width: 500px;
    height: 600px;
    background-color: $white;
    font-size: font-rem(24);
    transform: translate(50%, -50%);
  }
  @media (min-width: $lg) {
    width: 680px;
    height: 700px;
  }
  @media (min-width: $xxl) {
    width: 880px;
    height: 800px;
  }
}
.header {
  border-bottom: 1px solid $grey;
  text-transform: uppercase;

  // .header__container
  &__cont {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 0 16px;
  }
  // .header__close
  &__close {
    position: relative;
    width: 24px;
    height: 24px;
    border: none;
    &::before {
      position: absolute;
      content: '';
      top: 0;
      right: 0;
      background-image: url('@/assets/images/popup/close.svg');
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
}

.actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100% - 60px);
  @media (min-width: $xl) {
    height: 600px;
    width: 100%;
  }

  // .actions__title
  &__title {
    display: flex;
    justify-content: center;
  }
  // .actions__form
  &__form {
    margin-top: 40px;

    @media (min-width: $lg) {
      margin-top: 72px;
    }
  }
}
.form {
  // .form__field
  &__field {
    margin: 0 auto;
    border-radius: 4px;
    height: 56px;
    width: 320px;
    outline: 1px solid $secondary-grey;
    position: relative;
    font-family: 'Roboto';
    color: $dark-purple-gray;
    padding: 4px 0 0 16px;
    &:not(:last-child) {
      margin-bottom: 24px;
    }
    &::before {
      position: absolute;
      top: 0;
      left: 12px;
      z-index: 3;
      font-size: font-rem(12);
      transform: translateY(-50%);
      background-color: $bg-white;
      display: flex;
      align-items: center;
      justify-content: center;
      @media (min-width: $md) {
        background-color: $white;
      }
    }
    &:nth-child(1) {
      &::before {
        content: 'Ім’я';
        width: 30px;
      }
    }
    &:nth-child(2) {
      &::before {
        content: 'Номер телефону';
        width: 102px;
      }
    }
    @media (min-width: $lg) {
      width: 400px;
    }
  }
  // .form__input
  &__input {
    background-color: $bg-white;
    width: 100%;
    height: 100%;

    border: none;
    @media (min-width: $md) {
      background-color: $white;
    }
  }
  // .form__error
  &__error {
    font-size: font-rem(12);
    color: $secondary-red;
    display: flex;
    justify-content: end;
  }
  &__btn {
    margin-top: 32px;
    width: 320px;
    @media (min-width: $lg) {
      margin-top: 16px;
      width: 400px;
    }
  }
}
</style>
