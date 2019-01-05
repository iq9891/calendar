// 组件
import PMCalendar from './mcalendar/index';

const cpts = {
  PMCalendar,
};

const install = (Vue) => {
  if (install.installed) return;

  Object.keys(cpts).forEach((key) => {
    Vue.component(key, cpts[key]);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '1.0.0',
  install,
};
