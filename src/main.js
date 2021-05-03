// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Svgxuse from 'svgxuse'; // A simple polyfill that fetches external SVGs referenced in <use> elements when the browser itself fails to do so.
import VueSVGCustomIcon from 'vue-svg-custom-icon'; // A lightweight component with no dependecy to allow use of custom SVG icons in your Vue.js application based on SVG sprite.
import App from './App';

Vue.config.productionTip = false;

Vue.use(VueI18n);
Vue.use(VueSVGCustomIcon, { basePath: './static' });
Vue.use(Svgxuse);

// Make messages locale object
const messages = {
  no: window.elektrolyseDictionary,
};

const i18n = new VueI18n({
  locale: 'no',
  messages,
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  components: { App },
  template: '<App/>',
});
