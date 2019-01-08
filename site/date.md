# date 挂载方法
> 本组件还提供了对外的工具方法

<br>
<br>
<br>
<br>
<p>
  <button @click="getDayCountOfMonthFn">点击获取当前月份天数</button>: {{countOfMonth}}
  <br>
  <button @click="clearHoursFn">获取时间归零的当前日期的时间戳</button>:{{clearHour}}
  <br>
  <button @click="initTimeDate1Fn">获取当前日期</button>:{{initTimeDate1}}
  <br>
  <button @click="initTimeDate2Fn">获取当前日期，时间清零</button>:{{initTimeDate2}}
  <br>
  <button @click="getFirstDayOfMonthFn">获取每月第一天的星期</button>:{{firstDayOfMonth}}
  <br>
  <button @click="patchZeroFn">保持两位</button>:{{patchZero}}
  <br>
  <button @click="getYearFn">获取年份</button>:{{getYear}}
  <br>
  <button @click="getMonthFn">获取月份</button>:{{getMonth}}
  <br>
  <button @click="getDate1Fn">获取日期自动补零</button>:{{getDate1}}
  <br>
  <button @click="getDate2Fn">获取日期不补零</button>:{{getDate2}}
  <br>
  <button @click="getDayFn">获取星期</button>:{{getDay}}
</p>


<script>
import * as date from '../calendar/utils/date';

export default {
  data() {
    return {
      clearHour: 0,
      countOfMonth: 0,
      initTimeDate1: 0,
      initTimeDate2: 0,
      firstDayOfMonth: 0,
      patchZero: 1,
      getYear: 0,
      getMonth: 0,
      getDate1: 0,
      getDate2: 0,
      getDay: 0,
    };
  },
  mounted() {
    document.getElementsByTagName('html')[0].className = 'html';
  },
  beforeDestroy() {
    document.getElementsByTagName('html')[0].className = '';
  },
  methods: {
    getDayCountOfMonthFn() {
      this.countOfMonth = date.getDayCountOfMonth(2019, 1);
    },
    clearHoursFn() {
      this.clearHour = date.clearHours(new Date());
    },
    initTimeDate1Fn() {
      this.initTimeDate1 = date.initTimeDate(new Date());
    },
    initTimeDate2Fn() {
      this.initTimeDate2 = date.initTimeDate(new Date(), false);
    },
    getFirstDayOfMonthFn() {
      this.firstDayOfMonth = date.getFirstDayOfMonth(new Date());
    },
    patchZeroFn() {
      this.patchZero = date.patchZero(this.patchZero);
    },
    getYearFn() {
      this.getYear = date.getYear(new Date());
    },
    getMonthFn() {
      this.getMonth = date.getMonth(new Date());
    },
    getDate1Fn() {
      this.getDate1 = date.getDate(new Date());
    },
    getDate2Fn() {
      this.getDate2 = date.getDate(new Date(), false);
    },
    getDayFn() {
      this.getDay = date.getDay(new Date());
    },
  },
};
</script>
