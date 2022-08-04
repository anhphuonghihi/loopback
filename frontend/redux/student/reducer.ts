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

import {
  STUDENT_LIST_DELETE_SUCCESS,
  STUDENT_LIST_DELETE,
  STUDENT_LIST_DELETE_FAILED,
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
    case STUDENT_LIST_DELETE:
      return {
        ...state,
        loading: true,
      };
    case STUDENT_LIST_DELETE_SUCCESS:
      const newStudent = state.student.filter(
        (student: any) => 
        console.log("🚀 ~ file: reducer.ts ~ line 67 ~ studentReducer ~ student.id", student.id)
      );
      console.log("🚀 ~ file: reducer.ts ~ line 68 ~ studentReducer ~ newStudent", newStudent)
      return {
        ...state,
        student: [...newStudent],
        loading: false,
      };

    case STUDENT_LIST_DELETE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error || [],
      };
    default:
      return state;
  }
};
