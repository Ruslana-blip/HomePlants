<template>
  <div class="account">
    <div class="account__container">
      <TheTabsWrapper
        class="account__tabs"
        :font="'Lato'"
        :center="'center'"
        :selectedTab="selectedTab"
        @updateTab="goToNextTab"
        :border="'none'"
        :display="'flex'"
        :margin="40"
      >
        <TheTab class="account__tab" :title="$t('my-order')" :selectedTitle="selectedTab === 0">
          <div class="order" v-if="orders.length">
            <div class="order__wrapp" v-for="order in orders" :key="order.id">
              <div class="order__header">
                <span>№{{ order.idOrder }}</span>
                <span>{{ order.data }}</span>
              </div>
              <div class="order__main" v-for="plant in order.plants" :key="plant.id">
                <div class="order__item">
                  <div class="order__img">
                    <img :src="plant.img" :alt="plant.name" :title="plant.name" />
                  </div>
                  <div class="order__body">
                    <div class="order__info">
                      <span>{{ plant.name }}</span>
                      <span>{{ plant.price * plant.count }} ₴</span>
                    </div>
                    <span>{{ $t('count-products') }}: {{ plant.count }} {{ $t('pcs') }}</span>
                  </div>
                </div>
              </div>
              <div class="order__footer">
                <span>{{ $t('total-pay') }} :</span>
                <span>
                  {{ order.plants.reduce((acc, plant) => acc + plant.price * plant.count, 0) }}
                  ₴</span
                >
              </div>
            </div>
          </div>
          <div class="empty" v-if="!orders.length">
            <h2 class="empty__title">{{ $t('your-purchase-empty') }}</h2>
            <p class="empty__desc">
              {{ $t('no-porchase') }}
            </p>

            <RouterLink :to="{ name: 'TheCatalogPage' }">
              <TheButtonOrange :width="378" :title="$t('return-catalog')" />
            </RouterLink>
          </div>
        </TheTab>
        <TheTab class="account__tab" :title="$t('liked')" :selectedTitle="selectedTab === 1">
          <div v-if="currentPlants.length">
            <TheCatalogItem :showPlants="currentPlants" class="account__liked" />
            <TheNavigation
              :cards-per-page="12"
              @show-page="updatePage"
              :total-plants="liked"
              class="account__navigation"
            />
          </div>
          <div class="empty" v-else>
            <h2 class="empty__title">{{ $t('no-liked-plants') }}</h2>
            <p class="empty__desc">
              {{ $t('no-likes-plants-p') }}
            </p>

            <RouterLink :to="{ name: 'TheCatalogPage' }">
              <TheButtonOrange :width="273" :title="$t('return-catalog')" />
            </RouterLink>
          </div>
        </TheTab>
        <TheTab
          class="account__tab"
          :title="$t('personal-data')"
          :selectedTitle="selectedTab === 2"
        >
          <VeeForm class="account__form form" @submit="saveChanges">
            <ThePersonalityInfo @personal-data="handlePersonalData" />
            <TheButtonOrange :title="$t('save-changes')" :width="310" class="form__btn" />
          </VeeForm>
        </TheTab>
        <TheTab class="account__tab" :title="$t('go-out')" :selectedTitle="selectedTab === 3">
          <div class="empty">
            <h2 class="empty__title">{{ $t('sure-exit') }}</h2>
            <p class="empty__desc">
              {{ $t('unsaved') }}
            </p>

            <div class="empty__btns">
              <RouterLink :to="{ name: 'HomePage' }" @click="removeActiveUser">
                <button class="empty__btn">{{ $t('go-out') }}</button></RouterLink
              >

              <RouterLink :to="{ name: 'TheCatalogPage' }"
                ><TheButtonOrange :width="284" :title="$t('stay')"
              /></RouterLink>
            </div>
          </div>
        </TheTab>
      </TheTabsWrapper>
    </div>
  </div>
</template>

<script>
import TheTabsWrapper from '@/components/tab/TheTabsWrapper.vue'
import TheTab from '@/components/tab/TheTab.vue'

import TheCatalogItem from '@/components/TheCatalogItem.vue'
import TheNavigation from '@/components/TheNavigation.vue'
import TheButtonOrange from '@/components/TheButtonOrange.vue'
import ThePersonalityInfo from '@/components/ThePersonalityInfo.vue'
import { Form as VeeForm } from 'vee-validate'

import { mapActions, mapState } from 'pinia'
import { useLikedPlantsStore } from '@/stores/likedPlants'
import { useCategoriesStore } from '@/stores/categories'
import { useUsersStore } from '@/stores/users'

export default {
  name: 'TheAccount',
  components: {
    TheTabsWrapper,
    TheTab,
    TheCatalogItem,
    TheNavigation,
    VeeForm,
    TheButtonOrange,
    ThePersonalityInfo
  },

  data() {
    return {
      liked: [],
      currentPlants: [],
      selectedTab: 0,
      orders: [],
      userData: null
    }
  },
  computed: {
    ...mapState(useLikedPlantsStore, ['likedPlants']),
    ...mapState(useCategoriesStore, ['selectedPlant'])
  },
  watch: {
    '$i18n.locale'(newLocale) {
      this.updateOrders(newLocale)
    },
    likedPlants: {
      handler(newLikedPlants) {
        this.handleLikedPlantsChange(newLikedPlants)
      },
      deep: true, // Якщо потрібно відстежувати глибокі зміни
      immediate: true // Виконує обробник одразу після монтування
    }
  },
  methods: {
    ...mapActions(useCategoriesStore, ['getPlantById']),
    ...mapActions(useUsersStore, ['removeActiveUser', 'updateUserData']),
    setFilteredPlants(plants) {
      this.liked = plants
      this.updatePage(1)
    },
    updatePage(page) {
      const start = (page - 1) * 12
      const end = start + 12
      this.currentPlants = this.liked.slice(start, end)
    },
    handlePersonalData(userData) {
      this.userData = userData
    },
    saveChanges() {
      this.updateUserData()
    },
    goToNextTab(tabIndex) {
      this.selectedTab = tabIndex
    },
    updateOrders(locale) {
      this.orders = this.$i18n.messages[locale].orders || []
    },
    async handleLikedPlantsChange(newLikedPlants) {
      try {
        const plantsPromises = newLikedPlants.map((id) => this.getPlantById(id))
        const plants = await Promise.all(plantsPromises)
        this.setFilteredPlants(plants.filter((plant) => plant !== null))
      } catch (error) {
        console.error('Error fetching liked plants:', error)
      }
    }
  },
  async mounted() {
    this.handleLikedPlantsChange(this.likedPlants)
    this.updateOrders(this.$i18n.locale)
  }
}
</script>

<style lang="scss" scoped>
.account {
  margin-bottom: 80px;
  @media (min-width: $md) {
    margin-top: 80px;
    margin-bottom: 140px;
  }
  @media (min-width: $xl) {
    margin-bottom: 280px;
  }
  // .account__tabs
  &__tabs {
    @media (min-width: $md) {
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      gap: 60px;
    }
    @media (min-width: $xl) {
      gap: 150px;
    }
  }
  // .account__tab
  &__tab {
    @media (min-width: $md) {
      flex: 1 1 auto;
    }
  }
  .order {
    margin-top: 40px;
    border-top: 2px solid $dark-purple-gray;
    border-bottom: 2px solid $dark-purple-gray;
    @media (min-width: $md) {
      margin-top: 0;
    }

    // .order__wrapp
    &__wrapp {
      font-size: font-rem(16);
      font-family: 'Lato';
      padding: 15px 0;
      &:nth-child(1) {
        border-bottom: 2px solid $dark-purple-gray;
      }
      &:not(:last-child) {
        margin-bottom: 40px;
      }
      @media (min-width: $md) {
        padding: 40px;
        font-size: font-rem(18);
        &:not(:last-child) {
          margin-bottom: 0;
        }
      }
      @media (min-width: $lg) {
        padding: 15px;
        margin: 32px 0;
      }
      @media (min-width: 1920px) {
        padding: 40px;
        width: 1296px;
      }
    }
    // .order__header
    &__header {
      display: flex;
      justify-content: space-between;
    }
    // .order__main
    &__main {
      border-bottom: 1px solid $grey;
      @media (min-width: $xl) {
        padding: 16px;
      }
    }
    // .order__item
    &__item {
      display: flex;
      gap: 6px;
      height: 120px;
      padding: 12px;

      @media (min-width: $md) {
        height: auto;
        padding: 16px;
        gap: 12px;
      }
    }
    // .order__img
    &__img {
      flex: 0 0 100px;
      @media (min-width: $xl) {
        flex: 1 1 120px;
        height: 120px;
      }
      & img {
        width: 100%;
        height: 100%;
      }
    }
    // .order__body
    &__body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1 1 auto;
      & span {
        align-self: end;
      }
      @media (min-width: $md) {
        flex: 1 1 calc(100% - 132px);
      }
    }
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-self: start;
      & span {
        align-self: start;
      }
      @media (min-width: $sm) {
        width: 100%;
        flex-direction: row;
        & span {
          align-self: end;
        }
      }
    }
    // .order__footer
    &__footer {
      display: flex;
      justify-content: space-between;
      margin: 20px 0;
      & span:nth-child(2) {
        font-weight: 700;
      }
    }
  }
  &__liked {
    margin-top: 40px;
    // flex: 1 1 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    // justify-content: center;
    @media (min-width: $lg) {
      margin-top: 0;
      gap: 72px;
    }
  }

  &__navigation {
    @media (min-width: $sm) {
      margin-top: 80px;
    }
  }
}

.form {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (min-width: $xxl) {
    width: 840px;
    height: 100%;
    margin: 80px auto 0 auto;
  }
}

.empty {
  margin-top: 60px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Lato';
  @media (min-width: $lg) {
    margin-top: 0;
  }
  // .empty__title
  &__title {
    font-size: font-rem(20);
    font-weight: 700;
    text-align: center;

    @media (min-width: $md) {
      font-size: font-rem(24);
    }
  }
  // .empty__desc
  &__desc {
    margin: 14px 0 24px;
    font-size: font-rem(16);
    text-align: center;
    @media (min-width: $sm) {
      margin: 16px 0 48px 0;
      font-size: font-rem(18);
    }
    @media (min-width: $lg) {
      width: 536px;
    }
  }

  &__btns {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    @media (min-width: $xl) {
      gap: 48px;
    }
  }
  &__btn {
    width: 284px;
    height: 58px;
    border: none;
    border: 2px solid $primary-red-orange;
    border-radius: 16px;
    font-size: font-rem(18);
    color: $primary-red-orange;
    font-family: 'ZenAntique';
    text-transform: uppercase;
    @media (min-width: $lg) {
      transition: $time;
      &:hover {
        background-color: $primary-red-orange;
        color: $white;
      }
      &:active {
        bottom: 48px;
      }
    }
  }
}
</style>
