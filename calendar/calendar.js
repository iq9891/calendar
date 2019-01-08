// 组件
import WMCalendar from './mcalendar/MCalendar';
// 日期方法
import * as dateTool from './utils/date';

const cpts = [
  WMCalendar,
];

const install = (Vue) => {
  if (install.installed) return;

  cpts.forEach((key) => {
    Vue.component(cpts[key].name, cpts[key]);
  });

  if (!Vue.prototype.$wdate) {
    Object.defineProperties(Vue.prototype, {
      $wdate: {
        get() {
          return dateTool;
        },
      },
    });
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '1.0.0',
  install,
};
