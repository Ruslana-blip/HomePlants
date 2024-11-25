<template>
  <section class="oftenQuestions">
    <div class="oftenQuestions__container">
      <h2>{{ $t('faq') }}</h2>
      <div
        v-for="(tab, index) in tabs"
        :key="tab.title"
        :class="['oftenQuestions__item', { 'is-open': tab.isOpen }]"
        @click="toggleTab(index)"
      >
        <span class="oftenQuestions__title">{{ tab.title }}</span>
        <Transition>
          <div v-if="tab.isOpen" class="oftenQuestions__content">
            <p>{{ tab.content }}</p>
            <p v-if="tab.text">{{ tab.text }}</p>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TheOftenQuestions',
  data() {
    return {
      tabs: []
    }
  },
  watch: {
    '$i18n.locale'(newLocale) {
      this.updateTabs(newLocale)
    }
  },
  methods: {
    toggleTab(index) {
      this.tabs.forEach((tab, i) => {
        if (i !== index) {
          tab.isOpen = false
        }
      })
      this.tabs[index].isOpen = !this.tabs[index].isOpen
    },
    updateTabs(locale) {
      this.tabs = this.$i18n.messages[locale].tabs || []
    }
  },

  mounted() {
    this.updateTabs(this.$i18n.locale)
  }
}
</script>

<style lang="scss" scoped>
.oftenQuestions {
  margin-bottom: 172px;
  @media (min-width: $lg) {
    margin-bottom: 300px;
  }
  @media (min-width: $xxl) {
    margin-bottom: 428px;
  }
  // .oftenQuestions__container
  &__container {
    height: auto;
    @media (min-width: $lg) {
      max-width: 700px;
    }
    @media (min-width: $xl) {
      max-width: 1200px;
    }
    @media (min-width: $xxl) {
      max-width: 1448px;
    }
    & h2 {
      text-transform: uppercase;
      font-size: font-rem(28);
      font-weight: 400;
      margin-bottom: 40px;
      @media (min-width: $sm) {
        font-size: font-rem(34);
      }
    }
  }

  &__item {
    cursor: pointer;
    border-bottom: 2px solid $grey;
    &.is-open .oftenQuestions__title::before {
      transform: rotate(90deg);
    }
  }
  // .oftenQuestions__title
  &__title {
    display: flex;
    align-items: center;
    font-size: font-rem(20);
    height: 100px;
    position: relative;
    padding-right: 30px;
    transition: $time;
    &:hover {
      color: $dark-purple-gray;
    }
    &::before {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      transition: 0.2s;
      content: '';
      background-image: url('@/assets/images/qustions/arrow-right.svg');
      background-size: cover;
      background-position: center;
      width: 24px;
      height: 24px;
    }
    @media (min-width: $md) {
      font-size: font-rem(24);
      height: 93px;
    }
  }
  &__content {
    font-size: font-rem(16);
    font-family: 'Lato';
    max-width: 840px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 24px 0 32px 0;
    @media (min-width: $md) {
      font-size: font-rem(18);
    }
  }
}
// .v-enter-active,
// .v-leave-active {
//   transition:
//     opacity $time ease,
//     height $time ease; /* Додаємо height до transition */
// }

// .v-enter-from,
// .v-leave-to {
//   opacity: 0;
//   height: 0; /* Висота на початку анімації */
// }

// .v-enter-to,
// .v-leave-from {
//   /* Висота в кінці анімації */ /* Висота в кінці анімації */
// }
</style>
