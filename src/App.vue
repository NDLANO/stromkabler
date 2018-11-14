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
                  div.m-center <strong>Strømkilde</strong>
                    div
                      label U<sub>1</sub>
                      select(v-model="selectedSpenning" dir="rtl")
                        option(value="230") 230V
                        option(value="400") 400v
                div.col
                  div <strong>Kabel</strong>
                  table
                    tr
                      td 
                        label.float-l Ledertverrsnitt (A)
                      td
                        select.float-l(v-model="selectedTversnitt" dir="rtl")
                          option(v-for="value in tversnittValues" :value="value") {{ numToString(value) }}
                        div.float-l.pl-5 mm<sup>2</sup>
                    tr
                      td
                        label.float-l Resesistivitet (&rho;)
                      td
                        select.float-l(v-model="selectedResistivitet" dir="rtl")
                          option(value="0.0178") Cu 0,0178
                          option(value="0.0264") Al 0,0264
                        div.float-l.pl-5 &Omega;mm<sup>2</sup>/m
                    tr
                      td
                        label Lengde (l)
                      td
                        <InputNumber class="float-l mr-5" v-model="lengde" :min="1" :max="99"/> 
                        div.float-l meter
                  //- div <strong>Kabel</strong>
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
                  div.m-center <strong>Forbruker</strong>
                    div
                      label Strøm (I)
                      <InputNumber class="mr-5 inline-block" v-model="strom" :min="1" :max="99"/>
                      div.inline-block A

              .formulas
                .delta-u
                  div <strong>Utregning &Delta;U:</strong>
                  .formula-wrapper
                    .value-sign <span style="padding-right: 8px">&Delta;U = </span>
                    div
                      .calculation
                        div.upper-calculation &rho; x 2 x l x I
                        .ta-center A 
                    div = ({{ selectedResistivitet }} x 2 x {{ lengde }} x {{ strom }})/2,5 = 
                    div <strong>{{ deltaU }}</strong>
                .u2
                  div <strong>Utregning U<sub>2</sub>:</strong>
                  .formula-wrapper
                    div U<sub>2</sub> = U<sub>1</sub> - &Delta;U = {{ selectedSpenning }} - {{ deltaU }} = <strong>{{ u2 }}</strong>

              //- .formulas.flex
                //- p formula
                .formula-wrapper.flex
                  .formula-left.flex
                    div <span style="padding-right: 10px">&Delta;U</span>= 
                    div
                      .calculation
                        div.upper-calculation &rho; x 2 x l x I
                        .ta-center A
                  .formula-right                  
                    p <strong>Utregning &Delta;U:</strong> <br>{{ deltaU }} = ({{ selectedResistivitet }} x 2 x {{ lengde }} x {{ strom }})/2,5   
                .formula-wrapper.flex
                  .formula-left
                    div U<sub>2</sub> = U<sub>1</sub> - &Delta;U
                  .formula-right
                    div
                      p <strong>Utregning U<sub>2</sub>:</strong> <br>{{ u2 }} = {{ selectedSpenning }} - {{ deltaU }}
                //- .row
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
                //- .row
                  .col
                    // TODO: This text should be styled like a warning box
                    p {{ $t('general.warning') }}                
              .warning.clearfix
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

        lengde: 1,
        strom: 1,
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
        if (this.lengde > 0 && this.strom > 0) {
          const tmpDeltaU = (this.selectedResistivitet * 2 * this.lengde * this.strom / this.selectedTversnitt).toFixed(3);
          return tmpDeltaU;
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

<style lang="scss">
  @import 'main.scss';
</style>

<style lang="scss" scoped>
  // Scoped CSS only for this component

  @import './main';

  .m-center {
    @include breakpoint($large) {
      width: 60%;
      margin: auto;
    }
  }
  .inline-block {
    display: inline-block;
  }

  select {
    // display: block;
    // width: 15.75rem;
    // padding: 1.49219rem;
    margin-top: 2px;
    margin-bottom: 0;
    background-color: $white;
    box-sizing: content-box;
    padding-top: 2px;
    padding-bottom: 2px;
    text-indent: 2px;
    border-radius: 0;

    @include breakpoint($large) {
      margin-bottom: 10px;
    }
  }

  div.controls {
    label {
      padding-right: 10px;
    }

    select {
      font-size: 15px;
      // padding-right: 10px;
      width: 5.2rem;
    }

    @include breakpoint($large) {
      display: flex;
      // align-items: stretch;
    }

    & > .col {
      width: 100%;
      // height: 100%;
      padding-bottom: 15px;

      @include breakpoint($large) {
        &:nth-child(1) {
          width: 27%;
          // background-color: #f00;
        }
        &:nth-child(2) {
          width: 35%;
          // background-color: #0f0;
        }
        &:nth-child(3) {
          // (style="width: 33.8%; background-color: green;")
          width: 35.1%;
          // background-color: #00f;
        }
      }
    }
  }

  td {
    vertical-align: bottom;
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

