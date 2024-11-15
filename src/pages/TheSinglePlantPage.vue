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
            <img :src="img" :alt="selectedPlant?.name" :title="selectedPlant?.name" />
          </div>
        </div>
        <div class="progressBar" v-if="selectedPlant?.img.length">
          <div class="progressBar__width" :style="{ height: progressBarHeight + 'px' }"></div>
        </div>
        <div v-if="selectedImage !== null" class="plant__image-active">
          <img
            :src="selectedPlant?.img[selectedImage]"
            :alt="selectedPlant?.name"
            :title="selectedPlant?.name"
          />
        </div>
        <div class="plant__main">
          <span :class="getStatusClass(selectedPlant?.status)">{{ selectedPlant?.status }}</span>
          <span class="plant__name">{{ selectedPlant?.name }}</span>
          <div class="plant__price">
            Ціна:
            <div v-if="selectedPlant?.status === 'Розпродаж'">
              <span class="plant__originalPrice"> {{ selectedPlant?.price }} ₴ </span>
              <span class="plant__salesPrice"> {{ selectedPlant?.price * 0.7 }} ₴ </span>
            </div>
            <div v-else>
              <span>{{ selectedPlant?.price }} ₴</span>
            </div>
          </div>
          <span class="plant__height"><span>Висота</span>: {{ selectedPlant?.height }} см</span>
          <span class="plant__category"><span>Категорія:</span> {{ selectedPlant?.category }}</span>
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
          <TheButtonOrange @click="addPlantToBag" :title="titleButton" :width="320" />
        </div>
      </div>
      <div v-if="isPopUpVisible" class="plant__overlay">
        <PopUpBag :isPopUpVisible="isPopUpVisible" :togglePopUpBag="togglePopUpBag" />
      </div>
      <TheTabsWrapper class="tab" :borderWidth="Number(1)">
        <TheTab title="ХАРАКТЕРИСТИКИ" class="tab__items"
          ><p class="tab__desc">{{ selectedPlant?.desc }}</p>
          <p class="tab__desc">{{ selectedPlant?.conditionsСare }}</p></TheTab
        >
        <TheTab title="ДОГЛЯД" class="tab__items">
          <div class="tab__desc">
            <span>Тип ґрунту:</span>
            <p>{{ this.selectedPlant?.soilType }}</p>
          </div>
          <div class="tab__desc">
            <span>Світло:</span>
            <p>{{ this.selectedPlant?.lightRequirement }}</p>
          </div>
          <div class="tab__desc">
            <span>Температура:</span>
            <p>{{ this.selectedPlant?.temperature }}</p>
          </div>
          <div class="tab__desc">
            <span>Вологість:</span>
            <p>{{ this.selectedPlant?.humidityLevel }}</p>
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
      titleButton: 'ДОДАТИ В КОШИК',
      isPopUpVisible: false,
      loading: true,
      currentCount: 1
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
          this.selectedPlant.price
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
    max-width: 1448px;
    margin-bottom: 280px;
  }
  // .plant__content
  &__content {
    display: flex;
    margin-bottom: 120px;
  }
  // .plant__image
  &__image {
    flex: 0 0 144px;
    width: 144px;
    height: 220px;
    border-radius: 8px;
    opacity: 0.5;
    transition: $time;
    &:not(:last-child) {
      margin-bottom: 12px;
    }
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }
    &.active {
      opacity: 1;
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
    flex: 1 0 672px;
    height: 684px;
    margin-left: 40px;
    & img {
      height: 100%;
      width: 100%;
      border-radius: 24px;
      object-fit: cover;
    }
  }
  // .plant__main
  &__main {
    flex: 0 0 456px;
    margin-left: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: $secondary-black;
  }
  &__newPlants,
  &__sales,
  &__top {
    width: 128px;
    height: 26px;
    text-transform: uppercase;
    font-weight: 600;
    color: $white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Lato';
    font-size: font-rem(14);
    border-radius: 4px;
    margin-bottom: 16px;
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
    font-size: font-rem(32);
    font-weight: 400;
    margin-bottom: 40px;
  }
  // .plant__price
  &__height,
  &__category {
    font-family: 'Lato';
    font-size: font-rem(20);

    & span {
      margin-right: 8px;
      font-weight: 600;
    }
  }
  &__price,
  &__height {
    margin-bottom: 24px;
  }
  &__price {
    display: flex;
    gap: 8px;
    font-weight: 600;
    font-size: font-rem(20);
  }
  &__counter {
    margin: 80px 0;
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
  flex: 0 0 1px;
  margin-left: 16px;
  width: 1px;
  background-color: $grey;
  height: 684px;
  overflow: hidden;
  // .progressBar__width
  &__width {
    width: 100%;
    height: 0;
    background-color: $main-black;
    transition: height 0.3s ease;
  }
}

.tab {
  // .tab__items
  &__items {
    margin-top: 72px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    row-gap: 40px;
    column-gap: 72px;
  }
  // .tab__desc
  &__desc {
    flex: 1 1 calc(50% - 72px);
    &::first-letter {
      text-transform: uppercase;
    }
    & span {
      font-size: font-rem(24);
      color: $secondary-black;
      font-weight: 700;
      display: block;
      margin-bottom: 16px;
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
