<template lang="pug">
    <div ref="app" id="app">
      .lo_mainContainer
        Header
        main
          .content-wrapper
            .content-wrapper-inner
              Illustration(:u1="selectedSpenning" :u2="u2" :deltaU="deltaU" :length="lengde")
              .controls
                div.col 
                  div <strong>Strømkilde</strong>
                    div
                      label U<sub>1</sub>
                      select(v-model="selectedSpenning")
                        option(value="230") 230V
                        option(value="400") 400v
                div.col 
                  div <strong>Kabel</strong>
                    .clearfix
                      label.float-l Ledertverrsnitt (A)
                      select.float-l(v-model="selectedTversnitt")
                        option(v-for="value in tversnittValues" :value="value") {{ numToString(value) }}
                      div.float-l.pl-5 mm<sup>2</sup>
                    .clearfix
                      label.float-l Resesistivitet (&rho;)
                      select.float-l(v-model="selectedResistivitet")
                        option(value="0.0178") Cu 0,0178
                        option(value="0.0264") Al 0,0264
                      div.float-l.pl-5 &Omega;mm<sup>2</sup>/m
                    .clearfix
                      label Lengde (l)
                      <input v-model="lengde" type="number" min="1" maxlength="2" max="99" step="1"> meter
                div.col 
                  div <strong>Forbruker</strong>
                    div
                      label Strøm (I)
                      <input v-model="strom" type="number" min="1" maxlength="2" max="99" step="1"> A
              .formulas.clear-both
                p formula
              .warning
                p warning

    </div>
</template>

<script>
  import Header from './components/Header';
  import Illustration from './components/Illustration';

  export default {
    name: 'App',
    data() {
      return {
        selectedTversnitt: 1,
        tversnittValues: [1, 1.5, 2, 2.5, 4, 6],
        selectedResistivitet: 0.0178,

        lengde: '1',
        strom: '1',
        selectedSpenning: 230,
        dummyVariable: 'dummy',
      };
    },
    components: {
      Header,
      Illustration,
    },
    methods: {
      stringToNum(stringIn) {
        stringIn = stringIn.replace(',', '.');
        const num = Number(stringIn);
        return num;
      },
      numToString(numIn) {
        let str = numIn.toString();
        str = str.replace('.', ',');
        return str;
      },
    },
    computed: {
      deltaU() {
        const tmpLengde = this.stringToNum(this.lengde);
        const tmpStrom = this.stringToNum(this.strom);
        console.log(
          'tmpLengde = ' +
            tmpLengde +
            ', tmpStrom = ' +
            tmpStrom +
            ', resistivitet = ' +
            this.selectedResistivitet +
            ', tversnitt = ' +
            this.selectedTversnitt,
        );
        if (tmpLengde > 0 && tmpStrom > 0) {
          const tmpDeltaU = (this.selectedResistivitet * 2 * tmpLengde * tmpStrom / this.selectedTversnitt).toFixed(3);
          console.log('tmpDeltaU = ' + tmpDeltaU);
          console.log('tmpDeltaU type = ' + typeof tmpDeltaU);
          return tmpDeltaU;
          // return (this.selectedResistivitet * 2 * tmpLengde * tmpStrom / this.selectedTversnitt).toFixed(3);
        }
        return '0';
      },
      u2() {
        return this.selectedSpenning - this.deltaU;
      },
    },
    watch: {},
    created() {},
    mounted() {},
  };
</script>


<style lang="scss" scoped>
  // Scoped CSS only for this component

  @import './main';

  select {
    // display: block;
    // width: 15.75rem;
    // padding: 1.49219rem;
    margin-bottom: 10px;
    margin-top: 2px;
  }

  div.controls {
    label {
      padding-right: 10px;
    }

    select {
      font-size: 15px;
      // padding-right: 10px;
    }

    input {
      width: 3.5rem;
      text-align: center;
    }

    @include breakpoint($large) {
      display: flex;
      align-items: stretch;
    }

    & > .col {
      width: 100%;
      height: 100%;

      @include breakpoint($large) {
        &:nth-child(1) {
          width: 27%;
          // background-color: #f00;
        }
        &:nth-child(2) {
          width: 33%;
          // background-color: #0f0;
        }
        &:nth-child(3) {
          // (style="width: 33.8%; background-color: green;")
          width: 39.1%;
          // background-color: #00f;
        }
      }
    }
  }

  // .sikringsskap {
  //   float: left;
  //   text-align: center;
  // }

  // .panelovn {
  //   float: right;
  //   text-align: center;
  // }
</style>

<style lang="scss">
  @import 'main.scss';
</style>
