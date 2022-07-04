import axios from "axios";
import { RecordItem } from "../pages/detail/components/record/Record";
import { NewRecordItem } from "../pages/detail/components/recordModal/RecordModal";

// 加入响应拦截器，直接获取其中的data数据
axios.interceptors.response.use(response => response.data);

// 获取某个时间区间内的账单数据
export const getRecordsBetweenRangeUsingGet = (start: number, end: number) => {
  return axios.get<any, RecordItem[]>(
    `http://localhost:3004/records?timeStamp_gte=${start}&timeStamp_lte=${end}`
  );
};

// 新建账单数据
export const createNewRecordUsingPost = (record: NewRecordItem) => {
  return axios.post<any, RecordItem>(`http://localhost:3004/records`, record);
};

// 更新某个账单数据
export const updateRecordUsingPut = (record: RecordItem) => {
  return axios.put<any, RecordItem>(
    `http://localhost:3004/records/${record.id}`,
    record
  );
};

// 删除某个账单数据
export const deleteRecordUsingDelete = (recordId: number) => {
  return axios.delete<any, RecordItem>(
    `http://localhost:3004/records/${recordId}`
  );
};
