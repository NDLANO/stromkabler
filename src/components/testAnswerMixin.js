export default {
  methods: {
    testAnswered() {
      this.$refs.leftIllustration.checkCorrect();
      this.$refs.rightIllustration.checkCorrect();
    },
  },
};
