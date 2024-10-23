<template>
  <section class="oftenQuestions">
    <div class="oftenQuestions__container">
      <h2>Часті запитання</h2>
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
            <p v-if="tab.text">{{ tab?.text }}</p>
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
      tabs: [
        {
          title: 'Чи можлива доставка поштою у інше місто?',
          content:
            'Ні, доставка поштою в інші міста не передбачена. Ви можете забрати своє замовлення лише через самовивіз з наших точок видачі. ',
          text: 'В місті діє 3 зручних пункти самовивозу, де ви можете отримати ваше замовлення.',
          isOpen: false
        },
        {
          title: 'Які способи оплати доступні?',
          content:
            'Оплата здійснюється виключно готівкою при отриманні товару в одній з наших точок видачі. Інші способи оплати наразі не підтримуються.',
          isOpen: false
        },
        {
          title: 'Чи надаєте ви гарантію на придбані рослини?',
          content:
            "Так, ми надаємо гарантію на всі придбані рослини терміном на 2 тижні з моменту покупки. Якщо протягом цього часу з рослиною виникають проблеми, ми готові запропонувати заміну або повернення коштів.Також при покупці ви отримуєте рекомендації з догляду за рослиною, щоб забезпечити їй оптимальні умови для зростання. Наші поради допоможуть вам уникнути типових помилок і зберегти здоров'я рослини на довгі роки.",
          text: "Також при покупці ви отримуєте рекомендації з догляду за рослиною, щоб забезпечити їй оптимальні умови для зростання. Наші поради допоможуть вам уникнути типових помилок і зберегти здоров'я рослини на довгі роки.",
          isOpen: false
        },
        {
          title: 'Чи можна пересаджувати рослину одразу після покупки?',
          content:
            'Ми не рекомендуємо пересаджувати рослину одразу після покупки. Після зміни середовища рослині потрібен час для адаптації до нових умов.',
          text: 'Оптимально дати рослині 1-2 тижні для звикання до нового місця, після чого можна планувати пересадку. Якщо горщик замалий або ґрунт не підходить, пересадку можна зробити раніше, але слід бути дуже обережними, щоб не пошкодити кореневу систему.',
          isOpen: false
        },
        {
          title: 'Чи надаєте ви послуги виїзного догляду за кімнатними рослинами?',
          content:
            'Так, ми надаємо послуги виїзного догляду за кімнатними рослинами. Наші фахівці з радістю допоможуть вам підтримувати ваші рослини у здоровому стані, здійснивши всі необхідні процедури: полив, підживлення, обрізку, пересадку та лікування рослин при потребі.',
          text: 'Ми забезпечимо індивідуальний підхід до кожної рослини, враховуючи її особливості та потреби. Ця послуга зручна для тих, хто хоче бути впевненим, що їхні зелені улюбленці отримують професійний догляд навіть без вашої постійної участі.',
          isOpen: false
        }
      ]
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
    }
  }
}
</script>

<style lang="scss" scoped>
.oftenQuestions {
  margin-bottom: 200px;
  @media (min-width: $xl) {
    margin-bottom: 280px;
  }
  // .oftenQuestions__container
  &__container {
    max-width: 1448px;
    height: auto;
  }
  & h2 {
    text-transform: uppercase;
    font-size: font-rem(48);
    font-weight: 400;
    margin-bottom: 20px;
    @media (min-width: $xl) {
      margin-bottom: 40px;
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
    font-size: font-rem(24);
    height: 93px;
    position: relative;
    padding-right: 20px;
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
  }
  &__content {
    font-size: font-rem(18);
    font-family: 'Lato';
    max-width: 840px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 24px 0 32px 0;
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
