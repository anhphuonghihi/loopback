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
  STUDENT_LIST_EDIT_SUCCESS,
  STUDENT_LIST_EDIT,
  STUDENT_LIST_EDIT_FAILED,
} from "./action-types";
import {
  STUDENT_LIST_DELETE_SUCCESS,
  STUDENT_LIST_DELETE,
  STUDENT_LIST_DELETE_FAILED,
} from "./action-types";

import {
  STUDENT_LIST_GET_SUCCESS,
  STUDENT_LIST_GET,
  STUDENT_LIST_GET_FAILED,
} from "./action-types";

export const initialState = {
  student: [],
  loading: false,
  editstudent: [],
};

export const studentReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case STUDENT_LIST:
      return {
        ...state,
        editstudent: [],
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
        editstudent: [],
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
      const newStudent = state.student.filter(
        (student: any) => student.id !== action.id
      );
      return {
        ...state,
        student: [...newStudent],
        loading: true,
      };
    case STUDENT_LIST_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case STUDENT_LIST_DELETE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error || [],
      };
    case STUDENT_LIST_GET:
      return {
        ...state,
        loading: true,
      };
    case STUDENT_LIST_GET_SUCCESS:
      return {
        ...state,
        editstudent: action.student,
        loading: false,
      };
    case STUDENT_LIST_GET_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error || [],
      };
    case STUDENT_LIST_EDIT:
      return {
        ...state,
        loading: true,
      };
    case STUDENT_LIST_EDIT_SUCCESS:
      // const newStudent = state.student.filter((item) =>
      //   item._id === action.payload._id ? action.payload.todo : item
      // );
      return {
        ...state,
        // student: [...newStudent],
        loading: false,
      };
    case STUDENT_LIST_EDIT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error || [],
      };
    default:
      return state;
  }
};
