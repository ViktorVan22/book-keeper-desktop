import { Input, message, Modal, Tabs } from "antd";
import classNames from "classnames";
import moment, { Moment } from "moment";
import { FC, useEffect, useReducer } from "react";
import { EXPENDITURE_ICON_LIST, INCOME_ICON_LIST } from "../../../../constants";
import { RecordItem, RecordType } from "../record/Record";
import { IconButton } from "../../../../components/icon/Icon";
import LocaleDatePicker from "../../../../components/localeDatePicker/LocaleDatePicker";
import "./RecordModal.css";

export type NewRecordItem = Omit<RecordItem, "id">;

interface RecordModalProps {
  visible: boolean;
  updateRecord?: RecordItem; // 添加updateRecord属性，当新建时，该属性为undefined
  onClose: () => void; //定义关闭弹出框的回调方法
  onProcessRecord:
    | ((record: NewRecordItem) => void)
    | ((record: RecordItem) => void); // 替换原来的onAddRecord属性，应该此时可能是新建或者修改
}

// 定义受控组件所有的values类型
interface Values extends Omit<RecordItem, "id" | "timeStamp"> {
  month: Moment;
}

const RecordModal: FC<RecordModalProps> = ({
  visible,
  updateRecord,
  onClose,
  onProcessRecord,
}) => {
  const [values, dispatch] = useReducer(
    (state: Values, updated: Partial<Values>) => ({ ...state, ...updated }),
    {} as Values
  );

  function onTypeChange(type?: RecordType, name?: string) {
    dispatch({ type, name });
  }
  function onMonthChange(month: Moment) {
    dispatch({ month });
  }
  function onPriceChange(price: number) {
    dispatch({ price });
  }
  function onRemarkChange(remark: string) {
    dispatch({ remark });
  }

  //   简单的验证函数
  function onSubmit() {
    if (!values.name) {
      message.error("请选择类型");
      return;
    }
    if (!values.month) {
      message.error("请选择日期");
      return;
    }
    if (!values.price || values.price === 0) {
      message.error("请输入金额");
      return;
    }
    message.success("创建成功");
    onProcessRecord(normalizeValues(values) as RecordItem);
    onClose();
  }

  // 将getNewRecordItem改名为normalizedValues，
  // 用于处理数据并合并updateRecord数据，主要是为了使用其id属性
  function normalizeValues({
    month,
    price,
    ...props
  }: Values): NewRecordItem | RecordItem {
    const timeStamp = month.valueOf();
    const normalizedPrice = Math.abs(values.price);
    return { ...updateRecord, ...props, timeStamp, price: normalizedPrice };
  }

  // 添加useEffect 用于打开弹出框时初始化数据
  useEffect(() => {
    if (!visible) {
      return;
    }
    if (updateRecord) {
      const { id, timeStamp, ...props } = updateRecord;
      dispatch({ ...props, month: moment(timeStamp) });
    } else {
      dispatch({
        type: RecordType.Expenditure,
        month: moment(),
        name: "",
        price: undefined,
        remark: "",
      });
    }
    // eslint-disable-next-line
  }, [visible]);

  return (
    <Modal
      okText={"确认"}
      cancelText={"取消"}
      destroyOnClose={true}
      visible={visible}
      onOk={onSubmit}
      onCancel={onClose}
    >
      <div className={"record-modal"}>
        {/* 使用Tabs组件展示不同收入或者支出可选的类别 */}
        <Tabs
          activeKey={values.type || RecordType.Expenditure}
          centered
          size={"middle"}
          onChange={activeKey => {
            onTypeChange(activeKey as RecordType, undefined);
          }}
        >
          <Tabs.TabPane tab="支出" key={RecordType.Expenditure}>
            {EXPENDITURE_ICON_LIST.map(item => (
              <div key={item.name} className={"record-item"}>
                <IconButton
                  icon={item.icon}
                  className={classNames({ active: values.name === item.name })}
                  onClick={() =>
                    onTypeChange(RecordType.Expenditure, item.name)
                  }
                />
                <span>{item.name}</span>
              </div>
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="收入" key={RecordType.Income}>
            {INCOME_ICON_LIST.map(item => (
              <div key={item.name} className={"record-item"}>
                <IconButton
                  icon={item.icon}
                  className={classNames({ active: values.name === item.name })}
                  onClick={() => onTypeChange(RecordType.Income, item.name)}
                />
                <span>{item.name}</span>
              </div>
            ))}
          </Tabs.TabPane>
        </Tabs>

        {/* 以下三个是输入框 */}
        <div className={"record-modal__list"}>
          <div className={"record-modal__list__item"}>
            <span>日期：</span>
            <LocaleDatePicker
              picker={"date"}
              value={values.month}
              onChange={onMonthChange}
            />
          </div>
          <div className={"record-modal__list__item"}>
            <span>金额：</span>
            <Input
              type={"number"}
              value={values.price}
              onChange={e => onPriceChange(parseFloat(e.target.value))}
            />
          </div>
          <div className={"record-modal__list__item"}>
            <span>备注：</span>
            <Input
              maxLength={20}
              value={values.remark}
              onChange={e => onRemarkChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RecordModal;
