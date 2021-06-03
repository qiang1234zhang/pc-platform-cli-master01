import { Loading } from "element-ui";
let loadingCount = 0;
let loading;
const startLoading = (icon, target) => {
  loading = Loading.service({
    lock: true,
    spinner: icon,
    text: "正在加载中，请稍后......",
    background: "rgba(0,0,0,.7)",
    target: target
  });
};
const endLoading = () => {
  loading.close();
};

export const showLoading = (icon, target) => {
  if (loadingCount === 0) {
    startLoading(icon, target);
  }
  loadingCount += 1;
};

export const hideLoading = () => {
  if (loadingCount <= 0) {
    return;
  }
  loadingCount -= 1;
  if (loadingCount == 0) {
    endLoading();
  }
};
