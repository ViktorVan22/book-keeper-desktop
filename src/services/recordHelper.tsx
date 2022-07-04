import { groupBy, map, orderBy, reduce } from "lodash";
import { Moment } from "moment";
import {
  RecordItem,
  RecordType,
} from "./../pages/detail/components/record/Record";
import { DateFormat, formatTimeStamp } from "./dateHelper";

// 定义 Summary 类型，该类型包含总支出，总收入两个字段
export interface Summary {
  totalIncome: number;
  totalExpenditure: number;
}

// 用于计算传入的所有条目数据的总支出和总收入
export const getSummary = (records: RecordItem[]): Summary => {
  return reduce(
    records,
    (summary, record) => {
      if (record.type === RecordType.Income) {
        summary.totalIncome += record.price;
      } else {
        summary.totalExpenditure += record.price;
      }
      return summary;
    },
    { totalIncome: 0, totalExpenditure: 0 }
  );
};

// 每个 DailyRecords 都需要包含当天时间戳，summary 信息和每一条条目信息
export interface GroupedDailyRecords {
  timeStamp: number;
  summary: Summary;
  records: RecordItem[];
}

export const groupDailyRecords = (
  records: RecordItem[]
): GroupedDailyRecords[] => {
  // 首先对 records 按照日期分组
  const groupedDailyRecords = groupBy(records, record =>
    formatTimeStamp(record.timeStamp)
  );
  return orderBy(
    map(Object.keys(groupedDailyRecords), day => {
      const dailyRecords = groupedDailyRecords[day];
      // 计算当天的 summary 信息
      const summary = getSummary(dailyRecords);
      return {
        // 获取第一个条目的时间作为当日时间，用于后续不同日期之间的排序
        timeStamp: dailyRecords[0].timeStamp,
        summary,
        // 将当天条目按照日期降序排列
        records: orderBy(dailyRecords, ["timeStamp"], ["desc"]),
      };
    }),
    // 将不同天之间按照日期降序排列
    ["timeStamp"],
    ["desc"]
  );
};

// DailySummary在Summary的基础上多了date信息
export type DailySummary = Summary & { date: number };

export const getDailySummaryInMonth = (
  records: RecordItem[],
  month: Moment
): DailySummary[] => {
  // 获取当月一共有多少天
  const daysInMonth = month.daysInMonth();

  // 按天统计已存在的记录
  const resultOfPayment = groupDailyRecords(records).map(d => ({
    // 将时间戳解析成当日第几天
    date: parseInt(formatTimeStamp(d.timeStamp, DateFormat.Day)),
    totalExpenditure: d.summary.totalExpenditure,
    totalIncome: d.summary.totalIncome,
  }));

  const result = [];
  // 遍历当月每一天，如果该天没有统计记录，则补0；否则使用前一步已统计的结果
  for (let i = 1; i <= daysInMonth; i++) {
    const payment = resultOfPayment.find(d => d.date === i);
    result.push(payment || { date: i, totalExpenditure: 0, totalIncome: 0 });
  }
  return result;
};
