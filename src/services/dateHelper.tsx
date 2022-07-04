import moment, { Moment } from "moment";
import "moment/locale/zh-cn"; // 本地化，moment 默认语言为英语

export enum DateFormat {
  MONTH_DAYOFWEEK = "MMMDo dddd", // 格式化日期的结构为 月 日 星期
  YEAR_MONTH_DAY = "YYYY-MM-DD", // 格式化日期的结构为 年 月 日
  Day = "D", // 将时间戳转变为该月的第多少天，如1, 2, 3, ..., 31
}

// 东八区相对于UTC需要加8个小时
const TIMEZONE_OFFSET = 480;

export const formatTimeStamp = (
  timeStamp: number,
  format = DateFormat.YEAR_MONTH_DAY
) => {
  return moment(timeStamp).utcOffset(TIMEZONE_OFFSET).format(format); // 调用 moment 的 format 方法对时间戳进行格式化
};

export const getMonthRange = (month: Moment) => {
  const start = moment(month)
    .utcOffset(TIMEZONE_OFFSET)
    .startOf("month")
    .valueOf();
  const end = moment(month).utcOffset(TIMEZONE_OFFSET).endOf("month").valueOf();
  return [start, end];
};

export const isSameMonth = (timeStamp: number, currentMonth: Moment) => {
  const month = moment(timeStamp).utcOffset(TIMEZONE_OFFSET);
  return (
    month.isSame(currentMonth.utcOffset(TIMEZONE_OFFSET), "year") &&
    month.isSame(currentMonth.utcOffset(TIMEZONE_OFFSET), "month")
  );
};
