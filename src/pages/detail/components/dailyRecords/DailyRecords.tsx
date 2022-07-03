import { DateFormat, formatTimeStamp } from "../../../../services/dateHelper";
import { GroupedDailyRecords } from "../../../../services/recordHelper";
import Record, { RecordItem } from "../record/Record";
import "./DailyRecords.css";

interface DailyRecordsProps extends GroupedDailyRecords {
  onOpenUpdateModal: (id: number) => void;
}

// DailyRecord接受一组 records信息，
// 且这些records日期均在同一天，且是经过排序后的结果
const DailyRecords: React.FC<DailyRecordsProps> = ({
  records,
  summary,
  timeStamp,
  onOpenUpdateModal,
}) => {
  return (
    <div className={"daily-records"}>
      <div className={"daily-records-summary"}>
        <div className={"daily-records-date"}>
          {formatTimeStamp(timeStamp, DateFormat.MONTH_DAYOFWEEK)}
        </div>
        {summary.totalExpenditure > 0 && (
          <div className={"daily-records-detail"}>
            支出：-{summary.totalExpenditure}
          </div>
        )}
        {summary.totalIncome > 0 && (
          <div className={"daily-records-detail"}>
            收入：+{summary.totalIncome}
          </div>
        )}
      </div>
      <div className={"records"}>
        {records.map(record => (
          <Record
            key={record.timeStamp}
            {...record}
            onOpenUpdateModal={onOpenUpdateModal}
          />
        ))}
      </div>
    </div>
  );
};

export default DailyRecords;
