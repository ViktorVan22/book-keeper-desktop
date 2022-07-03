import React, { FC } from "react";
import { DatePicker } from "antd";
import moment, { Moment } from "moment";
import locale from "antd/es/date-picker/locale/zh_CN"; // 引入中文配置
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
