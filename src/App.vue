<template lang="pug">
    <div ref="app" id="app">
        h1 {{ $t("general.heading")}}

        .u-value U = {{ u }}
        .u2-value U2 = {{ u2 }}
    </div>
</template>

<script>
  import Header from './components/Header';

  export default {
    name: 'App',
    data() {
      return {
        tversnitt: 1.5,
        resistivitet: 0.0178,
        lengde: '10',
        strom: '3',
        spenning: 230,
        dummyVariable: 'dummy',
      };
    },
    components: {
      Header,
    },
    methods: {
      stringToNum(stringIn) {
        stringIn = stringIn.replace(',', '.');
        const num = Number(stringIn);
        return num;
      },
    },
    computed: {
      u() {
        const tmpLengde = this.stringToNum(this.lengde);
        const tmpStrom = this.stringToNum(this.strom);
        console.log('tmpLengde = ' + tmpLengde + ', tmpStrom = ' + tmpStrom);
        if (tmpLengde > 0 && tmpStrom > 0) {
          return (this.resistivitet * 2 * tmpLengde * tmpStrom / this.tversnitt).toFixed(3);
        }
        return 0;
      },
      u2() {
        return this.spenning - this.u;
      },
    },
    watch: {},
    created() {},
    mounted() {},
  };
</script>


<style lang="scss" scoped>
  // Scoped CSS only for this component
</style>

