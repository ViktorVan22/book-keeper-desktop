import { FC, useContext, useState } from "react";
import { IconButton } from "../../components/icon/Icon";
import { Context } from "../../components/provider/Provider";
import {
  addRecord,
  deleteRecord,
  updateRecord,
} from "../../components/provider/reducer/actions";
import RecordModal, {
  NewRecordItem,
} from "./components/recordModal/RecordModal";
import { groupDailyRecords } from "../../services/recordHelper";
import DailyRecords from "./components/dailyRecords/DailyRecords";
import "./DetailPage.css";
import { RecordItem } from "./components/record/Record";

const DetailPage: FC = () => {
  const [updateRecordId, setUpdateRecordId] = useState<number>();
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

  const onUpdateRecord = (record: RecordItem) => {
    dispatch(updateRecord(record));
  };

  // 点击修改按钮的处理方法
  const onOpenUpdateModal = (id: number) => {
    setUpdateRecordId(id);
    setVisible(true);
  };

  const onDeleteRecord = (recordId: number) => {
    dispatch(deleteRecord(recordId));
  };

  // 如果updateRecordId不为空，则找到目标record
  const target = updateRecordId
    ? state.monthlyRecords.find(i => i.id === updateRecordId)
    : undefined;

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
          <DailyRecords
            key={daily.timeStamp}
            {...daily}
            onOpenUpdateModal={onOpenUpdateModal}
            onDeleteRecord={onDeleteRecord}
          />
        ))}
      </div>
      <RecordModal
        visible={visible}
        updateRecord={target}
        onClose={onToggleVisible}
        onProcessRecord={target ? onUpdateRecord : onAddRecord}
      />
    </div>
  );
};

export default DetailPage;
