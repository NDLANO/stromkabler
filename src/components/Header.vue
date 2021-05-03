<template lang="pug">
  header
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
