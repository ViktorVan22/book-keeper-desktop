import Icon, { IconButton } from "../../../../components/icon/Icon";
import { getIconByName } from "../../../../services/iconSelector";
import "./Record.css";

// 该类型用于声明账单条目是收入还是支出
export enum RecordType {
  Income = "income", //收入
  Expenditure = "expenditure", //支出
}

export interface RecordItem {
  id: number;
  timeStamp: number;
  type: RecordType;
  name: string;
  price: number;
  remark?: string; //条目备注信息，可选
}

interface RecordProps extends RecordItem {
  onOpenUpdateModal: (id: number) => void;
}

const Record: React.FC<RecordProps> = ({
  id,
  type,
  name,
  price,
  remark,
  onOpenUpdateModal,
}) => {
  const icon = getIconByName(type, name);

  return (
    <div className={"record"}>
      <Icon className={"record-icon"} icon={icon.icon} />
      <div className={"record-name"}>{name}</div>
      <div className={"record-remark"}>{remark}</div>
      <div className={"record-price"}>
        {/* 根据条目类型添加正负号 */}
        {type === RecordType.Income ? "+" : "-"}
        {price}
      </div>
      <div className={"record-action"}>
        <IconButton
          icon={"icon-bianji"}
          onClick={() => onOpenUpdateModal(id)}
        />
        <IconButton
          icon={"icon-shanchu"}
          onClick={() => console.log("delete")}
        />
      </div>
    </div>
  );
};

export default Record;
