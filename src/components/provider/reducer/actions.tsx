import { Moment } from "moment";
import { RecordItem } from "../../../pages/detail/components/record/Record";

// 定义各种action的type类型，包括了增删改查账单记录以及修改当前选择月份
export enum Action {
  ADD_RECORD = "add_record",
  DELETE_RECORD = "delete_record",
  UPDATE_RECORD = "update_record",
  UPDATE_MONTHLY_RECORDS = "update_monthly_records",
  UPDATE_MONTH = "update_month",
}

// 更改当前所选择的月份 action
export const updateMonth = (month: Moment) =>
  ({
    type: Action.UPDATE_MONTH,
    month,
  } as const); // as const 不能省

export const addRecord = (record: RecordItem) =>
  ({ type: Action.ADD_RECORD, record } as const);

export const updateRecord = (record: RecordItem) =>
  ({ type: Action.UPDATE_RECORD, record } as const);

// 获取action函数返回值的类型
export type ActionType =
  | ReturnType<typeof addRecord>
  | ReturnType<typeof updateMonth>
  | ReturnType<typeof updateRecord>;
