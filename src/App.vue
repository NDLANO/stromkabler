<template lang="pug">
    <div ref="app" id="app">
      .lo_mainContainer
        Header
        main
          .container
            .row.align-items-center
              // sikringsskap
              .col-12.col-sm 
                .row
                  .col-8.col-sm-12
                    img(src="@/assets/sikringsskap.svg")
                  .col-4.col-sm-12.d-block.d-sm-none
                    div
                      label U<sub>1</sub>
                      select(v-model="selectedSpenning")
                        option(value="230") 230V
                        option(value="400") 400v
              // kabel
              .col-12.col-sm
                .row
                  .col.d-block.d-sm-none
                    div
                      label.float-l Ledertverrsnitt (A)
                      select.float-l(v-model="selectedTversnitt")
                        option(v-for="value in tversnittValues" :value="value") {{ numToString(value) }}
                      div.float-l mm<sup>2</sup>
                    div.clear-both
                      label.float-l Resesistivitet (&rho;)
                      select.float-l(v-model="selectedResistivitet")
                        option(value="0.0178") Cu 0,0178
                        option(value="0.0264") Al 0,0264
                      div.float-l &Omega;mm<sup>2</sup>/m
                    .clear-both
                      label Lengde (l)
                      <input v-model="lengde"> meter
              // panelovn
              .col-12.col-sm
                .row
                  .col-8.col-sm-12
                    img(src="@/assets/panelovn.svg")
                  .col-4.col-sm-12.d-block.d-sm-none
                    div
                      label Strøm (I)
                      <input v-model="strom"> A
            // kontroller under
            .row.d-none.d-sm-flex
              .col
                div.ta-center
                  label U<sub>1</sub>
                  select(v-model="selectedSpenning")
                    option(value="230") 230V
                    option(value="400") 400v

              .col
                div
                  label.float-l Ledertverrsnitt (A)
                  select.float-l(v-model="selectedTversnitt")
                    option(v-for="value in tversnittValues" :value="value") {{ numToString(value) }}
                  div.float-l mm<sup>2</sup>
                div
                  label.float-l Resesistivitet (&rho;)
                  select.float-l(v-model="selectedResistivitet")
                    option(value="0.0178") Cu 0,0178
                    option(value="0.0264") Al 0,0264
                  div.float-l &Omega;mm<sup>2</sup>/m
                .clear-both
                  label Lengde (l)
                  <input v-model="lengde"> meter
              .col
                div.ta-center
                  label Strøm (I)
                  <input v-model="strom"> A
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

  export default {
    name: 'App',
    data() {
      return {
        selectedTversnitt: 1,
        tversnittValues: [1, 1.5, 2, 2.5, 4, 6],
        selectedResistivitet: 0.0178,

        lengde: '',
        strom: '3',
        selectedSpenning: 230,
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
      numToString(numIn) {
        let str = numIn.toString();
        str = str.replace('.', ',');
        return str;
      },
    },
    computed: {
      u() {
        const tmpLengde = this.stringToNum(this.lengde);
        const tmpStrom = this.stringToNum(this.strom);
        console.log('tmpLengde = ' + tmpLengde + ', tmpStrom = ' + tmpStrom);
        if (tmpLengde > 0 && tmpStrom > 0) {
          return (this.selectedResistivitet * 2 * tmpLengde * tmpStrom / this.selectedTversnitt).toFixed(3);
        }
        return 0;
      },
      u2() {
        return this.selectedSpenning - this.u;
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

  .container {
    padding-top: 30px;
  }

  input {
    width: 2em;
    text-align: center;
  }

  // helpers
  .float-l {
    float: left;
  }

  .clear-both {
    clear: both;
  }

  .ta-center {
    text-align: center;
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
