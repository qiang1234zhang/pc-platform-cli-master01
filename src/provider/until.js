const cookieUtil = {
  setCookie(c_name, value, expiremMinutes) {
    var exdate = new Date();
    exdate.setTime(exdate.getTime() + expiremMinutes * 60 * 1000);
    document.cookie =
      c_name +
      "=" +
      escape(value) +
      (expiremMinutes == null ? "" : ";expires=" + exdate.toGMTString());
  },
  getCookie(c_name) {
    if (document.cookie.length > 0) {
      var c_start = document.cookie.indexOf(c_name + "=");
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1;
        var c_end = document.cookie.indexOf(";", c_start);
        if (c_end == -1) c_end = document.cookie.length;
        return unescape(document.cookie.substring(c_start, c_end));
      }
    }
    return "";
  },
  delCookie(c_name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.getCookie(c_name);
    if (cval != null) {
      document.cookie = c_name + "=" + cval + ";expires=" + exp.toGMTString();
    }
  }
};
// 获取网址上的参数
const getQueryString = name => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return "";
};
// 数组去空
const getClear = arr => {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    if (!arr[i] || arr[i] == "" || arr[i] == "undefined") {
      arr.splice(i, 1);
      len--;
      i--;
    }
  }
  return arr;
};

// 去除所有空格
export const trimAll = str => {
  if (typeof str !== "string") {
    console.error("/utils/self-utils/trimAll >>>\n", "not string!");
    return "";
  }
  let copyStr = str;
  return copyStr.replace(/\s+/g, "");
};
// 准确判断数据类型
export const typeOf = o => {
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

// 日期转换
const dealDate = dates => {
  let date = new Date(dates);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  let d = date.getDate();
  d = d < 10 ? "0" + d : d;
  let h = date.getHours();
  h = h < 10 ? "0" + h : h;
  let minute = date.getMinutes();
  minute = minute < 10 ? "0" + minute : minute;
  let second = date.getSeconds();
  second = second < 10 ? "0" + second : second;
  let fg = y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
  return fg;
};
// 日期区间转换
const dealDateZones = dateList => {
  var timeStr = "";
  var arr = [];
  if (dateList) {
    dateList.forEach(item => {
      let date = new Date(item);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      timeStr = timeStr + y + "." + m + "." + d + "-";
    });
    arr = timeStr.split("-");
    arr.pop();
  }
  return arr;
};

/**
 * 根据映射转换对象，用于前后端字段不一致时的处理
 * @param {object} obj 待转换的对象
 * @param {object} map 映射关系 {key: newKey}
 * @param {boolean}} keep 待转换的对象中，没有在map映射关系中标注的属性，是否保留原键值对，默认false
 */
export const convertObjWithMap = (obj, map, keep = false) => {
  let result = {};
  Object.keys(obj).forEach(key => {
    if (map[key]) {
      result[map[key]] = obj[key];
    } else if (keep) {
      result[key] = obj[key];
    }
  });
  return result;
};

// 导出table
const exportTable = (tableData, Header, filterData, title) => {
  import("@/assets/lib/Export2Excel").then(excel => {
    const tHeader = Header;
    const filterVal = filterData;
    const list = tableData;
    const data = this.formatJson(filterVal, list);
    excel.export_json_to_excel(tHeader, data, title);
  });
};
const formatJson = (filterVal, jsonData) => {
  return jsonData.map(v => filterVal.map(j => v[j]));
};
const deWeight = arrs => {
  let arr_sum = [];
  arrs.map(item => {
    arr_sum.push(item.code);
  });
  let newArr = [];
  let newArr2 = [];
  for (let i = 0; i < arr_sum.length; i++) {
    if (newArr.indexOf(arr_sum[i]) == -1) {
      newArr.push(arr_sum[i]);
      newArr2.push(arrs[i]);
    }
  }
  return newArr2;
};

// 校验密码
const checkPassword = (rule, value, callback) => {
  if (!value) {
    // 至少8个字符，大小写字母和数字
    return callback(new Error("至少8个大小写字母和数字"));
  } else {
    if (value == "******") {
      callback();
    } else {
      setTimeout(() => {
        let ts = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,}$/;
        if (!ts.test(value)) {
          callback(new Error("至少8个大小写字母和数字"));
        } else {
          callback();
        }
      }, 1000);
    }
  }
};
// 校验手机号
const checkMobile = (rule, value, callback) => {
  if (value) {
    let re = /^0*(86)*(13|15|16|14|18|17|19)\d{9}$/;
    let req = /^\d*$/;
    let mobile = value.replace(/\s+/g, "");
    if (mobile == null || mobile == undefined || mobile.length == 0) {
      callback(new Error("手机号码不能为空"));
      return false;
    } else if (!re.test(mobile)) {
      if (req.test(mobile) && mobile.length < 11) {
        callback(new Error("手机号码不可少于11位"));
      } else {
        callback(new Error("手机号码格式不正确"));
      }
    }
    callback();
  } else {
    callback();
  }
};
// 校验邮箱
const checkEmail = (rule, value, callback) => {
  let pattern = /^([a-zA-Z0-9]+[_|_|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  if (!pattern.test(value)) {
    callback(new Error("邮箱格式不正确，请重新填写!"));
  } else {
    callback();
  }
};
// 校验 16或18位数字
const num = (rules, value, callback) => {
  let re = /^\d{16}$|^\d{18}$/;
  if (!re.test(value)) {
    callback(new Error("必须是16或18位纯数字"));
  } else {
    callback();
  }
};
export {
  cookieUtil,
  getQueryString,
  getClear,
  dealDate,
  dealDateZones,
  exportTable,
  formatJson,
  deWeight,
  checkPassword,
  checkMobile,
  checkEmail,
  num
};
