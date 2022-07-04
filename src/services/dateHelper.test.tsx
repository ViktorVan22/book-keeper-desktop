import { DateFormat, formatTimeStamp } from "./dateHelper";

// describe用于描述一组测试用例
// 内部可以包含多个describe或者test方法
describe("formatTimeStamp function test", () => {
  // test方法用于描述一个具体的测试用例
  test("should return year-month-day when given timestamp and YEAR_MONTH_DAY format", () => {
    const timestamp = 1615985092598; // 代表 2021-03-17 20:44:52
    // 使用jest提供的expect方法做断言判断
    expect(formatTimeStamp(timestamp, DateFormat.YEAR_MONTH_DAY)).toEqual(
      "2021-03-17"
    );
  });
});
