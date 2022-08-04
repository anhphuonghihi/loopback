import { takeLatest, call, put, all } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { Student } from "./interfaces";
import { ErrorResponse } from "./interfaces";
import { STUDENT_LIST, STUDENT_LIST_ADD } from "./action-types";
import {
  getStudentStart,
  getStudentSuccess,
  getStudentFailure,
  addStudentSuccess,
  addStudentFailure,
} from "./actions";

import { toast } from "react-toastify";

function* getStudent() {
  try {
    const accessToken: any =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;
    const { status, data }: AxiosResponse<{ student: Student | null }> =
      yield call(axios.get, "http://[::1]:3000/students", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    if (status === 200) {
      yield put(getStudentSuccess(data));
    }
  } catch (error: any) {
    yield put(
      getStudentFailure((error.response as AxiosResponse<ErrorResponse>).data)
    );
  }
}
function* addStudent({ studentInput }: any) {
  try {
    const { firstName, lastName, gender, classroomId } = studentInput;
    console.log(
      "🚀 ~ file: sagas.ts ~ line 39 ~ function*addStudent ~ firstName",
      firstName
    );
    const accessToken: any =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;
    const { status, data }: AxiosResponse<{ student: Student | null }> =
      yield call(
        axios.post,
        "http://[::1]:3000/students",
        { firstName, lastName, gender, classroomId },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

    if (status === 200) {
      yield put(addStudentSuccess(data));
      toast.success("Thêm sinh viên thành công");
    }
  } catch (error: any) {
    yield put(
      addStudentFailure((error.response as AxiosResponse<ErrorResponse>).data)
    );
    const err: any = (error.response as AxiosResponse<ErrorResponse>).data;
    err.error.message && toast.error(err.error.message);
  }
}
function* onGetStudent() {
  yield takeLatest(STUDENT_LIST, getStudent);
}
function* onAddStudent() {
  yield takeLatest(STUDENT_LIST_ADD, addStudent);
}

export function* studentSagas(): Generator {
  yield all([call(onGetStudent), call(onAddStudent)]);
}
