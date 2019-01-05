# m-calendar 日历
> 移动端，单位 rem

## 何时使用

<br>
<br>
<br>
<p>
  <w-m-calendar></w-m-calendar>
</p>

## API

### 属性

|参数|说明|类型|是否必填|默认值|
|---|----|---|-------|-----|
|target|设置 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数|() => HTMLElement|否|() => window|

### 事件

|事件名|说明|返回值|
|-----|---|-----|
|change|固定状态改变时触发的回调函数|当前定位类型|

<script>
import WMCalendar from '../calendar/mcalendar/MCalendar';

export default {
  mounted() {
    document.getElementsByTagName('html')[0].className = 'html';
  },
  beforeDestroy() {
    document.getElementsByTagName('html')[0].className = '';
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
}
</style>
