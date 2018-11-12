// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Svgxuse from 'svgxuse'; // A simple polyfill that fetches external SVGs referenced in <use> elements when the browser itself fails to do so.
import { InputNumber } from 'iview';
// import { Checkbox, CheckboxGroup, Step, Steps, InputNumber } from 'element-ui';
import VueSVGCustomIcon from 'vue-svg-custom-icon'; // A lightweight component with no dependecy to allow use of custom SVG icons in your Vue.js application based on SVG sprite.
import App from './App';
// import router from './router';
// import store from './store/store';

Vue.config.productionTip = false;

Vue.component('InputNumber', InputNumber);

Vue.use(VueI18n);
// Vue.use(VueChartkick, { adapter: Highcharts });
// Vue.use(Checkbox);
// Vue.use(CheckboxGroup);
// Vue.use(Steps);
// Vue.use(Step);
// Vue.use(InputNumber);
Vue.use(VueSVGCustomIcon, { basePath: './static' });
Vue.use(Svgxuse);
// Vue.use(ElementUI);

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
  // router,
  // store,
  components: { App },
  template: '<App/>',
});
