import { combineReducers, AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { authReducer, initialState as authState } from "./auth/reducer";
import { studentReducer, initialState as studentState } from "./student/reducer";
export interface AppState {
  auth: any;
  student:any;
}
export const appInitialState: AppState = {
  auth: authState,
  student:studentState
};
export const appReducer = combineReducers({
  auth: authReducer,
  student:studentReducer
});
export const rootReducer = (state: Readonly<AppState> | undefined, action: AnyAction): AppState => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };

    default:
      return appReducer(state, action);
  }
};
