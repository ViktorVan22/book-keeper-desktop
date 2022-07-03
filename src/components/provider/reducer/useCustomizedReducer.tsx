import { useMemo, useReducer } from "react";
import { reducer, defaultState } from "./reducer";

// 自定义的 hook 需要使用 use 开头
export const useCustomizedReducer = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return { state, dispatch };
};
