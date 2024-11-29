<template>
  <RouterLink class="plant" :to="{ name: 'TheSinglePlantPage', params: { id: value.id } }">
    <div class="plant__img">
      <img
        :src="Array.isArray(value.img) ? value.img[0] : value.img"
        :alt="$i18n.locale === 'uk' ? value.name : value.name_en"
        :title="$i18n.locale === 'uk' ? value.name : value.name_en"
      />
      <TheLike
        :plantId="value.id"
        :plantImg="value?.img[0]"
        :plantName="value?.name"
        :plantPrice="value?.price"
        :plantNameEn="value?.name_en"
        class="plant__actions"
      />
      <ThePinned :plantId="value.id" />
    </div>

    <div class="plant__info">
      <div :to="{ name: 'TheSinglePlantPage', params: { id: value.id } }" class="plant__name">
        {{ $i18n.locale === 'uk' ? value.name : value.name_en }}
      </div>
      <span class="plant__price">{{ value?.price || value?.data }} ₴</span>
      <span class="plant__newArrivals">{{
        $i18n.locale === 'uk' ? value.status : value.status_en
      }}</span>
    </div>
  </RouterLink>
</template>

<script>
import TheLike from '../TheLike.vue'
import ThePinned from '../ThePinned.vue'

export default {
  name: 'TheSliderItem',
  components: {
    TheLike,
    ThePinned
  },
  props: {
    value: {
      type: Object,
      required: true
    },
    newArrivals: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.plant {
  font-family: 'Lato';
  font-size: font-rem(16);
  color: $secondary-black;
  margin-right: 0;

  // .plant__img
  &__img {
    height: 244px;
    width: 100%;
    position: relative;
    &:hover {
      .plant__actions {
        opacity: 1;
      }
    }
    @media (min-width: $sm) {
      height: 310px;
      width: 100%;
    }
    @media (min-width: $md) {
      height: 380px;
    }
    @media (min-width: $lg) {
      height: 480px;
    }
    @media (min-width: $xxl) {
      height: 480px;
    }
    & img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 8px;
      @media (min-width: $md) {
        border-radius: 16px;
      }
    }
  }

  &__actions {
    @media (min-width: $md) {
      transition: $time;
      opacity: 0;
    }
  }

  // .plant__name
  &__name {
    order: 2;
    display: block;
    font-weight: 500;
    margin: 8px 0;
    transition: $time;
    height: 40px;

    &:hover {
      color: $dark-purple-gray;
    }
    @media (min-width: $md) {
      margin: 16px 0;
    }
    @media (min-width: $lg) {
      order: 1;
      flex-basis: 100%;
    }
  }
  &__info {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    @media (min-width: $lg) {
      flex-wrap: wrap;
      flex-direction: row;
    }
  }
  &__newArrivals {
    order: 1;
    width: 57px;
    min-height: 18px;
    border-radius: 2px;
    background-color: $secondary-green;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: font-rem(8);
    color: $white;
    text-transform: uppercase;
    @media (min-width: $md) {
      border-radius: 4px;
      font-size: font-rem(14);
      width: 124px;
      height: 22px;
    }
    @media (min-width: $lg) {
      order: 3;
      flex-basis: 128px;
    }
  }
  &__price {
    order: 3;
    @media (min-width: $lg) {
      order: 2;
      flex-basis: 50%;
    }
  }
}
</style>
