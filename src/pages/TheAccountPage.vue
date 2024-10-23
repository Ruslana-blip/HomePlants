<template>
  <div class="account">
    <div class="account__container">
      <TheTabsWrapper
        class="account__tabs"
        :display="'flex'"
        :direction="'column'"
        :font="'Lato'"
        :height="81"
        :center="'center'"
        :margin="80"
        :flex="304"
      >
        <TheTab class="account__tab" title="МОЇ ЗАМОВЛЕННЯ">
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
                    <span>Кількість: {{ plant.count }} шт</span>
                  </div>
                </div>
              </div>
              <div class="order__footer">
                <span>Разом до сплати:</span>
                <span>
                  {{ order.plants.reduce((acc, plant) => acc + plant.price * plant.count, 0) }}
                  ₴</span
                >
              </div>
            </div>
          </div>
          <div class="empty" v-else>
            <h2 class="empty__title">Ваша історія покупок порожня</h2>
            <p class="empty__desc">
              Ви ще не зробили жодної покупки. Почніть шопінг прямо зараз і заповніть свій список
              улюбленими товарами!
            </p>

            <RouterLink :to="{ name: 'TheCatalogPage' }">
              <TheButtonOrange :width="378" :title="'ПЕРЕЙТИ ДО КАТАЛОГУ'" />
            </RouterLink>
          </div>
        </TheTab>
        <TheTab class="account__tab" title="ВПОДОБАНЕ">
          <div v-if="currentPlants.length">
            <TheCatalogItem :showPlants="currentPlants" class="account__liked" />
            <TheNavigation
              :cards-per-page="9"
              @show-page="updatePage"
              :total-plants="liked"
              class="account__navigation"
            />
          </div>
          <div class="empty" v-else>
            <h2 class="empty__title">У вас ще немає вподобаних товарів</h2>
            <p class="empty__desc">
              Ми оновимо інформацію, як тільки Ви додасте товари, що сподобалися
            </p>

            <RouterLink :to="{ name: 'TheCatalogPage' }">
              <TheButtonOrange :width="378" :title="'ПЕРЕЙТИ ДО КАТАЛОГУ'" />
            </RouterLink>
          </div>
        </TheTab>
        <TheTab class="account__tab" title="ОСОБИСТІ ДАНІ">
          <VeeForm class="account__form form" @submit="saveChanges">
            <ThePersonalityInfo />
            <TheButtonOrange :title="'зберегти зміни'" :width="310" class="form__btn" />
          </VeeForm>
        </TheTab>
        <TheTab class="account__tab" title="ВИЙТИ">
          <div class="empty">
            <h2 class="empty__title">Ви впевнені, що хочете вийти?</h2>
            <p class="empty__desc">
              Ваші незбережені зміни можуть бути втрачені, і ви не зможете переглянути історію
              покупок або стежити за замовленнями.
            </p>

            <div class="empty__btns">
              <RouterLink :to="{ name: 'HomePage' }" @click="removeActiveUser">
                <button class="empty__btn">ВИЙТИ</button></RouterLink
              >

              <RouterLink :to="{ name: 'TheCatalogPage' }"
                ><TheButtonOrange :width="284" :title="'ЗАЛИШИТИСЯ'"
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
import Cactus from '@/assets/images/acoount/кактус.png'
import Zamiokulkas from '@/assets/images/acoount/Заміокулькас.png'
import Anthurium from '@/assets/images/acoount/Anthurium.png'
import Rosemary from '@/assets/images/acoount/Rosemary.png'
import CalisiaBianca from '@/assets/images/acoount/CalisiaBianca.png'

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
      orders: [
        {
          idOrder: '0202',
          data: '12/04/2023',
          plants: [
            { id: 0, img: Cactus, name: 'Ехінокактус', price: '150', count: '2' },
            { id: 1, img: Zamiokulkas, name: 'Заміокулькас', price: '1200', count: '10' },
            { id: 2, img: Anthurium, name: 'Антуріум Black Queen', price: '620', count: '5' }
          ]
        },
        {
          idOrder: '0101',
          data: '10/02/2023',
          plants: [
            { id: 3, img: Rosemary, name: 'Розмарин', price: '1200', count: '1' },
            { id: 4, img: CalisiaBianca, name: 'Калізія Bianca', price: '1800', count: '1' }
          ]
        }
      ],
      liked: [],
      currentPlants: []
    }
  },
  computed: {
    ...mapState(useLikedPlantsStore, ['likedPlants']),
    ...mapState(useCategoriesStore, ['selectedPlant'])
  },
  methods: {
    ...mapActions(useCategoriesStore, ['getPlantById']),
    ...mapActions(useUsersStore, ['removeActiveUser']),
    setFilteredPlants(plants) {
      this.liked = plants
      this.updatePage(1)
    },
    updatePage(page) {
      const start = (page - 1) * 9
      const end = start + 9
      this.currentPlants = this.liked.slice(start, end)
    },
    saveChanges() {
      const userStore = useUsersStore()
      userStore.updateUserName(this.user[0]?.name)
      userStore.updateUserLastName(this.user[0]?.lastName)
      userStore.updateUserNumber(this.user[0]?.number)
      userStore.updateUserEmail(this.user[0]?.email)
    }
  },
  async mounted() {
    try {
      const plantsPromises = this.likedPlants.map((id) => this.getPlantById(id))
      const plants = await Promise.all(plantsPromises)
      this.liked = plants.filter((plant) => plant !== null)
      this.setFilteredPlants(this.liked)
    } catch (error) {
      console.error('Error fetching liked plants:', error)
    }
  }
}
</script>

<style lang="scss" scoped>
.account {
  margin-bottom: 280px;

  // .account__tabs
  &__tabs {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  }
  // .account__tab
  &__tab {
    flex: 1 1 auto;
  }
  .order {
    border-top: 2px solid $dark-purple-gray;
    border-bottom: 2px solid $dark-purple-gray;
    margin-right: 152px;
    // .order__wrapp
    &__wrapp {
      width: 1296px;
      padding: 40px;
      font-size: font-rem(18);
      font-family: 'Lato';
      &:nth-child(1) {
        border-bottom: 2px solid $dark-purple-gray;
      }
    }
    // .order__header
    &__header {
      display: flex;
      justify-content: space-between;
    }
    // .order__main
    &__main {
      margin: 32px 0;
      padding: 16px;
      border-bottom: 1px solid $grey;
    }
    // .order__item
    &__item {
      display: flex;
      gap: 12px;
    }
    // .order__img
    &__img {
      flex: 1 1 120px;
      height: 120px;
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
      flex: 1 1 calc(100% - 132px);
      & span {
        align-self: end;
      }
    }
    &__info {
      display: flex;
      justify-content: space-between;
    }
    // .order__footer
    &__footer {
      display: flex;
      justify-content: space-between;
      & span:nth-child(2) {
        font-weight: 700;
      }
    }
  }
  &__liked {
    flex: 1 1 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 72px;
    justify-content: center;
  }

  &__navigation {
    margin-top: 80px;
  }
}

.form {
  margin-top: 80px;
  width: 840px;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin: 80px auto 0 auto;
}

.empty {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Lato';
  // .empty__title
  &__title {
    font-size: font-rem(24);
    font-weight: 700;
  }
  // .empty__desc
  &__desc {
    font-size: font-rem(18);
    margin: 16px 0 48px 0;
    width: 536px;
    text-align: center;
  }
  &__btn {
    width: 284px;
    height: 58px;
    border: none;
    border: 2px solid $primary-red-orange;
    border-radius: 16px;
    font-size: font-rem(18);
    color: $primary-red-orange;
    margin-right: 48px;
    font-family: 'ZenAntique';
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
</style>
