<template lang="pug">
    <div ref="app" id="app">
      .lo_mainContainer
        Header
        main
          .content-wrapper
            .content-wrapper-inner
              Illustration(:u1="selectedSpenning" :u2="u2" :deltaU="deltaU" :length="numberLengde" :tversnitt="selectedTversnitt")
              .controls
                div.col 
                  div.m-center <strong>{{ $t("general.powersource") }}</strong>
                    div
                      label U<sub>1</sub>
                      select(v-model="selectedSpenning" dir="rtl")
                        option(value="230") 230V
                        option(value="400") 400v
                div.col
                  div <strong>{{ $t("general.cable") }}</strong>
                  table
                    tr
                      td 
                        label.float-l {{ $t("general.crossSection") }} (A)
                      td
                        select.float-l(v-model="selectedTversnitt" dir="rtl")
                          option(v-for="value in tversnittValues" :value="value") {{ numToString(value) }}
                        div.float-l.pl-5 mm<sup>2</sup>
                    tr
                      td
                        label.float-l {{ $t("general.resistivity") }} (&rho;)
                      td
                        select.float-l(v-model="selectedResistivitet" dir="rtl")
                          option(value="0.0178") Cu 0,0178
                          option(value="0.0264") Al 0,0264
                        div.float-l.pl-5 &Omega;mm<sup>2</sup>/m
                    tr
                      td
                        label {{ $t("general.length") }} (l)
                      td
                        //- input(type="number" class="float-l mr-5" v-model="lengde" @input="onInputLengdeChanged")
                        InputNumber(class="float-l mr-5" v-model="lengde" :max="99")
                        //- <InputNumber class="float-l mr-5" v-model="lengde" :min="1" :max="99"/> 
                        div.float-l meter
                div.col 
                  div.m-center <strong>{{ $t("general.consumer") }}</strong>
                    div
                      label {{ $t("general.current")}} (I)
                      InputNumber(class="mr-5 inline-block" v-model="strom" :max="99")
                      //- <InputNumber class="mr-5 inline-block" v-model="strom" :min="1" :max="99"/>
                      div.inline-block A

              .formulas
                .delta-u
                  div <strong>{{ $t("general.calculation") }} &Delta;U:</strong>
                  .formula-wrapper
                    div &Delta;U
                    .equal =
                    div
                      .calculation
                        div.upper-calculation &rho; x 2 x l x I
                        .ta-center A 
                    .equal =
                    div ({{ selectedResistivitet }} x 2 x {{ lengde }} x {{ strom }})/2,5
                    .equal = 
                    div <strong>{{ deltaU }}</strong>
                .u2
                  div <strong>{{ $t("general.calculation") }} U<sub>2</sub>:</strong>
                  .formula-wrapper
                    div U<sub>2</sub>  
                    .equal =
                    div U<sub>1</sub> - &Delta;U 
                    .equal =
                    div {{ selectedSpenning }} - {{ deltaU }} 
                    .equal =
                    div <strong>{{ u2 }}</strong>
                    // hack
                    div.visibility-hidden
                      .calculation
                        div _
                        div _

              .warning.clearfix
                p.warning {{ $t("general.warning") }}

    </div>
</template>

<script>
  import Header from './components/Header';
  import Illustration from './components/Illustration';
  import InputNumber from './components/InputNumber';

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
      InputNumber,
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
        if (this.numberLengde > 0 && this.numberStrom > 0) {
          const tmpDeltaU = (
            this.selectedResistivitet *
            2 *
            this.numberLengde *
            this.numberStrom /
            this.selectedTversnitt
          ).toFixed(3);
          return tmpDeltaU;
        }
        return '0';
      },
      u2() {
        return (this.selectedSpenning - this.deltaU).toFixed(3);
      },
      numberLengde() {
        return parseInt(this.lengde, 10);
      },
      numberStrom() {
        return parseInt(this.strom, 10);
      },
    },
    watch: {},
    created() {
      console.clear();
    },
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

