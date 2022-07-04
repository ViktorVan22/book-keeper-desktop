import { Card } from "antd";
import { FC } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { COLOR_PALETTE } from "../../../../constants";
import { TypeSummary } from "../../../../services/recordHelper";

interface PieChartInMonthProps {
  title: string;
  data: TypeSummary[];
}

const PieChartInMonth: FC<PieChartInMonthProps> = ({ title, data }) => {
  return (
    <Card title={`${title}: `}>
      <ResponsiveContainer width={"100%"} height={300}>
        <PieChart>
          {/* 在Pie通过Children函数的形式使用颜色 */}
          <Pie
            nameKey={"name"}
            dataKey={"total"}
            data={data}
            innerRadius={"35%"}
            outerRadius={"65%"}
          >
            {data.map((item, idx) => (
              <Cell
                key={item.name}
                fill={COLOR_PALETTE[idx % COLOR_PALETTE.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            height={300}
            layout={"horizontal"}
            verticalAlign={"middle"}
            align={"right"}
            wrapperStyle={{ maxWidth: 200 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default PieChartInMonth;
