import Loading from "./com-loading.vue";
const obj = {};
obj.install = function(Vue) {
  const loadContrustor = Vue.extend(Loading);
  const loadObj = new loadContrustor();
  loadObj.$mount(document.createElement("div"));
  document.body.appendChild(loadObj.$el);
  Vue.prototype.$loading = loadObj;
};
export default obj;
