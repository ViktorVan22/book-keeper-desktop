import React, { FC } from "react";
import { Card } from "antd";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DailySummary } from "../../../../services/recordHelper";

// 接受两个参数，图标的名字，和数据
interface LineChartInMonthProps {
  title: string;
  data: DailySummary[];
}

const LineChartInMonth: FC<LineChartInMonthProps> = ({ title, data }) => {
  return (
    <Card title={`${title}:`}>
      {/* 使用 ResponsiveContainer 包裹，使图标可以自动充满整个宽度 */}
      <ResponsiveContainer height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          {/* x 轴使用 date 字段 */}
          <XAxis dataKey={"date"} />
          <YAxis />
          {/* 收入信息折线使用 totalIncome 字段 */}
          <Line dataKey="totalIncome" name={"收入"} stroke={"#8884d8"} />
          {/* 收入信息折线使用 totalIncome 字段 */}
          <Line dataKey="totalExpenditure" name={"支出"} stroke={"#8dd1e1"} />
          {/* 自定义 tooltip label 显示内容 */}
          <Tooltip labelFormatter={label => <span>{label}日明细：</span>} />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default LineChartInMonth;
