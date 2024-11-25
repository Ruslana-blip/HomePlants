<template>
  <div class="page">
    <TheHeader />
    <main class="page__main">
      <RouterView />
    </main>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
export default {
  name: 'MainLayout',
  components: {
    TheHeader,
    TheFooter
  }
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  &__main {
    margin-top: 50px;
    flex: 1 1 auto;
    @media (min-width: $md) {
      margin-top: 80px;
    }
    @media (min-width: $lg) {
      margin-top: 130px;
    }
  }
}
</style>
