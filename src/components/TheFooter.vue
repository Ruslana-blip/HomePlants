<template>
  <section class="footer">
    <div class="footer__container">
      <div class="footer__wrapp">
        <span class="footer__logo">КВІТКАРКА</span>
        <span class="footer__desc">{{ $t('footer-desc') }}</span>
      </div>
      <div class="footer__items">
        <div class="footer__item">
          <h3>{{ $t('footer-help') }}</h3>
          <ul class="footer__list">
            <li>{{ $t('f-pay-del') }}</li>
            <li>{{ $t('f-return') }}</li>
            <li>{{ $t('f-selection') }}</li>
            <li>{{ $t('blog') }}</li>
          </ul>
        </div>
        <div class="footer__item">
          <h3>{{ $t('footer-navigation') }}</h3>
          <ul class="footer__list">
            <li>{{ $t('sale') }}</li>
            <li>{{ $t('novelty') }}</li>
            <li>{{ $t('top-sales') }}</li>
            <li>{{ $t('catalog') }}</li>
          </ul>
        </div>
        <div class="footer__item">
          <h3>{{ $t('footer-contact') }}</h3>
          <ul class="footer__list">
            <li>+ 38 086 880 33 22</li>
            <li>+ 38 077 077 00 11</li>
            <li>+ 38 333 232 43 34</li>
          </ul>
        </div>
        <div class="footer__item">
          <h3>{{ $t('footer-support') }}</h3>
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
        <span>{{ $t('f-reserved') }}</span>
      </div>
      <div class="polite__items">
        <span>{{ $t('f-terms') }}</span>
        <span>{{ $t('f-policy') }}</span>
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
    font-family: 'Lato';
    font-weight: 400;
    @media (min-width: $lg) {
      display: flex;
      align-items: center;
      height: 365px;
      font-size: font-rem(18);
    }
  }
  // .footer__wrapp
  &__wrapp {
    @media (min-width: $sm) {
      text-align: center;
    }
    @media (min-width: $lg) {
      text-align: left;
      flex: 1 1 36%;
    }
  }
  // .footer__logo
  &__logo {
    display: block;
    padding: 8px;
    font-family: 'Amatic';
    font-size: font-rem(40);
    color: $green;
    margin-top: 40px;
    @media (min-width: $lg) {
      margin-top: 0;
    }
  }

  // .footer__desc
  &__desc {
    max-width: 384px;
    margin-top: 16px;
    display: block;
    @media (min-width: $sm) {
      margin: 0 auto;
    }
    @media (min-width: $lg) {
      margin-top: 24px;
    }
    @media (min-width: $xxl) {
      margin: 24px 0 0 0;
    }
  }
  // .footer__items
  &__items {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    row-gap: 40px;
    column-gap: 16px;
    margin-top: 32px;
    padding-bottom: 40px;
    @media (min-width: $lg) {
      flex: 1 1 64%;
      flex-wrap: nowrap;
      margin-top: 0;
      row-gap: 0;
      column-gap: 0;
      margin-bottom: 0;
    }
  }
  // .footer__item
  &__item {
    flex-basis: calc(50% - 16px);
    @media (min-width: $sm) {
      text-align: center;
    }
    @media (min-width: $lg) {
      flex-basis: 0%;
      text-align: left;
      flex-basis: calc(25% - 16px);
    }
    & h3 {
      font-weight: 700;
      font-size: font-rem(16);
      margin-bottom: 24px;
      @media (min-width: $lg) {
        font-size: font-rem(18);
      }
    }
  }
  // .footer__list
  &__list {
    font-weight: 300;
    & li {
      font-size: font-rem(14);
      &:not(:last-child) {
        margin-bottom: 16px;
      }
      @media (min-width: $md) {
        font-size: font-rem(16);
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
    flex-direction: column;
    height: 66px;
    color: $grey;
    font-size: font-rem(12);
    font-family: 'Roboto';
    @media (min-width: $md) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
  // .polite__wrapp
  &__wrapp,
  &__items {
    display: flex;
  }
  &__wrapp {
    justify-content: center;
    gap: 4px;
    margin: 16px 0;
    @media (min-width: $md) {
      margin: 0;
    }
  }
  &__items {
    flex-direction: row;
    justify-content: space-between;
    @media (min-width: $md) {
      gap: 70px;
    }
  }
}
</style>
