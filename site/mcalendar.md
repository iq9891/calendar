# m-calendar 日历
> 移动端，单位 rem

## 基本

<br>
<br>
<br>
<p>
点击操作月份按钮： <button @click="prevDisabled = !prevDisabled">上月{{prevDisabled ? '禁' : '可'}}用</button>
<button @click="nextDisabled = !nextDisabled">下月{{nextDisabled ? '禁' : '可'}}用</button>
</p>
<p>
  <w-m-calendar class="demo-calendar" :choicedDate="choicedDate" :disabledDate="disabledDate" :prevDisabled="prevDisabled" :nextDisabled="nextDisabled"></w-m-calendar>
</p>

## 自定义

<br>
<br>
<br>
<p>
  <w-m-calendar :choicedDate="choicedDate">
    <div slot="prevday" slot-scope="{day}">
      <span :style="{color: '#000'}">{{day.num}}</span>
    </div>
    <div slot="day" slot-scope="{day}">
      <span :style="{color: day.choice && !day.active ? '#f00' : 'blue', background: day.active ? 'yellow' : 'none'}">{{day.num}}</span>
      <div style="color: green;font-size: 12px; transform: scale(0.8);word-break: keep-all;" v-if="day.choice && !day.active">我选了</div>
    </div>
    <div slot="nextday" slot-scope="{day}">
      <span :style="{color: '#000'}">{{day.num}}</span>
    </div>
  </w-m-calendar>
</p>

## API

#### 属性

|参数|说明|类型|是否必填|默认值|
|---|----|---|-------|-----|
|target|设置 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数|() => HTMLElement|否|() => window|

#### 事件

|事件名|说明|返回值|
|-----|---|-----|
|change|固定状态改变时触发的回调函数|当前定位类型|

<script>
import WMCalendar from '../calendar/mcalendar/MCalendar';
import {
  clearHours,
} from '../calendar/utils/date';

export default {
  data() {
    return {
      now: clearHours(new Date()),
      prevDisabled: false,
      nextDisabled: false,
    };
  },
  mounted() {
    document.getElementsByTagName('html')[0].className = 'html';
  },
  beforeDestroy() {
    document.getElementsByTagName('html')[0].className = '';
  },
  methods: {
    choicedDate(current, timestamp, day, year, month) {
      return day === 8;
    },
    disabledDate(current, timestamp, day, year, month) {
      return timestamp<this.now;
    },
  },
  components: {
    WMCalendar,
  },
};
</script>
<style lang="scss">
@import '../calendar/mcalendar/style/mcalendar.scss';

.html {
  font-size: 37.5px;

  & .navbar {
    height: 34px;
    box-sizing: content-box;
    line-height: 34px;
    padding: 12px 24px;

    & a {
      line-height: 32px;
    }

    & .site-name {
      font-size: 30px;
    }

    & .links {
      right: 24px;
      top: 12px;
      line-height: 32px;
    }
  }

  & .sidebar {
    width: 27%;
    top: 57.6px;
  }

  & .page {
    padding-left: 27%;
  }

  & h1 {
    font-size: 42px;
  }

  & h2 {
    font-size: 38px;
  }

  & pre,
  & pre[class*="language-"] {
    padding: 20px 24px;

    &::before {
      font-size: 16px;
    }
  }

  & blockquote {
    font-size: 20px;
  }

  & .content code {
    padding: 4px 8px;
  }

  & .search-box input {
    height: 32px;
    width: 200px;
    padding: 0 8px 0 32px;
    background-size: 20px;
    background-position: 6px 6px;
  }

  .content:not(.custom) > h1:first-child, .content:not(.custom) > h2:first-child, .content:not(.custom) > h3:first-child, .content:not(.custom) > h4:first-child, .content:not(.custom) > h5:first-child, .content:not(.custom) > h6:first-child {
    margin-top: -0.75rem;
    padding-top: 2.3rem;
    margin-bottom: 0.5rem;
  }
}

@media (max-width: 419px) {
  .content:not(.custom) {
    padding: 0;
    width: 100%;
  }

  .page {
    padding-left: 0 !important;
  }

  .demo-calendar {
    width: 90%;
    margin: 0 auto;
  }
}

</style>
