// 组件
import PMCalendar from './mcalendar/index';
// 日期方法
import * as dateTool from '../utils/date';

const cpts = {
  PMCalendar,
};

const install = (Vue) => {
  if (install.installed) return;

  Object.keys(cpts).forEach((key) => {
    Vue.component(key, cpts[key]);
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
