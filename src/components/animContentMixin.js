export default {
  data() {
    return {
      animation: null,
      animationPlaying: false,
    };
  },
  methods: {
    playSegment(event) {
      console.log('Content.playSequence: event = ', event);
      this.animationPlaying = true;
      this.animation.playSegments(event.segment, true);
      if (event.textToShow) this.activeText = event.textToShow;
    },
    playCompleteAnimation() {
      this.animationPlaying = true;
      this.animation.play();
    },
    setLoop(loopValue) {
      this.animation.loop = loopValue;
    },
    setFrame(startFrame) {
      console.log('setting startFrame: ', startFrame);
      this.animation.goToAndStop(startFrame, true);
    },
  },
  mounted() {
    // console.log('ref = ', this.$refs.anim);
    this.animation = window.lottie.loadAnimation({
      container: this.$refs.anim,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: this.animationFileName,
    });

    this.animation.addEventListener('complete', () => {
      console.log(
        'anim complete, status = ' +
          this.status +
          ', frame = ' +
          this.animation.currentRawFrame,          
      );
      this.animationPlaying = false;
      this.$emit('contentTaskFinished');
    });

    // Spill av animasjonen når den er lastet i dom
    this.animation.addEventListener('DOMLoaded', () => {
      console.log('dom ready');
      const svg = this.$el.getElementsByTagName('svg')[0];

      let titleID = '';
      let descID = '';

      if (this.svgDescription) {
        const description = document.createElementNS('http://www.w3.org/2000/svg', 'desc');
        description.textContent = this.svgDescription;
        descID = Math.random().toString();
        description.setAttribute('id', descID);
        svg.prepend(description);
      }
      if (this.svgTitle) {
        const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        title.textContent = this.svgTitle;
        titleID = Math.random().toString();
        title.setAttribute('id', titleID);
        svg.prepend(title);
      }
      svg.setAttribute('aria-labelledby', titleID + descID);
      svg.setAttribute('role', 'img');

      this.status = this.animFileName;
      this.$emit('animationPlaying');
    });
  },
};
