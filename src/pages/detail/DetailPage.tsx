import { FC, useContext, useState } from "react";
import { IconButton } from "../../components/icon/Icon";
import { Context } from "../../components/provider/Provider";
import RecordModal from "../../components/recordModal/RecordModal";
import { groupDailyRecords } from "../../services/recordHelper";
import DailyRecords from "./components/dailyRecords/DailyRecords";
import "./DetailPage.css";

const DetailPage: FC = () => {
  // 获取全局状态中的state
  const { state } = useContext(Context);
  // 对state中的数据按日期分组处理
  const groupedDailyRecords = groupDailyRecords(state.monthlyRecords);

  const [visible, setVisible] = useState(false);
  const onToggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div className="detail-page">
      <div className={"detail-page-header"}>
        <IconButton
          icon={"icon-huabanfuben"}
          className={"detail-page-add-btn"}
          onClick={onToggleVisible}
        />
      </div>
      <div className="detail-page-content">
        {groupedDailyRecords.map(daily => (
          <DailyRecords key={daily.timeStamp} {...daily} />
        ))}
      </div>
      <RecordModal visible={visible} onClose={onToggleVisible} />
    </div>
  );
};

export default DetailPage;
