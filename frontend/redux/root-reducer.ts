import { combineReducers, AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { authReducer, initialState as authState } from "./auth/reducer";
export interface AppState {
  auth: any;
}
export const appInitialState: AppState = {
  auth: authState,
};
export const appReducer = combineReducers({
  auth: authReducer,
});
export const rootReducer = (state: Readonly<AppState> | undefined, action: AnyAction): AppState => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };

    default:
      return appReducer(state, action);
  }
};