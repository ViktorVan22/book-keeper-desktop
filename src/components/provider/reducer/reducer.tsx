import moment, { Moment } from "moment";
import {
  RecordItem,
  RecordType,
} from "../../../pages/detail/components/record/Record";
import { isSameMonth } from "../../../services/dateHelper";
import { Action, ActionType } from "./actions";

// 定义全局state的类型，包含了所选择月份信息和当月所有记录信息
export interface State {
  month: Moment;
  monthlyRecords: RecordItem[];
}

export const defaultState: State = {
  month: moment(), //默认为当前月份
  monthlyRecords: [],
};

export const reducer = (state: State, action: ActionType) => {
  switch (action.type) {
    case Action.ADD_RECORD:
      // 对于新增，如果是新增的本月记录，则可以添加到list中，否则不进行操作
      return {
        ...state,
        monthlyRecords: isSameMonth(action.record.timeStamp, state.month)
          ? state.monthlyRecords.concat(action.record)
          : state.monthlyRecords,
      };

    case Action.UPDATE_MONTH:
      return {
        ...state,
        month: action.month,
      };
    case Action.UPDATE_RECORD:
      // 对于改变，如果是改变后记录日期还是本月，则可以更新到list中，否则从list中删除
      return {
        ...state,
        monthlyRecords: isSameMonth(action.record.timeStamp, state.month)
          ? state.monthlyRecords.map(i =>
              i.id === action.record.id ? action.record : i
            )
          : state.monthlyRecords.filter(i => i.id !== action.record.id),
      };

    case Action.DELETE_RECORD:
      return {
        ...state,
        monthlyRecords: state.monthlyRecords.filter(
          item => item.id !== action.recordId
        ),
      };
    case Action.UPDATE_MONTHLY_RECORDS:
      return {
        ...state,
        monthlyRecords: action.records,
      };
    default:
      return state;
  }
};
