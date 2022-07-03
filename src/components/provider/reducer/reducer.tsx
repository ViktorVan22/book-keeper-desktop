import moment, { Moment } from "moment";
import { useReducer } from "react";
import {
  RecordItem,
  RecordType,
} from "../../../pages/detail/components/record/Record";
import { Action, ActionType } from "./actions";

// 定义全局state的类型，包含了所选择月份信息和当月所有记录信息
export interface State {
  month: Moment;
  monthlyRecords: RecordItem[];
}

export const defaultState: State = {
  month: moment(), //默认为当前月份
  monthlyRecords: [
    {
      timeStamp: 1613477254556, // 2021-02-16 20:07:34
      type: RecordType.Expenditure,
      name: "餐饮",
      price: 100,
      remark: "请人吃饭",
      id: 1,
    },
    {
      timeStamp: 1612969810000, // 2021-02-10 23:10:10
      type: RecordType.Expenditure,
      name: "购物",
      price: 200,
      id: 2,
    },
    {
      timeStamp: 1612969810000, // 2021-02-10 23:10:10
      type: RecordType.Expenditure,
      name: "蔬菜",
      price: 20,
      id: 3,
    },
    {
      timeStamp: 1613477254556, // 2021-02-16 20:07:34
      type: RecordType.Expenditure,
      name: "宠物",
      price: 200,
      id: 4,
    },
    {
      timeStamp: 1613477254556, // 2021-02-16 20:07:34
      type: RecordType.Income,
      name: "工资",
      price: 10000,
      remark: "这可是血汗钱啊",
      id: 5,
    },
  ],
};

export const reducer = (state: State, action: ActionType) => {
  switch (action.type) {
    case Action.ADD_RECORD:
      return {
        ...state,
        monthlyRecords: state.monthlyRecords.concat(action.record),
      };

    case Action.UPDATE_MONTH:
      return {
        ...state,
        month: action.month,
      };
    default:
      return state;
  }
};
