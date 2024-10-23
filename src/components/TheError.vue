<template>
  <div class="error">
    <div class="error__img">
      <img
        src="@/assets/images/error/404.png"
        alt="Cторінку не знайдено"
        title="Cторінку не знайдено"
      />
    </div>
    <div class="error__content">
      <h2 class="error__title">Ой, сторінку не знайдено!</h2>
      <p class="error__desc">
        Можливо, вона була видалена або ніколи не існувала.Поверніться на головну та спробуйте
        знайти те, що шукаєте.
      </p>

      <RouterLink :to="{ name: 'HomePage' }">
        <TheButtonOrange :width="273" :title="'На головну'" />
      </RouterLink>
    </div>
  </div>
</template>

<script>
import TheButtonOrange from './TheButtonOrange.vue'
export default {
  name: 'TheError',
  components: {
    TheButtonOrange
  }
}
</script>

<style lang="scss" scoped>
.error {
  font-family: 'Lato';
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  gap: 146px;
  // .error__content
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  // .error__title
  &__title {
    font-size: font-rem(24);
    font-weight: 700;
  }
  // .error__desc
  &__desc {
    font-size: font-rem(18);
    margin: 16px 0 48px 0;
    width: 536px;
    text-align: center;
  }
}
</style>
