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
  margin-bottom: 120px;
  @media (min-width: $lg) {
    margin-bottom: 210px;
  }
  @media (min-width: $xl) {
    margin-bottom: 280px;
  }
  // .about__container
  &__container {
    color: $secondary-black;
    display: flex;
    flex-direction: column;
    & h2 {
      order: 1;
      text-transform: uppercase;
      font-size: font-rem(28);
      font-weight: 400;
      @media (min-width: $sm) {
        font-size: font-rem(34);
      }
      @media (min-width: $lg) {
        font-size: font-rem(40);
      }
    }
  }
  // .about__content
  &__content {
    order: 3;
    gap: 72px;
    font-size: font-rem(16);
    font-family: 'lato';
    margin: 20px 0;
    @media (min-width: $lg) {
      font-size: font-rem(18);
      display: flex;
      justify-content: space-between;
      margin: 40px 0;
      order: 2;
    }
    & p {
      flex: 1 1 50%;
      &:not(:last-child) {
        margin-bottom: 12px;
        @media (min-width: $md) {
          margin-bottom: 20px;
        }
        @media (min-width: $lg) {
          margin-bottom: 0px;
        }
      }
    }
  }
  // .about__img
  &__img {
    margin-top: 40px;
    margin-bottom: 16px;
    order: 2;
    width: 100%;
    height: 412px;
    @media (min-width: $lg) {
      margin-top: 0;
      margin-bottom: 0;
      height: 640px;
      order: 3;
    }
    & img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
