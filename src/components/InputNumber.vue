<template lang="pug">
  div
    input(type="number" v-model="internalValue" step="1" @input="onInputChanged($event)")
</template>

<script>
  export default {
    data() {
      return {
        internalValue: 0,
      };
    },
    props: {
      value: {
        type: String,
      },
      min: {
        type: Number,
        required: false,
      },
      max: {
        type: Number,
        required: false,
      },
    },
    methods: {
      onInputChanged(evt) {
        let tmpNumber = parseInt(evt.target.value, 10);
        if (isNaN(tmpNumber)) tmpNumber = 0;

        if (this.min) {
          if (tmpNumber < this.min) tmpNumber = this.min;
        }
        if (this.max) {
          if (tmpNumber > this.max) tmpNumber = this.max;
        }

        this.internalValue = tmpNumber.toString();
        this.$emit('input', tmpNumber.toString());
      },
    },
    created() {
      this.internalValue = this.value;
    },
  };
</script>

