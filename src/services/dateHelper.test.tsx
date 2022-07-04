import moment from "moment";
import { DateFormat, formatTimeStamp } from "./dateHelper";

describe("formatTimeStamp function test", () => {
  // 测试 DateFormat.YEAR_MONTH_DAY 的各种情况
  test("should return year-month-day when given timestamp and YEAR_MONTH_DAY format", () => {
    const timestamp1 = 1615985092598; // 代表 2021-03-17 20:44:52
    expect(formatTimeStamp(timestamp1, DateFormat.YEAR_MONTH_DAY)).toEqual(
      "2021-03-17"
    );

    // 测试闰年的 2 月
    const timestamp2 = 1582905600000; // 代表 2020-02-29 00:00:00
    expect(formatTimeStamp(timestamp2, DateFormat.YEAR_MONTH_DAY)).toEqual(
      "2020-02-29"
    );

    // 测试平年的 2 月
    const timestamp3 = 1551283200000; // 代表 2019-02-28 00:00:00
    expect(formatTimeStamp(timestamp3, DateFormat.YEAR_MONTH_DAY)).toEqual(
      "2019-02-28"
    );
  });

  // 测试 DateFormat.MONTH_DAYOFWEEK 的各种情况
  test("should return month day and day of week when given timestamp and MONTH_DAYOFWEEK format", () => {
    const timestamp1 = 1615985092598; // 代表 2021-03-17 20:44:52
    expect(formatTimeStamp(timestamp1, DateFormat.MONTH_DAYOFWEEK)).toEqual(
      "3月17日 星期三"
    );

    // 测试闰年的 2 月
    const timestamp2 = 1582905600000; // 代表 2020-02-29 00:00:00
    expect(formatTimeStamp(timestamp2, DateFormat.MONTH_DAYOFWEEK)).toEqual(
      "2月29日 星期六"
    );

    // 测试平年的 2 月
    const timestamp3 = 1551283200000; // 代表 2019-02-28 00:00:00
    expect(formatTimeStamp(timestamp3, DateFormat.MONTH_DAYOFWEEK)).toEqual(
      "2月28日 星期四"
    );
  });

  // 测试 DateFormat.Day 的各种情况
  test("should return day of month when given timestamp and Day format", () => {
    const timestamp1 = 1615985092598; // 代表 2021-03-17 20:44:52
    expect(formatTimeStamp(timestamp1, DateFormat.Day)).toEqual("17");

    // 测试闰年的 2 月
    const timestamp2 = 1582905600000; // 代表 2020-02-29 00:00:00
    expect(formatTimeStamp(timestamp2, DateFormat.Day)).toEqual("29");

    // 测试平年的 2 月
    const timestamp3 = 1551283200000; // 代表 2019-02-28 00:00:00
    expect(formatTimeStamp(timestamp3, DateFormat.Day)).toEqual("28");
  });
});
