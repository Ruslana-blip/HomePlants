<template>
  <div class="tabs">
    <ul
      class="tabs__header"
      :style="{
        display: display,
        flexDirection: direction,
        borderBottom: borderWidth + 'px solid $grey',
        marginTop: margin + 'px',
        flexBasis: flex + 'px',
        borderBottom: border
      }"
    >
      <li
        v-for="(title, index) in TabTitles"
        :key="title"
        :class="{ active: index === selectedTab }"
        :style="{
          width: width + 'px',
          fontFamily: font,
          height: height + 'px',
          display: display,
          alignItems: center
        }"
        @click="selectTab(index)"
        class="tabs__item"
      >
        {{ title }}
      </li>
    </ul>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'TheTabsWrapper',
  props: {
    selectedTab: {
      type: Number,
      required: true
    },
    width: {
      type: Number
    },
    display: {
      type: String
    },
    direction: {
      type: String
    },
    font: {
      type: String
    },
    borderWidth: {
      type: Number,
      default: 0
    },
    height: {
      type: Number
    },
    center: {
      type: String
    },
    margin: {
      type: Number
    },
    flex: {
      type: Number
    },
    border: {
      type: String
    }
  },
  data() {
    return {
      TabTitles: []
    }
  },
  mounted() {
    if (this.$slots.default) {
      this.TabTitles = this.$slots.default().map((tab) => tab.props?.title)
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.TabTitles = this.$slots.default().map((tab) => tab.props?.title)
    }
  },
  methods: {
    selectTab(index) {
      this.$emit('updateTab', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  // .tabs__header
  &__header {
    flex-wrap: wrap;
    border-bottom: 1px solid $grey;
    margin-top: 0;
    @media (min-width: $md) {
      flex-direction: column;
    }
  }
  &__item {
    display: inline-block;
    color: $grey;
    border-bottom: 1px solid transparent;
    font-size: font-rem(18);
    padding: 8px 18px;
    transition: $time;
    &:last-child {
      border-top: none;
    }
    &.active {
      color: $secondary-black;
      border-bottom-color: $secondary-black;
    }
    @media (min-width: $sm) {
      padding: 8px 28px;
      font-size: font-rem(20);
    }
    @media (min-width: $md) {
      min-width: 240px;
      font-size: font-rem(24);
      font-weight: 400;
      font-family: 'Georgia';
      color: $grey;
      padding: 16px 12px;
    }
  }
}
</style>
