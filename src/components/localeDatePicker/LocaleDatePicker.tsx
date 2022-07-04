import React, { FC } from "react";
import { DatePicker } from "antd";
import moment, { Moment } from "moment";
// jest不会编译node_modules文件中的内容，所以无法正确识别es文件中的export语法
import locale from "antd/lib/date-picker/locale/zh_CN"; // 引入中文配置
import "./LocaleDatePicker.css";

interface MonthPickerProps {
  picker?: "month" | "date"; // 两个模式可选，分别为选择月份和选则日期
  value?: Moment;
  onChange?: (timeStamp: Moment, dateString: string) => void;
}

const LocaleDatePicker: FC<MonthPickerProps> = ({
  picker = "month",
  value,
  onChange,
}) => {
  return (
    <DatePicker
      locale={locale}
      picker={picker}
      inputReadOnly={true}
      allowClear={false}
      disabledDate={time => time.isAfter(moment())}
      value={value}
      onChange={onChange as any}
    />
  );
};

export default LocaleDatePicker;
