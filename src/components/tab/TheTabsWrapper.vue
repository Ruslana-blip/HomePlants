<template>
  <div class="tabs">
    <ul
      class="tabs__header"
      :style="{
        display: display,
        flexDirection: direction,
        borderBottom: borderWidth + 'px solid $grey',
        marginTop: margin + 'px',
        flexBasic: flex + 'px'
      }"
    >
      <li
        v-for="title in TabTitles"
        :key="title"
        :class="{ active: title === selectedTitle }"
        :style="{
          width: width + 'px',
          fontFamily: font,
          height: height + 'px',
          display: display,
          alignItems: center
        }"
        @click="selectTab(title)"
        class="tabs__item"
      >
        {{ title }}
      </li>
    </ul>
    <slot />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'TheTabsWrapper',
  data() {
    return {
      TabTitles: [],
      state: reactive({
        selectedTitle: ''
      })
    }
  },
  props: {
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
    }
  },
  computed: {
    selectedTitle() {
      return this.state.selectedTitle
    }
  },
  mounted() {
    if (this.$slots.default) {
      this.TabTitles = this.$slots.default().map((tab) => tab.props?.title)
      this.state.selectedTitle = this.TabTitles[0]
    }
  },
  methods: {
    selectTab(title) {
      this.state.selectedTitle = title
    }
  },
  provide() {
    return {
      ...toRefs(this.state)
    }
  }
}
</script>
<style lang="scss" scoped>
.tabs {
  // .tabs__header
  &__header {
  }
  &__item {
    border: none;
    font-size: font-rem(24);
    font-weight: 400;
    font-family: 'Georgia';
    color: $grey;
    transition: $time;
    display: inline-block;
    padding: 16px 12px;
    &.active {
      color: $secondary-black;
      border-bottom: 1px solid #000;
    }
  }
}
</style>
