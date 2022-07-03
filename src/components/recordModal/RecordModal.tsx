import { Input, Modal, Tabs } from "antd";
import { FC } from "react";
import { EXPENDITURE_ICON_LIST, INCOME_ICON_LIST } from "../../constants";
import { RecordType } from "../../pages/detail/components/record/Record";
import { IconButton } from "../icon/Icon";
import LocaleDatePicker from "../localeDatePicker/LocaleDatePicker";
import "./RecordModal.css";

interface RecordModalProps {
  visible: boolean;
  onClose: () => void; //定义关闭弹出框的回调方法
}

const RecordModal: FC<RecordModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      okText={"确认"}
      cancelText={"取消"}
      destroyOnClose={true}
      visible={visible}
      onCancel={onClose}
    >
      <div className={"record-modal"}>
        {/* 使用Tabs组件展示不同收入或者支出可选的类别 */}
        <Tabs centered size={"middle"}>
          <Tabs.TabPane tab="支出" key={RecordType.Expenditure}>
            {EXPENDITURE_ICON_LIST.map(item => (
              <div key={item.name} className={"record-item"}>
                <IconButton icon={item.icon} />
                <span>{item.name}</span>
              </div>
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="收入" key={RecordType.Income}>
            {INCOME_ICON_LIST.map(item => (
              <div key={item.name} className={"record-item"}>
                <IconButton icon={item.icon} />
                <span>{item.name}</span>
              </div>
            ))}
          </Tabs.TabPane>
        </Tabs>
        {/* 以下三个是输入框 */}
        <div className={"record-modal__list"}>
          <div className={"record-modal__list__item"}>
            <span>日期：</span>
            <LocaleDatePicker />
          </div>
          <div className={"record-modal__list__item"}>
            <span>金额：</span>
            <Input type={"number"} />
          </div>
          <div className={"record-modal__list__item"}>
            <span>备注：</span>
            <Input maxLength={20} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RecordModal;
