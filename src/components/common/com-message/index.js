import Msg from "./com-message.vue";
const obj = {};
obj.install = function(Vue) {
  const msgContrustor = Vue.extend(Msg);
  const message = new msgContrustor();
  message.$mount(document.createElement("div"));
  document.body.appendChild(message.$el);
  Vue.prototype.$msg = message;
};
export default obj;
