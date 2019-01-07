<template>
  <div class="w-m-calendar">
    <div class="w-m-calendar-header">
      <div class="w-m-calendar-btn w-m-calendar-prev" :class="{
        'w-m-calendar-btn-disabled': prevDisabledValue,
        }" @click="pcPrev" @touchend="wapPrev($event)">
        <i class="w-m-calendar-arrow w-m-calendar-left" :class="{
          'w-m-calendar-arrow-disabled': prevDisabledValue,
          }"></i>
      </div>
      <div class="w-m-calendar-btn w-m-calendar-next" :class="{
        'w-m-calendar-btn-disabled': nextDisabledValue,
        }" @click="pcNext" @touchend="wapNext($event)">
        <i class="w-m-calendar-arrow w-m-calendar-right" :class="{
          'w-m-calendar-arrow-disabled': nextDisabledValue,
          }"></i>
      </div>
      <span class="w-m-calendar-now">{{ yearCount }}{{ yearText }}{{ monthCount }}{{ monthText }}</span>
    </div>
    <div class="w-m-calendar-col">
      <span class="w-m-calendar-week" v-for="week in weekText">{{ week }}</span>
    </div>
    <div class="w-m-calendar-panel">
      <div class="w-m-calendar-date w-m-calendar-prev" v-for="day in lastMonthDays">
        <slot name="prevday" v-bind:day="day" v-if="hasScopedSlotPrevDay">
          {{ day }}
        </slot>
        <span class="w-m-calendar-num" v-else :style="{height: itemHeight}">{{ day.num }}</span>
      </div>
      <div class="w-m-calendar-date" :class="{
        'w-m-calendar-disabled': day.undo,
        'w-m-calendar-today': day.today,
        'w-m-calendar-choice': day.choice,
      }" v-for="day in days" @touchstart="wapStart" @touchmove="wapMove($event)" @touchend="wapEnd($event, day, monthCount, yearCount)" @click="pcClick(day, monthCount, yearCount)">
        <!-- 可自定义 -->
        <slot name="day" v-bind:day="day" v-if="hasScopedSlotDay">
          {{ day }}
        </slot>
        <!-- 默认 -->
        <span class="w-m-calendar-num" :class="{
          'w-m-calendar-active': day.active,
          }" v-if="!hasScopedSlotDay" ref="dayItem" :style="{height: itemHeight}">{{ day.num }}</span>
        <p class="w-m-calendar-text" v-if="day.choice && !day.active && !hasScopedSlotDay">{{ choiceText }}</p>
      </div>
      <div class="w-m-calendar-date w-m-calendar-next" v-for="day in nextMonthDays">
        <slot name="prevday" v-bind:day="day" v-if="hasScopedSlotNextDay">
          {{ day }}
        </slot>
        <span class="w-m-calendar-num" v-else :style="{height: itemHeight}">{{ day.num }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { TweenLite } from 'gsap';
import browser from 'em-underline/browser';

import { weekText, monthText, yearText } from '../utils/i18n';
import { hasOwn } from '../utils/o';
import {
  getDayCountOfMonth,
  initTimeDate,
  clearHours,
  getYear,
  getMonth,
  patchZero,
} from '../utils/date';

// 日期里面只有 42 天（上月 | 本月 | 下月）
const allDays = 42;

export default {
  name: 'WMCalendar',
  data() {
    return {
      today: null,
      yearNumber: 1970,
      yearAnim: 1970,
      monthNumber: 0,
      monthAnim: 0,
      itemHeight: 0,
      touchStartPosY: 0,
      touchPlace: 0, // 如果不是 0 ，按住滚动了就不触发 touchend

      // activeDay: 0,
      activeDay: clearHours(new Date()),
    };
  },
  model: {
    prop: 'value',
    event: 'model',
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    weekText: {
      type: Array,
      default: () => weekText,
    },
    monthText: {
      type: String,
      default: monthText,
    },
    yearText: {
      type: String,
      default: yearText,
    },
    animate: {
      type: Boolean,
      default: false,
    },
    animateTime: {
      type: Number,
      default: 0.5,
    },
    choiceText: {
      type: String,
      default: '已选',
    },
    disabledDate: {
      type: Function,
      default: () => false,
    },
    choicedDate: {
      type: Function,
      default: () => false,
    },
    prevDisabled: Boolean,
    nextDisabled: Boolean,
    change: {
      type: Function,
      default: () => {},
    },
    prev: {
      type: Function,
      default: () => {},
    },
    next: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    yearCount() {
      return this.animate ? this.yearAnim.toFixed(0) : this.yearNumber;
    },
    monthCount() {
      return this.animate ? patchZero(this.monthAnim.toFixed(0)) : this.monthNumber;
    },
    lastMonthDays() {
      const date = new Date(this.yearNumber, parseFloat(this.monthNumber) - 1, 1);
      const maxDaysNum = date.getDay();
      const handleMonth = date.getMonth() === 0 ? 11 : date.getMonth() - 1;
      const dateCountOfLastMonth = getDayCountOfMonth(date.getFullYear(), handleMonth);
      const lastMonth = this.monthNumber - 1;
      const days = [];
      for (let i = 0; i < maxDaysNum; i++) {
        days.unshift({
          num: dateCountOfLastMonth - i,
          undo: this.disabledDate(new Date(this.yearNumber,
            lastMonth,
            dateCountOfLastMonth - i)),
        });
      }
      return days;
    },
    days() {
      const days = [];
      const len = getDayCountOfMonth(this.yearNumber, parseFloat(this.monthNumber) - 1) + 1;
      const now = clearHours(new Date());

      for (let i = 1; i < len; i++) {
        const loopNow = new Date(this.yearNumber, this.monthNumber - 1, i);
        days.push({
          num: i,
          undo: this.disabledDate(
            loopNow,
            loopNow.getTime(),
            i,
            parseFloat(this.monthNumber),
            this.yearNumber,
          ),
          today: clearHours(loopNow) === now,
          choice: this.choicedDate(
            loopNow,
            loopNow.getTime(),
            i,
            parseFloat(this.monthNumber), this.yearNumber,
          ),
          active: clearHours(loopNow) === this.activeDay,
        });
      }

      return days;
    },
    nextMonthDays() {
      const days = [];
      let len = allDays - this.lastMonthDays.length - this.days.length;
      const nextMonth = this.monthNumber + 1;

      len += 1;

      for (let i = 1; i < len; i++) {
        days.push({
          num: i,
          undo: this.disabledDate(new Date(this.yearNumber,
            nextMonth,
            i)),
        });
      }

      return days;
    },
    hasScopedSlotDay() {
      return hasOwn(this.$scopedSlots, 'day');
    },
    hasScopedSlotPrevDay() {
      return hasOwn(this.$scopedSlots, 'prevday');
    },
    hasScopedSlotNextDay() {
      return hasOwn(this.$scopedSlots, 'nextday');
    },
    prevDisabledValue() {
      return this.prevDisabled;
    },
    nextDisabledValue() {
      return this.nextDisabled;
    },
  },
  mounted() {
    this.mountedInit();
    this.$nextTick(() => {
      this.setSize();
    });
  },
  methods: {
    setSize() {
      const { dayItem } = this.$refs;
      try {
        const { offsetWidth } = dayItem[0];
        this.itemHeight = `${offsetWidth}px`;
      } catch (e) {
        this.itemHeight = 0;
      }
    },
    mountedInit() {
      this.today = initTimeDate();
      this.yearNumber = getYear(this.today);
      this.monthNumber = getMonth(this.today);
    },
    wapPrev(event) {
      if (browser.versions().isMobile) {
        this.prevMonth();
      }
      event.preventDefault();
    },
    pcPrev() {
      if (!browser.versions().isMobile) {
        this.prevMonth();
      }
    },
    wapNext(event) {
      if (browser.versions().isMobile) {
        this.nextMonth();
      }
      event.preventDefault();
    },
    pcNext() {
      if (!browser.versions().isMobile) {
        this.nextMonth();
      }
    },
    prevMonth() {
      if (!this.prevDisabledValue) {
        this.monthNumber--;
        if (this.monthNumber < 1) {
          this.monthNumber = 12;
          this.yearNumber--;
        }
        this.prev(this.activeDay, this.monthNumber, this.yearNumber);
        this.$emit('prev', this.activeDay, this.monthNumber, this.yearNumber);
      }
    },
    nextMonth() {
      if (!this.nextDisabledValue) {
        this.monthNumber++;
        if (this.monthNumber > 12) {
          this.monthNumber = 1;
          this.yearNumber++;
        }
        this.next(this.activeDay, this.monthNumber, this.yearNumber);
        this.$emit('next', this.activeDay, this.monthNumber, this.yearNumber);
      }
    },
    choiceDay(day) {
      if (!day.undo) {
        this.activeDay = clearHours(new Date(this.yearNumber, this.monthNumber - 1, day.num));
        this.change(day, this.activeDay, this.monthNumber, this.yearNumber);
        this.$emit('change', day, this.activeDay, this.monthNumber, this.yearNumber);
      }
    },
    wapStart(event) {
      this.touchStartPosY = event.touches[0].clientY;
    },
    wapMove(event) {
      this.touchPlace = Math.abs(event.touches[0].clientY - this.touchStartPosY) > 0;
    },
    wapEnd(event, day, month, year) {
      if (browser.versions().isMobile && this.touchPlace === 0) {
        this.choiceDay(day, month, year);
      }
      if (event.cancelable) {
        event.preventDefault();
      }
      this.touchPlace = 0;
    },
    pcClick(day, month, year) {
      if (!browser.versions().isMobile) {
        this.choiceDay(day, month, year);
      }
    },
  },
  watch: {
    yearNumber(val) {
      TweenLite.to(this.$data, this.animateTime, { yearAnim: val });
    },
    monthNumber(val) {
      TweenLite.to(this.$data, this.animateTime, { monthAnim: val });
    },
  },
};
</script>
