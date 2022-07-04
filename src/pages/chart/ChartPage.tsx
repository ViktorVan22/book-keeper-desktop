import { useContext } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Context } from "../../components/provider/Provider";
import { getDailySummaryInMonth } from "../../services/recordHelper";
import LineChartInMonth from "./components/lineChart/LineChartInMonth";
import "./ChartPage.css";

const ChartPage: React.FC = () => {
  const {
    state: { monthlyRecords, month },
  } = useContext(Context);

  const dailySummaryInMonth = getDailySummaryInMonth(monthlyRecords, month);

  return (
    <div>
      <div className={"chart-page"}>
        <div className={"chart-page__header"}></div>
        <div className={"chart-page__content"}>
          <LineChartInMonth title={"本月收支情况"} data={dailySummaryInMonth} />
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
