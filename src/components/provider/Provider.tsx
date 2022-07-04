import React, { createContext, Dispatch, FC, useEffect } from "react";
import { fetchRecordsAsync } from "./reducer/asyncActions";
import { State } from "./reducer/reducer";
import {
  EnhancedActionType,
  useCustomizedReducer,
} from "./reducer/useCustomizedReducer";

// 创建 context
export const Context = createContext<{
  state: State;
  dispatch: (action: EnhancedActionType) => void;
}>(null as any); // 我们并不关心此时的默认值，因为它会被后续传入值覆盖，所以直接赋值为 null

interface ProviderProps {
  children: React.ReactElement;
}

export const Provider: FC<ProviderProps> = ({ children }) => {
  const store = useCustomizedReducer();

  // 在每次month改变后重新获取数据
  useEffect(() => {
    store.dispatch(fetchRecordsAsync(store.state.month));
  }, [store.state.month]);

  // 使用 Context 中的 Provider 组件，并传入自定义 hook 中的返回值
  return <Context.Provider value={store}>{children}</Context.Provider>;
};
