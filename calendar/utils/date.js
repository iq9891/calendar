export const getDayCountOfMonth = (year, month) => {
  if (month === 3 || month === 5 || month === 8 || month === 10) {
    return 30;
  } if (month === 1) {
    if (((year % 4 === 0) && (year % 100 !== 0)) || year % 400 === 0) {
      return 29;
    }
    return 28;
  }
  return 31;
};

export const clearHours = (time = '') => {
  const cloneDate = new Date(time);
  cloneDate.setHours(0, 0, 0, 0);
  return cloneDate.getTime();
};

export const initTimeDate = (reset = true) => {
  const date = new Date();
  if (reset) {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
  }
  return date;
};

export const getFirstDayOfMonth = (date) => {
  const temp = new Date(date.getTime());
  temp.setDate(1);
  return temp.getDay();
};

export const patchZero = (num) => {
  const newNum = String(num);
  return newNum.length > 1 ? newNum : `0${newNum}`;
};

export const getYear = date => date.getFullYear();

export const getMonth = date => patchZero(date.getMonth() + 1);

export const getDate = (date, isPatchZero = true) => (
  isPatchZero
    ? patchZero(date.getDate())
    : date.getDate()
);

export const getDay = date => date.getDay();
