<template>
  <div class="basket">
    <div class="basket__container">
      <TheTabsWrapper
        class="basket__tabs tab"
        :font="'Georgia'"
        :margin="40"
        :selectedTab="selectedTab"
        @updateTab="goToNextTab"
      >
        <TheTab class="tab__wrapp" :title="$t('place-order')" :selectedTitle="selectedTab === 0">
          <div class="tab__bags">
            <h2 class="tab__title">{{ $t('your-order') }}</h2>
            <TheBagsItem :bags="bags" class="tab__order" />
            <div class="tab__count">
              <span>{{ $t('count-products') }}:</span>
              <span>{{ totalCount }} {{ $t('pcs') }}</span>
            </div>
            <div class="tab__sum">
              <span>{{ $t('total-pay') }}:</span>
              <span>{{ totalSum }} ₴</span>
            </div>
          </div>
          <div class="tab__cont">
            <ThePersonalityInfo class="tab__inputs" />
            <TheButtonOrange :title="$t('continue')" class="tab__btn" @click="goToNextTab(1)" />
          </div>
        </TheTab>

        <TheTab class="tab__item" :title="$t('delivery')" :selectedTitle="selectedTab === 1">
          <div class="tab__pay">
            <div class="tab__heading">
              <div class="tab__img">
                <img src="@/assets/images/pay/info-circle.svg" alt="icon" title="icon" />
              </div>
              <span>{{ $t('pay') }}</span>
            </div>
            <div class="tab__desc">
              <p>
                {{ $t('pay-p-first') }}
              </p>
              <p>
                {{ $t('pay-p-second') }}
              </p>
            </div>
          </div>
          <div class="tab__main">
            <div class="tab__maps">
              <img src="@/assets/images/pay/map.png" alt="maps" title="Maps" />
            </div>
            <form class="tab__form form">
              <h3>{{ $t('choose-point') }}</h3>

              <div class="form__radios">
                <div class="form__input">
                  <input type="radio" name="shops" value="Садова" checked id="Садова" />
                  <label for="Садова">{{ $t('point-1') }}</label>
                </div>

                <div class="form__input">
                  <input type="radio" name="shops" value="Сонячний" id="Сонячний" />
                  <label for="Сонячний">{{ $t('point-2') }} </label>
                </div>

                <div class="form__input">
                  <input type="radio" name="shops" value="Квіткова" id="Квіткова" />
                  <label for="Квіткова">{{ $t('point-3') }} </label>
                </div>
              </div>
              <TheButtonOrange
                :width="280"
                :title="$t('confirm')"
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
                    <RouterLink :to="{ name: 'HomePage' }"
                      ><TheButtonOrange :title="'НА ГОЛОВНУ'" :width="273"
                    /></RouterLink>
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
      selectedTab: 0
    }
  },
  computed: {
    ...mapState(useBagsStore, ['bags']),
    totalSum() {
      return this.bags.reduce((total, plant) => total + plant.price * plant.count, 0)
    },
    totalCount() {
      return this.bags.reduce((count, plant) => count + plant.count, 0)
    }
  },
  methods: {
    ...mapActions(useBagsStore, ['removePlantWithBag', 'clearBags']),
    openPopup() {
      this.isVisible = true
    },
    closePopup() {
      this.isVisible = false
    },
    goToNextTab(tabIndex) {
      this.selectedTab = tabIndex
    }
  }
}
</script>

<style lang="scss" scoped>
.tab {
  margin-bottom: 80px;

  @media (min-width: $lg) {
    margin-bottom: 120px;
  }
  @media (min-width: $xxl) {
    margin-bottom: 280px;
  }
  // .tab__item
  &__wrapp {
    @media (min-width: $lg) {
      width: 100%;
      display: flex;
      justify-content: space-between;
      gap: 90px;
    }
    @media (min-width: $xxl) {
      gap: 120px;
    }
    @media (min-width: 1920px) {
      gap: 223px;
    }
  }
  &__bags {
    background-color: $ligth-green;
    margin-top: 40px;
    padding: 10px;
    font-family: 'Lato';
    @media (min-width: $sm) {
      padding: 40px;
      flex: 0 1 840px;
    }
    @media (min-width: $xxl) {
      margin-top: 80px;

      padding: 64px 40px;
    }
  }
  // .tab__content
  &__cont {
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: $lg) {
      flex: 0 1 688px;
    }
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
    margin-top: 60px;
    row-gap: 20px;
    @media (min-width: $xxl) {
      margin-top: 160px;
      width: 688px;
      column-gap: 40px;
      row-gap: 46px;
    }
  }
  // .tab__btn
  &__btn {
    width: 100%;
    @media (min-width: $md) {
      width: 50%;
    }
    @media (min-width: $lg) {
      width: 280px;
    }
  }
}
.tab {
  // .tab__wrapp
  &__item {
    @media (min-width: $sm) {
      display: flex;
      flex-direction: column;
      font-family: 'Lato';
      font-size: font-rem(18);
    }
  }
  // .tab__pay
  &__pay {
    margin-top: 40px;
    border-top: 1px solid $dark-purple-gray;
    border-bottom: 1px solid $dark-purple-gray;
    margin: 20px 0;
    padding: 20px 0;
    @media (min-width: $md) {
      margin: 40px 0;
      padding: 40px;
    }
    @media (min-width: $lg) {
      margin: 60px 0;
      padding: 40px 80px;
    }
    @media (min-width: $xxl) {
      margin: 80px 0;

      padding: 40px 150px;
    }
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
    gap: 12px;
    flex-direction: column;
    font-size: font-rem(16);
    @media (min-width: $md) {
      flex-direction: row;
      gap: 24px;
      font-size: font-rem(18);
      & p {
        flex: 1 1 calc(50% - 24px);
      }
    }
    @media (min-width: $lg) {
      gap: 72px;
      & p {
        flex: 1 1 calc(50% - 72px);
      }
    }
  }
  &__main {
    @media (min-width: $md) {
      display: flex;
      gap: 24px;
    }
  }
  // .tab__maps
  &__maps {
    margin-top: 24px;
    width: 100%;
    height: auto;
    @media (min-width: $md) {
      flex: 1 1 calc(50% - 24px);
    }
    @media (min-width: $xxl) {
      width: 910px;
      height: 640px;
      margin-right: 160px;
    }

    & img {
      width: 100%;
      height: 100%;
      border-radius: 18px;
    }
  }
}
.form {
  margin-top: 40px;
  @media (min-width: $md) {
    flex: 1 1 calc(50% - 24px);
  }
  @media (min-width: $lg) {
    margin-top: 80px;
  }
  & h3 {
    font-size: font-rem(20);
    @media (min-width: $lg) {
      font-size: font-rem(24);
      font-weight: 700;
    }
  }
  &__radios {
    margin: 24px 0;
    @media (min-width: $lg) {
      margin: 48px 0;
    }
  }
  // .form__input
  &__input {
    font-size: font-rem(16);
    margin-left: 12px;
    &:not(:last-child) {
      margin-bottom: 12px;
    }
    @media (min-width: $lg) {
      margin-left: 24px;
      &:not(:last-child) {
        margin-bottom: 24px;
      }
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
    @media (min-width: $lg) {
      margin-left: 94px;
    }
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
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: $bg-white;
    @media (min-width: $lg) {
      width: 880px;
      height: 800px;
      background-color: $white;
    }
  }
  &__wrapp {
    width: 100%;
    height: 345px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    font-family: 'Lato';
    font-size: font-rem(16);
    @media (min-width: $sm) {
      width: 480px;
    }
    @media (min-width: $lg) {
      font-size: font-rem(18);
    }
    & h2 {
      font-size: font-rem(24);
      font-weight: 700;
    }
  }
}
</style>
