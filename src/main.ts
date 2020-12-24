import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { firestorePlugin } from 'vuefire'

Vue.config.productionTip = false


Vue.use(firestorePlugin);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
