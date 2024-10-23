<template>
  <section class="about">
    <div class="about__container">
      <h2>ПРО проєкт</h2>
      <div class="about__content">
        <p>
          Наш магазин кімнатних рослин — це турбота про вас і ваш простір. Ми віримо, що кожна
          рослина здатна приносити радість, затишок і гармонію в дім. Обираючи наші рослини, ви
          отримуєте не просто декор, а живого супутника, що даруватиме вам спокій та красу щодня.
        </p>
        <p>
          Від ніжних сукулентів до елегантних пальм — ми підберемо рослину, яка ідеально впишеться у
          ваш стиль житла. Ми завжди готові допомогти вам з порадами та доглядом, щоб ваш зелений
          куточок процвітав.
        </p>
      </div>
      <div class="about__img">
        <img src="@/assets/images/about/about.png" alt="Image flowers" title="Image flowers" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TheAbout'
}
</script>

<style lang="scss" scoped>
.about {
  margin-bottom: 100px;
  @media (min-width: $lg) {
    margin-bottom: 180px;
  }
  @media (min-width: $xl) {
    margin-bottom: 280px;
  }
  // .about__container
  &__container {
    color: $secondary-black;
    & h2 {
      text-transform: uppercase;
      font-size: font-rem(40);
      font-weight: 400;
    }
  }
  // .about__content
  &__content {
    gap: 72px;
    font-size: font-rem(18);
    font-family: 'lato';
    margin: 20px 0;
    @media (min-width: $lg) {
      display: flex;
      justify-content: space-between;
      margin: 40px 0;
    }
    & p {
      flex: 1 1 50%;
      &:not(:last-child) {
        margin-bottom: 20px;
      }
      @media (min-width: $lg) {
        margin-bottom: 0;
      }
    }
  }
  // .about__img
  &__img {
    width: 100%;
    max-height: 640px;
    & img {
      width: 100%;
      min-height: 200px;
    }
  }
}
</style>
