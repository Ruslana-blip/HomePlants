<template>
  <div class="plant" v-if="selectedPlant">
    <div class="plant__container">
      <div class="plant__content">
        <div class="plant__images">
          <div
            class="plant__image"
            v-for="(img, index) in selectedPlant?.img"
            :key="index"
            :class="{ active: selectedImage === index }"
            @click="selectImage(index)"
          >
            <img
              :src="img"
              :alt="$i18n.locale === 'uk' ? selectedPlant.name : selectedPlant.name_en"
              :title="$i18n.locale === 'uk' ? selectedPlant.name : selectedPlant.name_en"
            />
          </div>
        </div>
        <div class="progressBar" v-if="selectedPlant?.img.length">
          <div class="progressBar__width" :style="{ height: progressBarHeight + 'px' }"></div>
        </div>
        <div v-if="selectedImage !== null" class="plant__image-active">
          <img
            :src="selectedPlant?.img[selectedImage]"
            :alt="$i18n.locale === 'uk' ? selectedPlant.name : selectedPlant.name_en"
            :title="$i18n.locale === 'uk' ? selectedPlant.name : selectedPlant.name_en"
          />
        </div>
        <div class="plant__main">
          <span :class="getStatusClass(selectedPlant?.status)">{{
            $i18n.locale === 'uk' ? selectedPlant.status : selectedPlant.status_en
          }}</span>
          <span class="plant__name">{{
            $i18n.locale === 'uk' ? selectedPlant.name : selectedPlant.name_en
          }}</span>
          <div class="plant__price">
            {{ $t('price') }}:
            <div v-if="selectedPlant?.status === 'Розпродаж'">
              <span class="plant__originalPrice"> {{ selectedPlant?.price }} ₴ </span>
              <span class="plant__salesPrice"> {{ selectedPlant?.price * 0.7 }} ₴ </span>
            </div>
            <div v-else>
              <span>{{ selectedPlant?.price }} ₴</span>
            </div>
          </div>
          <span class="plant__height"
            ><span>{{ $t('height') }}:</span>: {{ selectedPlant?.height }} {{ $t('sm') }}</span
          >
          <span class="plant__category"
            ><span>{{ $t('category') }}:</span>
            {{ $i18n.locale === 'uk' ? selectedPlant.category : selectedPlant.category_en }}</span
          >
          <div class="plant__counter actions">
            <button
              class="actions__decrement"
              @click="decrementCount"
              :disabled="currentCount === 1"
            ></button>
            <span class="actions__count">{{ currentCount }}</span>
            <button
              class="actions__increment"
              @click="incrementCount"
              :disabled="currentCount === 10"
            ></button>
          </div>
          <TheButtonOrange @click="addPlantToBag" :title="$t('add-bag')" class="actions__btn" />
        </div>
      </div>
      <div v-if="isPopUpVisible" class="plant__overlay">
        <PopUpBag :isPopUpVisible="isPopUpVisible" :togglePopUpBag="togglePopUpBag" />
      </div>
      <TheTabsWrapper
        class="tab"
        :borderWidth="Number(1)"
        :selectedTab="selectedTab"
        @updateTab="goToNextTab"
      >
        <TheTab :title="$t('charac')" class="tab__items" :selectedTitle="selectedTab === 0"
          ><p class="tab__desc">
            {{ $i18n.locale === 'uk' ? selectedPlant.desc : selectedPlant.desc_en }}
          </p>
          <p class="tab__desc">
            {{
              $i18n.locale === 'uk' ? selectedPlant.conditionsСare : selectedPlant.conditionsСare_en
            }}
          </p></TheTab
        >
        <TheTab :title="$t('care')" class="tab__items" :selectedTitle="selectedTab === 1">
          <div class="tab__desc">
            <span>{{ $t('soil') }}:</span>
            <p>{{ $i18n.locale === 'uk' ? selectedPlant.soilType : selectedPlant.soilType_en }}</p>
          </div>
          <div class="tab__desc">
            <span>{{ $t('light') }}:</span>
            <p>
              {{
                $i18n.locale === 'uk'
                  ? selectedPlant.lightRequirement
                  : selectedPlant.lightRequirement_en
              }}
            </p>
          </div>
          <div class="tab__desc">
            <span>{{ $t('temp') }}:</span>
            <p>
              {{ $i18n.locale === 'uk' ? selectedPlant.temperature : selectedPlant.temperature_en }}
            </p>
          </div>
          <div class="tab__desc">
            <span>{{ $t('soil') }}:</span>
            <p>
              {{
                $i18n.locale === 'uk' ? selectedPlant.humidityLevel : selectedPlant.humidityLevel_en
              }}
            </p>
          </div>
        </TheTab>
      </TheTabsWrapper>
    </div>
    <TheSlider :title="title" :values="newsPlants" />
  </div>

  <div class="loader__wrapper" v-else-if="loading">
    <div class="loader"></div>
  </div>
</template>

<script>
import TheSlider from '@/components/slider/TheSlider.vue'
import PopUpBag from '@/components/PopUpBag.vue'
import TheTabsWrapper from '@/components/tab/TheTabsWrapper.vue'
import TheTab from '@/components/tab/TheTab.vue'
import TheButtonOrange from '@/components/TheButtonOrange.vue'
import TheError from '@/components/TheError.vue'
import { useBagsStore } from '@/stores/bags'
import { useCategoriesStore } from '@/stores/categories'
import { mapActions, mapState } from 'pinia'
export default {
  name: 'TheSinglePlantPage',
  components: {
    TheSlider,
    PopUpBag,
    TheTabsWrapper,
    TheTab,
    TheButtonOrange,
    TheError
  },
  data() {
    return {
      selectedImage: 0,
      title: 'Вам також може сподобатись',
      isPopUpVisible: false,
      loading: true,
      currentCount: 1,
      selectedTab: 0
    }
  },
  computed: {
    ...mapState(useCategoriesStore, ['selectedPlant', 'newsPlants']),
    ...mapState(useBagsStore, ['bags']),
    isDataExists() {
      return Boolean(localStorage.getItem('newsPlants'))
    },
    progressBarHeight() {
      const maxHeight = 684
      if (this.selectedImage === null || !this.selectedPlant?.img.length) return 0
      return ((this.selectedImage + 1) / this.selectedPlant.img.length) * maxHeight
    }
  },
  methods: {
    ...mapActions(useBagsStore, ['updatePlantCount', 'updateLocalStorage']),
    ...mapActions(useCategoriesStore, ['getPlantById']),
    ...mapActions(useBagsStore, ['addPlantInBag']),
    getStatusClass(status) {
      if (status === 'Новинки') {
        return 'plant__newPlants'
      } else if (status === 'Розпродаж') {
        return 'plant__sales'
      } else if (status === 'Топ продажів') {
        return 'plant__top'
      } else {
        return ''
      }
    },
    async fetchPlantData() {
      await this.getPlantById(this.$route.params.id)
    },
    selectImage(index) {
      this.selectedImage = index
    },
    togglePopUpBag() {
      this.isPopUpVisible = !this.isPopUpVisible
    },
    addPlantToBag() {
      if (this.selectedPlant) {
        this.addPlantInBag(
          this.selectedPlant.id,
          this.currentCount,
          this.selectedPlant?.img[0],
          this.selectedPlant.name,
          this.selectedPlant.price,
          this.selectedPlant.name_en
        )
        this.togglePopUpBag()
      }
    },
    decrementCount() {
      if (this.currentCount > 1) {
        this.currentCount--
        this.updatePlantCount(this.plantId, this.currentCount)
      }
    },
    incrementCount() {
      if (this.currentCount < 10) {
        this.currentCount++
        this.updatePlantCount(this.plantId, this.currentCount)
      }
    },
    goToNextTab(tabIndex) {
      this.selectedTab = tabIndex
    }
  },
  watch: {
    count(newVal) {
      this.currentCount = newVal
    },

    '$route.params.id': 'fetchPlantData'
  },

  async created() {
    if (!localStorage.getItem('newsPlants')) {
      await this.getStatusPlants()
    }
  },
  async mounted() {
    await this.fetchPlantData()
  }
}
</script>

<style lang="scss" scoped>
.plant {
  // .plant__container
  &__container {
    margin-bottom: 160px;
    @media (min-width: $md) {
      margin-bottom: 220px;
    }
    @media (min-width: $lg) {
      max-width: 1448px;
      margin-bottom: 280px;
    }
  }
  // .plant__content
  &__content {
    display: flex;
    flex-direction: column;
    @media (min-width: $md) {
      flex-wrap: wrap;
      flex-direction: row;
      margin-bottom: 80px;
    }
    @media (min-width: $lg) {
      flex-wrap: nowrap;
    }
    @media (min-width: $xl) {
      margin-bottom: 120px;
    }
  }
  &__images {
    display: flex;
    height: 70px;
    gap: 16px;
    order: 2;
    padding: 0 60px;
    @media (min-width: $sm) {
      height: 140px;
    }
    @media (min-width: $md) {
      gap: 12px;
      order: 1;
      flex-direction: column;
      padding: 0;
      flex: 0 1 144px;
      height: auto;
    }
  }
  // .plant__image
  &__image {
    height: 100%;
    flex: 1 1 calc(33.33% - 16px);
    border-radius: 8px;
    opacity: 0.5;
    transition: $time;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }
    &.active {
      opacity: 1;
    }
    @media (min-width: $md) {
      // flex: 0 1 144px;
      // width: 144px;
      height: 220px;
    }
    @media (min-width: $lg) {
      &:not(:last-child) {
        margin-bottom: 12px;
      }
    }
  }
  &__overlay {
    position: fixed;
    z-index: 50;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100vw;
    height: 100vh;
  }
  // .plant__image-active
  &__image-active {
    order: 1;
    height: 360px;
    margin-bottom: 12px;
    @media (min-width: $sm) {
      padding: 0 30px;
      height: 520px;
    }

    & img {
      height: 100%;
      width: 100%;
      border-radius: 16px;
      object-fit: cover;
      @media (min-width: $lg) {
        border-radius: 24px;
      }
    }
    @media (min-width: $md) {
      padding: 0;
      margin-left: 10px;
      order: 3;
      flex: 1 0 400px;
      height: 584px;
      margin-bottom: 0;
    }

    @media (min-width: $lg) {
      flex: 1 1 672px;
      margin-left: 40px;
      height: 672px;
    }
  }
  // .plant__main
  &__main {
    order: 4;
    margin-top: 24px;
    margin-bottom: 48px;
    @media (min-width: $md) {
      margin: 24px 0 0 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    @media (min-width: $lg) {
      margin-top: 0;
      margin-left: 40px;
    }
    @media (min-width: $xl) {
      flex: 0 1 456px;
      margin-left: 120px;
      color: $secondary-black;
    }
  }
  &__newPlants,
  &__sales,
  &__top {
    width: 96px;
    height: 22px;
    text-transform: uppercase;
    font-weight: 600;
    color: $white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Lato';
    font-size: font-rem(10);
    border-radius: 4px;
    margin-bottom: 12px;
    @media (min-width: $sm) {
      font-size: font-rem(12);
      width: 110px;
      height: 26px;
    }
    @media (min-width: $lg) {
      width: 128px;
      font-size: font-rem(14);
      margin-bottom: 16px;
    }
  }
  &__newPlants {
    background-color: $green;
  }
  &__sales {
    background-color: $secondary-red;
  }
  &__top {
    background-color: $secondary-black;
  }
  // .plant__name
  &__name {
    display: inline-block;
    font-weight: 400;
    margin-bottom: 16px;
    font-size: font-rem(24);
    @media (min-width: $sm) {
      margin-bottom: 30px;
      font-size: font-rem(28);
    }
    @media (min-width: $lg) {
      font-size: font-rem(32);
      margin-bottom: 40px;
    }
  }
  // .plant__price
  &__height,
  &__category {
    display: block;
    font-family: 'Lato';
    font-size: font-rem(18);

    & span {
      margin-right: 8px;
      font-size: font-rem(20);
    }
  }
  &__price,
  &__height {
    margin-bottom: 12px;
    @media (min-width: $sm) {
      margin-bottom: 20px;
    }
    @media (min-width: $lg) {
      margin-bottom: 24px;
    }
  }
  &__price {
    font-weight: 600;
    display: flex;
    gap: 8px;
    font-size: font-rem(20);
    & span {
      font-weight: 400;
    }
  }
  &__counter {
    margin: 20px 0;
    @media (min-width: $sm) {
      margin: 40px 0;
    }
    @media (min-width: $lg) {
      margin: 80px 0;
    }
  }
  &__originalPrice {
    color: $secondary-black;
    text-decoration: line-through;
    margin-right: 16px;
  }
  // .plant__salesPrice
  &__salesPrice {
    color: $secondary-red;
    font-family: 'Roboto';
    font-weight: 700;
  }
}
.progressBar {
  order: 3;
  display: none;
  @media (min-width: $md) {
    display: block;
    order: 2;
    flex: 0 0 1px;
    margin-left: 16px;
    width: 1px;
    background-color: $grey;
    height: auto;
    overflow: hidden;
  }
  // @media (min-width: $lg) {
  //   height: 684px;
  // }

  // .progressBar__width
  &__width {
    @media (min-width: $md) {
      width: 100%;
      height: 0;
      background-color: $main-black;
      transition: height 0.3s ease;
    }
  }
}

.tab {
  // .tab__items
  &__items {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    font-size: font-rem(16);
    text-align: justify;
    @media (min-width: $lg) {
      margin-top: 72px;
      flex-wrap: wrap;
      flex-direction: row;
      row-gap: 40px;
      column-gap: 72px;
    }
  }
  // .tab__desc
  &__desc {
    flex: 1 1 calc(50% - 72px);
    &::first-letter {
      text-transform: uppercase;
    }
    & span {
      color: $secondary-black;
      font-weight: 700;
      display: block;
      margin-bottom: 10px;
      font-size: font-rem(20);
    }
    @media (min-width: $lg) {
      & span {
        font-size: font-rem(24);
        margin-bottom: 16px;
      }
    }
  }
}
.loader__wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader {
  width: 120px;
  height: 20px;
  border-radius: 20px;
  background: linear-gradient($orange 0 0) 0/0% no-repeat lightblue;
  animation: l2 2s infinite steps(10);
}
@keyframes l2 {
  100% {
    background-size: 110%;
  }
}
.actions {
  display: flex;
  width: 160px;
  height: 48px;
  justify-content: space-between;
  padding: 8px;
  border: 1px solid $grey;
  border-radius: 8px;

  &__btn {
    width: 100%;
    @media (min-width: $lg) {
      width: 320px;
    }
  }
  &__decrement,
  &__increment {
    border: none;
    position: relative;
    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
    &::before {
      position: absolute;
      top: 0;
      content: '';
      width: 32px;
      height: 32px;
    }
  }
  // .actions__decrement
  &__decrement {
    &::before {
      background-image: url('@/assets/images/counter/minus.svg');
      left: 0;
      width: 28px;
      height: 32px;
      margin-top: 4px;
    }
  }
  // .actions__count
  &__count {
    font-size: font-rem(20);
  }
  // .actions__increment
  &__increment {
    &::before {
      background-image: url('@/assets/images/counter/add.svg');
      right: 0;
    }
  }
}
</style>
