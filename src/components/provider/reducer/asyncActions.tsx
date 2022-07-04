import { Moment } from "moment";
import { Dispatch } from "react";
import { RecordItem } from "../../../pages/detail/components/record/Record";
import { NewRecordItem } from "../../../pages/detail/components/recordModal/RecordModal";
import {
  createNewRecordUsingPost,
  deleteRecordUsingDelete,
  getRecordsBetweenRangeUsingGet,
  updateRecordUsingPut,
} from "../../../services/client";
import { getMonthRange } from "../../../services/dateHelper";
import {
  ActionType,
  addRecord,
  deleteRecord,
  updateMonthlyRecords,
  updateRecord,
} from "./actions";

//该文件处理异步请求的逻辑
export const fetchRecordsAsync =
  (month: Moment) => async (dispatch: Dispatch<ActionType>) => {
    // getMonthRange方法用于获取一个月的开始时间戳和结束时间戳
    const [start, end] = getMonthRange(month);
    const recordList = await getRecordsBetweenRangeUsingGet(start, end);
    dispatch(updateMonthlyRecords(recordList));
  };

export const createNewRecordAsync =
  (record: NewRecordItem) => async (dispatch: Dispatch<ActionType>) => {
    const newRecord = await createNewRecordUsingPost(record);
    dispatch(addRecord(newRecord));
  };

export const updateRecordAsync =
  (record: RecordItem) => async (dispatch: Dispatch<ActionType>) => {
    const updated = await updateRecordUsingPut(record);
    dispatch(updateRecord(updated));
  };

export const deleteRecordAsync =
  (recordId: number) => async (dispatch: Dispatch<ActionType>) => {
    await deleteRecordUsingDelete(recordId);
    dispatch(deleteRecord(recordId));
  };
