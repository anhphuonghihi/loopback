import {
  STUDENT_LIST_SUCCESS,
  STUDENT_LIST,
  STUDENT_LIST_FAILED,
} from "./action-types";

import {
  STUDENT_LIST_ADD_SUCCESS,
  STUDENT_LIST_ADD,
  STUDENT_LIST_ADD_FAILED,
} from "./action-types";
export const initialState = {
  student: [],
  loading: false,
};

export const studentReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case STUDENT_LIST:
      return {
        ...state,
        loading: true,
      };
    case STUDENT_LIST_SUCCESS:
      return {
        ...state,
        student: action.student,
        loading: false,
      };
    case STUDENT_LIST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error || [],
      };
    case STUDENT_LIST_ADD:
      return {
        ...state,
        loading: true,
      };
    case STUDENT_LIST_ADD_SUCCESS:
      console.log("🚀 ~ file: reducer.ts ~ line 45 ~ studentReducer ~ action", action)
      return {
        ...state,
        student: [...state.student, action.student],
        loading: false,
      };
    case STUDENT_LIST_ADD_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error || [],
      };
    default:
      return state;
  }
};
