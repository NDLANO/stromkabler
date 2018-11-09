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
        type: Number,
        default: 0,
      },
      length: {
        type: String,
        default: '0',
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

  // .ill-text-length {
  //   font-size: 150px;
  // }
</style>

