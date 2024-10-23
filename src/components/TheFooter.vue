<template>
  <section class="footer">
    <div class="footer__container">
      <div class="footer__wrapp">
        <span class="footer__logo">КВІТКАРКА</span>
        <span class="footer__desc"
          >Наші рослини надихають, наповнюють простір естетикою та затишком.</span
        >
      </div>
      <div class="footer__items">
        <div class="footer__item">
          <h3>Отримати допомогу</h3>
          <ul class="footer__list">
            <li>Доставка та оплата</li>
            <li>Повернення та обмін</li>
            <li>Підбір рослини</li>
          </ul>
        </div>
        <div class="footer__item">
          <h3>Навігація</h3>
          <ul class="footer__list">
            <li>Розпродаж</li>
            <li>Новинки</li>
            <li>Топ продажів</li>
            <li>Каталог</li>
          </ul>
        </div>
        <div class="footer__item">
          <h3>Контакти</h3>
          <ul class="footer__list">
            <li>+ 38 086 880 33 22</li>
            <li>+ 38 077 077 00 11</li>
            <li>+ 38 333 232 43 34</li>
          </ul>
        </div>
        <div class="footer__item">
          <h3>Підтримка</h3>
          <ul class="footer__list">
            <li>kvitkarka@gmail.com</li>
            <li>infokvitka@gmail.com</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  <section class="polite">
    <div class="polite__container">
      <div class="polite__wrapp">
        <div>
          <img src="@/assets/images/footer/icons_copyright.svg" alt="icon" title="icon" />
        </div>
        <span>Всі права захищені</span>
      </div>
      <div class="polite__items">
        <span>Умови використання</span>
        <span>Політика конфіденційності</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>

<style lang="scss" scoped>
.footer {
  background-color: $secondary-black;
  color: $secondary-white;
  // .footer__container
  &__container {
    display: flex;
    align-items: center;
    font-family: 'Lato';
    font-size: font-tem(18);
    font-weight: 400;
    height: 365px;
  }
  // .footer__wrapp
  &__wrapp {
    flex: 1 1 36%;
  }
  // .footer__logo
  &__logo {
    display: block;
    padding: 8px;
    font-family: 'Amatic';
    font-size: font-rem(40);
    color: $green;
  }
  // .footer__desc
  &__desc {
    max-width: 384px;
    margin-top: 24px;
    display: block;
  }
  // .footer__items
  &__items {
    display: flex;
    justify-content: space-between;
    flex: 1 1 64%;
  }
  // .footer__item
  &__item {
    & h3 {
      font-weight: 700;
      font-size: font-rem(18);
      margin-bottom: 24px;
    }
  }
  // .footer__list
  &__list {
    font-weight: 300;
    & li {
      &:not(:last-child) {
        margin-bottom: 16px;
      }
    }
  }
}
.polite {
  border-top: 1px solid $grey;
  border-bottom: 1px solid $grey;
  margin: 24px 0 0 0;
  // .polite__container
  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 66px;
    color: $grey;
    font-size: font-rem(12);
    font-family: 'Roboto';
  }
  // .polite__wrapp
  &__wrapp,
  &__items {
    display: flex;
  }
  &__wrapp {
    gap: 4px;
  }
  &__items {
    gap: 70px;
  }
}
</style>
