<template>
  <RouterView />
</template>

<script>
export default {
  name: 'App',
  watch: {
    '$i18n.locale'(newLocale) {
      localStorage.setItem('locale', newLocale)
    }
  }
}
</script>

<style lang="scss" scoped></style>
