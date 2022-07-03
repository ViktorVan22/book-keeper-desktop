import { FC, useContext, useState } from "react";
import { IconButton } from "../../components/icon/Icon";
import { Context } from "../../components/provider/Provider";
import { addRecord } from "../../components/provider/reducer/actions";
import RecordModal, {
  NewRecordItem,
} from "../../components/recordModal/RecordModal";
import { groupDailyRecords } from "../../services/recordHelper";
import DailyRecords from "./components/dailyRecords/DailyRecords";
import "./DetailPage.css";

const DetailPage: FC = () => {
  // 获取全局状态中的state
  const { state, dispatch } = useContext(Context);
  // 对state中的数据按日期分组处理
  const groupedDailyRecords = groupDailyRecords(state.monthlyRecords);

  const [visible, setVisible] = useState(false);
  const onToggleVisible = () => {
    setVisible(!visible);
  };

  //添加新建记录方法
  const onAddRecord = (record: NewRecordItem) => {
    dispatch(addRecord({ ...record, id: record.timeStamp }));
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
      <RecordModal
        visible={visible}
        onClose={onToggleVisible}
        onAddRecord={onAddRecord}
      />
    </div>
  );
};

export default DetailPage;
