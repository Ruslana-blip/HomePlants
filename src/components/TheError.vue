<template>
  <TheHeader />
  <div class="error">
    <div class="error__container">
      <div class="error__img">
        <img
          src="@/assets/images/error/404.png"
          alt="Cторінку не знайдено"
          title="Cторінку не знайдено"
        />
      </div>
      <div class="error__content">
        <h2 class="error__title">Ой, сторінку не знайдено!</h2>
        <div class="error__desc">
          <p>Можливо, вона була видалена або ніколи не існувала.</p>
          <p>Поверніться на головну та спробуйте знайти те, що шукаєте.</p>
        </div>

        <RouterLink :to="{ name: 'HomePage' }">
          <TheButtonOrange :width="280" :title="'На головну'" />
        </RouterLink>
      </div>
    </div>
  </div>
  <TheFooter />
</template>

<script>
import TheButtonOrange from './TheButtonOrange.vue'
import TheFooter from './TheFooter.vue'
import TheHeader from './TheHeader.vue'

export default {
  name: 'TheError',
  components: {
    TheButtonOrange,
    TheHeader,
    TheFooter
  }
}
</script>

<style lang="scss" scoped>
.error {
  margin: 40px 0 120px 0;
  @media (min-width: $md) {
    margin: 80px 0 260px 0;
  }
  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media (min-width: $md) {
      font-family: 'Lato';
      flex-direction: row;
      height: 528px;
    }
    @media (min-width: $xxl) {
      max-width: 1448px;
      margin: 0 auto;
    }
  }
  &__img {
    width: 209px;
    height: 144px;
    margin-bottom: 48px;
    & img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    @media (min-width: $md) {
      flex-basis: 50%;
      width: 100%;
      height: 100%;
    }
  }
  // .error__content
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media (min-width: $md) {
      flex-basis: 50%;
      margin-left: 80px;
    }
    @media (min-width: $xxl) {
      margin-left: 146px;
    }
  }
  // .error__title
  &__title {
    font-size: font-rem(24);
    font-weight: 700;
  }
  // .error__desc
  &__desc {
    margin: 24px 0 48px 0;
    text-align: center;
    & :first-child {
      margin-bottom: 8px;
      @media (min-width: $md) {
        margin-bottom: 0;
      }
    }
    @media (min-width: $md) {
      font-size: font-rem(18);
      margin-top: 16px;
    }
  }
}
</style>
