import { Dispatch, useCallback, useMemo, useReducer } from "react";
import { ActionType } from "./actions";
import { reducer, defaultState } from "./reducer";

// dispatch可以接受的参数除了是ActionType类型，也可以是以dispatch为参数的函数
export type EnhancedActionType =
  | ActionType
  | ((d: Dispatch<ActionType>) => void);

export const useCustomizedReducer = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  // 使用useCallback存储回调，不用每次都使用重新创建的新回调
  const enhancedDispatch = useCallback(
    (action: EnhancedActionType) => {
      // 如果action是一个函数，则调用这个函数，并传入dispatch
      if (typeof action === "function") {
        return action(dispatch);
      } else {
        // 如果是一个对象，使用方法照旧
        return dispatch(action);
      }
    },
    [dispatch]
  );

  return { state, dispatch: enhancedDispatch };
};
