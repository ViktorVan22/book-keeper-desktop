import moment, { Moment } from "moment";
import "moment/locale/zh-cn"; // 本地化，moment 默认语言为英语

export enum DateFormat {
  MONTH_DAYOFWEEK = "MMMDo dddd", // 格式化日期的结构为 月 日 星期
  YEAR_MONTH_DAY = "YYYY-MM-DD", // 格式化日期的结构为 年 月 日
}

export const formatTimeStamp = (
  timeStamp: number,
  format = DateFormat.YEAR_MONTH_DAY
) => {
  return moment(timeStamp).format(format); // 调用 moment 的 format 方法对时间戳进行格式化
};
