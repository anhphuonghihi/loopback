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
import { Student, ErrorResponse } from "./interfaces";
export const getStudentStart = (): any => ({
  type: STUDENT_LIST,
});

export const getStudentSuccess = (student: any): any => ({
  type: STUDENT_LIST_SUCCESS,
  student,
});
export const getStudentFailure = (errorResponse: ErrorResponse): any => ({
  type: STUDENT_LIST_FAILED,
  errorResponse,
});

export const addStudentStart = (studentInput: any): any => ({
  type: STUDENT_LIST_ADD,
  studentInput,
});

export const addStudentSuccess = (student: any): any => ({
  type: STUDENT_LIST_ADD_SUCCESS,
  student,
});
export const addStudentFailure = (errorResponse: ErrorResponse): any => ({
  type: STUDENT_LIST_ADD_FAILED,
  errorResponse,
});

