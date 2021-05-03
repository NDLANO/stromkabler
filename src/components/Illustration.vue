<template src="./Illustration.html"></template>

<script>
  export default {
    props: {
      u1: {
        type: Number,
        default: 230,
      },
      u2: {
        type: Number,
        default: 230,
      },
      deltaU: {
        type: String,
      },
      length: {
        type: Number,
      },
      tversnitt: {
        type: Number,
      },
    },
    computed: {
      validatedLength() {
        if (this.length === '') return '0';

        return this.length;
      },
    },
  };
</script>


<style lang="scss" scoped>
  .ill-text {
    font-weight: bold;
    font-size: 110px;
  }
  .ill-text-sikringsskap,
  .ill-text-ovn {
    .sub {
      font-size: 65px;
    }
  }

  .ill-text {
    user-select: all;
  }

</style>

