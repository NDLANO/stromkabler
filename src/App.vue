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
                      <input v-model="lengde"> meter
                div.col 
                  div <strong>Forbruker</strong>
                    div
                      label Strøm (I)
                      <input v-model="strom"> A

              .formulas.clear-both
                p formula
              .warning
                p warning
      //-   main
          Illustration(:u1="selectedSpenning" :u2="u2" :deltaU="deltaU" :length="lengde")
          //- .container-fluid
            .row.align-items-center
              .col-12
                //- img(src="@/assets/sk_horizontal.svg")
              .col-12
                .row
                  .col-12.col-sm-3
                    div
                      label U<sub>1</sub>
                      select(v-model="selectedSpenning")
                        option(value="230") 230V
                        option(value="400") 400v
                  .col-12.col-sm-6
                    div.wire-wrapper
                      .clear-both
                        label.float-l Ledertverrsnitt (A)
                        select.float-l(v-model="selectedTversnitt")
                          option(v-for="value in tversnittValues" :value="value") {{ numToString(value) }}
                        div.float-l mm<sup>2</sup>
                      .clear-both
                        label.float-l Resesistivitet (&rho;)
                        select.float-l(v-model="selectedResistivitet")
                          option(value="0.0178") Cu 0,0178
                          option(value="0.0264") Al 0,0264
                        div.float-l &Omega;mm<sup>2</sup>/m
                      .clear-both
                        label Lengde (l)
                        <input v-model="lengde"> meter
                  .col-12.col-sm-3
                    div
                      label Strøm (I)
                      <input v-model="strom"> A
            .row
              .col-12
                .formula-wrapper
                  .float-l <span style="padding-right: 10px">&Delta;U</span>= 
                  .float-l 
                    .calculation
                      div.upper-calculation &rho; x 2 x l x I
                      .ta-center A
                  .float-l.ml-30
                    .row
                      .col
                        p <strong>Utregning &Delta;U:</strong> <br>{{ deltaU }} = ({{ selectedResistivitet }}) x 2 x {{ lengde }} x {{ strom }})/2,5
              .col-12
                .formula-wrapper
                  .float-l U<sub>2</sub> = U<sub>1</sub> - &Delta;U
                  .float-l.ml-30
                    .row
                      .col
                        p <strong>Utregning U<sub>2</sub>:</strong> <br>{{ u2 }} = {{ selectedSpenning }} - {{ deltaU }}
            .row
              .col
                // TODO: This text should be styled like a warning box
                p {{ $t('general.warning') }}


          //- .content-wrapper
          //-   .lo_constrainedContainer.container
          //-     .left-right.sikringsskap
          //-       img(src="@/assets/sikringsskap.svg")
          //-     .middle
          //-       div
          //-         label.float-l Ledertverrsnitt (A)
          //-         select.float-l(v-model="selectedTversnitt")
          //-           option(v-for="value in tversnittValues" :value="value") {{ numToString(value) }}
          //-         div.float-l mm<sup>2</sup>
          //-       div
          //-         label.float-l Resesistivitet (&rho;)
          //-         select.float-l(v-model="selectedResistivitet")
          //-           option(value="0.0178") Cu 0,0178
          //-           option(value="0.0264") Al 0,0264
          //-         div.float-l &Omega;mm<sup>2</sup>/m
          //-       div
          //-         label Lengde (l)
          //-         <input v-model="lengde"> meter
          //-     .left-right.panelovn   
          //-       img(src="@/assets/panelovn.svg")
          //-       div
          //-         label Strøm (I)
          //-         <input v-model="strom"> A
              //- br
              //- br
              //- .u-value &Delta;U = {{ u }}
              //- .u2-value U<sub>2</sub> = {{ u2 }}
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
  // .lo_constrainedContainer {
  //   display: flex;
  //   align-items: center;

  //   .middle {
  //     width: 40%;
  //   }
  //   .left-right {
  //     width: 30%;
  //   }
  // }

  @import './main';

  // .container-fluid {
  //   padding-top: 30px;
  //   max-width: 1000px;
  // }

  // input {
  //   width: 2em;
  //   text-align: center;
  // }

  // .formula-wrapper {
  //   display: flex;
  //   & > div {
  //     align-self: center;
  //     // background-color: red;
  //   }

  //   .calculation {
  //     padding-left: 10px;
  //   }
  //   .upper-calculation {
  //     border-bottom: 2px solid $dark-grey;
  //     padding-left: 5px;
  //     padding-right: 5px;
  //   }
  // }

  div.controls {
    // display: flex;
    // .col {
    //   float: left;
    // }

    label {
      padding-right: 10px;
    }

    select {
      font-size: 15px;
      // padding-right: 10px;
    }

    input {
      width: 2.3rem;
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
