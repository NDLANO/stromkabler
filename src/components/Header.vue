<template lang="pug">
  header
      //- button.btn-menu(@click="toggleMobileMenu")
        <svg-icon name="icon-menu" size="32"></svg-icon>
      h1.header_title {{ $t('general.heading')}}             
</template>

<script>
  export default {
    methods: {
      toggleMobileMenu() {
        console.log('Header.toggleMobileMenu');
        this.$emit('toggleMobileMenu');
      },
    },
  };
</script>

<style lang="scss">
</style>
