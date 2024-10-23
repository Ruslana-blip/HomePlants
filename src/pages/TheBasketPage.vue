<template>
  <div class="basket">
    <div class="basket__container">
      <TheTabsWrapper
        class="basket__tabs tab"
        :font="'Georgia'"
        :height="61"
        :margin="80"
        :width="840"
      >
        <TheTab class="tab__wrapp" title="ОФОРМЛЕННЯ ЗАМОВЛЕННЯ" v-show="activeTab === 0">
          <div class="tab__bags">
            <h2 class="tab__title">Ваше замовлення</h2>
            <TheBagsItem :bags="bags" class="tab__order" />
            <div class="tab__count">
              <span>Кількість товару:</span>
              <span>{{ bags.length }} шт</span>
            </div>
            <div class="tab__sum">
              <span>Разом до сплати:</span>
              <span>{{ totalSum }} ₴</span>
            </div>
          </div>
          <div class="tab__content">
            <ThePersonalityInfo class="tab__inputs" :width="324" />
            <TheButtonOrange
              :title="'Продовжити'"
              :width="280"
              class="tab__btn"
              @click="goToNextTab"
            />
          </div>
        </TheTab>

        <TheTab class="tab__item" title="" v-show="activeTab === 1">
          <div class="tab__pay">
            <div class="tab__heading">
              <div class="tab__img">
                <img src="@/assets/images/pay/info-circle.svg" alt="icon" title="icon" />
              </div>
              <span>Оплата</span>
            </div>
            <div class="tab__desc">
              <p>
                На даний момент оплата за товари в нашому інтернет-магазині здійснюється виключно
                готівкою під час отримання замовлення. Забрати своє замовлення ви можете на одній із
                трьох точок видачі.
              </p>
              <p>
                Дякуємо за розуміння! Ми працюємо над тим, щоб незабаром додати інші варіанти оплати
                для вашої зручності.
              </p>
            </div>
          </div>
          <div class="tab__main">
            <div class="tab__maps">
              <img src="@/assets/images/pay/map.png" alt="maps" title="Maps" />
            </div>
            <form class="tab__form form">
              <h3>Оберіть точку видачі</h3>

              <div class="form__radios">
                <div class="form__input">
                  <input type="radio" name="shops" value="Садова" checked id="Садова" />
                  <label for="Садова">вул. Садова, 123, м. Вінниця, Україна </label>
                </div>

                <div class="form__input">
                  <input type="radio" name="shops" value="Сонячний" id="Сонячний" />
                  <label for="Сонячний">провулок Сонячний, 56, м. Вінниця, Україна </label>
                </div>

                <div class="form__input">
                  <input type="radio" name="shops" value="Квіткова" id="Квіткова" />
                  <label for="Квіткова">площа Квіткова, 22, м. Вінниця, Україна </label>
                </div>
              </div>
              <TheButtonOrange
                :width="280"
                :title="'Підтвердити'"
                class="form__btn"
                @click.prevent="openPopup"
              />
              <div v-if="isVisible" class="popup" @click="closePopup">
                <div class="popup__content">
                  <div class="popup__wrapp">
                    <h2>Дякуємо за вашу покупку!</h2>
                    <p>
                      Ваше замовлення успішно оформлене. Найближчим часом ви отримаєте підтвердження
                      на вашу електронну пошту з усіма деталями замовлення.
                    </p>
                    <p>
                      Якщо у вас виникнуть запитання, не вагайтеся звертатися до нашої служби
                      підтримки.
                    </p>
                    <p>Дякуємо за довіру!</p>
                    <TheButtonOrange @click="handleSubmit" :title="'НА ГОЛОВНУ'" :width="273" />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </TheTab>
      </TheTabsWrapper>
    </div>
  </div>
</template>

<script>
import TheTabsWrapper from '@/components/tab/TheTabsWrapper.vue'
import TheTab from '@/components/tab/TheTab.vue'
import TheBagsItem from '@/components/TheBagsItem.vue'
import ThePersonalityInfo from '@/components/ThePersonalityInfo.vue'
import TheButtonOrange from '@/components/TheButtonOrange.vue'

import { mapActions, mapState } from 'pinia'
import { useBagsStore } from '@/stores/bags'
export default {
  name: 'TheBasketPage',
  components: {
    TheTabsWrapper,
    TheTab,
    TheBagsItem,
    ThePersonalityInfo,
    TheButtonOrange
  },
  data() {
    return {
      isVisible: false,
      activeTab: 0
    }
  },
  computed: {
    ...mapState(useBagsStore, ['bags']),
    totalSum() {
      return this.bags.reduce((total, plant) => total + plant.price * plant.count, 0)
    }
  },
  methods: {
    ...mapActions(useBagsStore, ['removePlantWithBag', 'clearBags']),
    handleSubmit() {
      const bagsStore = useBagsStore()
      bagsStore.clearBags()
      this.$router.push('/')
      this.closePopup()
    },
    openPopup() {
      this.isVisible = true
    },
    closePopup() {
      this.isVisible = false
    },
    goToNextTab() {
      this.activeTab = 1
    }
  }
}
</script>

<style lang="scss" scoped>
.tab {
  margin-bottom: 280px;
  // .tab__item
  &__wrapp {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  &__bags {
    margin-top: 80px;
    font-family: 'Lato';
    flex: 0 0 840px;
    background-color: $ligth-green;
    padding: 64px 40px;
  }
  // .tab__content
  &__content {
    flex: 0 1 688px;
  }
  // .tab__title
  &__title {
    font-weight: 700;
    font-size: font-rem(24);
  }
  // .tab__order
  &__order {
    margin: 40px 0;
  }
  // .tab__count
  &__count,
  &__sum {
    display: flex;
    justify-content: space-between;
  }
  // .tab__sum
  &__sum {
    margin-top: 24px;
  }
  // .tab__inputs
  &__inputs {
    margin-top: 160px;
    width: 688px;
    column-gap: 40px;
    row-gap: 46px;
  }
  // .tab__btn
  &__btn {
    margin-left: 204px;
  }
}
.tab {
  // .tab__wrapp
  &__item {
    display: flex;
    flex-direction: column;
    font-family: 'Lato';
    font-size: font-rem(18);
  }
  // .tab__pay
  &__pay {
    margin: 80px 0;
    border-top: 1px solid $dark-purple-gray;
    border-bottom: 1px solid $dark-purple-gray;
    padding: 40px 150px;
  }
  // .tab__heading
  &__heading {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
    & span {
      font-weight: 700;
      font-size: font-rem(24);
    }
  }
  // .tab__img
  &__img {
    width: 24px;
    height: 24px;
  }
  // .tab__desc
  &__desc {
    display: flex;
    gap: 72px;
    & p {
      flex: 1 1 calc(50% - 72px);
    }
  }
  &__main {
    display: flex;
  }
  // .tab__maps
  &__maps {
    width: 910px;
    height: 640px;
    margin-right: 160px;
    & img {
      width: 100%;
      height: 100%;
      border-radius: 18px;
    }
  }
}
.form {
  margin-top: 80px;
  & h3 {
    font-size: font-rem(24);
    font-weight: 700;
  }
  &__radios {
    margin: 48px 0;
  }
  // .form__input
  &__input {
    margin-left: 24px;
    &:not(:last-child) {
      margin-bottom: 24px;
    }
    & label {
      padding-left: 24px;
      position: relative;
      &::before,
      &::after {
        position: absolute;
        content: '';
        border-radius: 50%;
      }
      &::before {
        top: 0;
        left: 0;
        width: 18px;
        height: 18px;
        border: 2px solid $primary-red-orange;
      }
      &::after {
        top: 3px;
        left: 3px;
        width: 12px;
        height: 12px;
        background-color: transparent;
        transition: background-color 0.3s ease;
      }
    }
    & input:checked + label::after {
      background-color: $primary-red-orange;
    }
    & input {
      display: none;
    }
  }
  &__btn {
    margin-left: 94px;
  }
}
.popup {
  position: fixed;
  z-index: 50;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  // .popup__content
  &__content {
    width: 880px;
    height: 800px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: $white;
  }
  &__wrapp {
    width: 480px;
    height: 345px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    font-family: 'Lato';
    & h2 {
      font-size: font-rem(24);
      font-weight: 700;
    }
  }
}
</style>
