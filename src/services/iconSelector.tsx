import { EXPENDITURE_ICON_LIST, INCOME_ICON_LIST } from "../constants";
import { RecordType } from "../pages/detail/components/record/Record";

export const getIconByName = (type: RecordType, name: string) => {
  const list =
    type === RecordType.Income ? INCOME_ICON_LIST : EXPENDITURE_ICON_LIST;

  // find返回可能为空，但结合业务逻辑来说，
  // 并不会出现这种情况，所以这里可以使用非空断言
  return list.find(item => item.name === name)!;
};
