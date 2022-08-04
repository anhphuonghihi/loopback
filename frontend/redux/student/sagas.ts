import { takeLatest, call, put, all } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { Student } from "./interfaces";
import { ErrorResponse } from "./interfaces";
import {
  STUDENT_LIST,
  STUDENT_LIST_ADD,
  STUDENT_LIST_DELETE,
  STUDENT_LIST_GET,
  STUDENT_LIST_EDIT,
} from "./action-types";

import {
  getStudentSuccess,
  getStudentFailure,
  addStudentSuccess,
  addStudentFailure,
  deleteStudentSuccess,
  deleteStudentFailure,
  getEditStudentSuccess,
  getEditStudentFailure,
  editStudentSuccess,
  editStudentFailure,
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

function* deleteStudent({ id }: any) {
  try {
    const accessToken: any =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;
    const { status, data }: AxiosResponse<{ student: Student | null }> =
      yield call(axios.delete, `http://[::1]:3000/students/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

    if (status === 204) {
      yield put(deleteStudentSuccess(data));
      toast.success("Xóa sinh viên thành công");
    }
  } catch (error: any) {
    yield put(
      deleteStudentFailure(
        (error.response as AxiosResponse<ErrorResponse>).data
      )
    );
  }
}
function* getEditStudent({ id }: any) {
  try {
    const accessToken: any =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;
    const { status, data }: AxiosResponse<{ student: Student | null }> =
      yield call(axios.get, `http://[::1]:3000/students/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    if (status === 200) {
      yield put(getEditStudentSuccess(data));
    }
  } catch (error: any) {
    yield put(
      getEditStudentFailure(
        (error.response as AxiosResponse<ErrorResponse>).data
      )
    );
  }
}
function* editStudent(studentEdit: any) {
  console.log(
    "🚀 ~ file: sagas.ts ~ line 124 ~ function*editStudent ~ studentEdit",
    studentEdit
  );
  try {
    const { firstName, lastName, gender, classroomId, edit } =
      studentEdit.studentInput;
    console.log(
      "🚀 ~ file: sagas.ts ~ line 132 ~ function*editStudent ~ edit",
      edit
    );
    const accessToken: any =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;
    const { status, data }: AxiosResponse<{ student: Student | null }> =
      yield call(
        axios.put,
        `http://[::1]:3000/students/${edit}`,
        { firstName, lastName, gender, classroomId },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
    if (status === 204) {
      yield put(editStudentSuccess(data));
      toast.success("Sửa sinh viên thành công");
    }
  } catch (error: any) {
    yield put(
      editStudentFailure((error.response as AxiosResponse<ErrorResponse>).data)
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
function* onDeleteStudent() {
  yield takeLatest(STUDENT_LIST_DELETE, deleteStudent);
}
function* onGetEditStudent() {
  yield takeLatest(STUDENT_LIST_GET, getEditStudent);
}
function* onEditStudent() {
  yield takeLatest(STUDENT_LIST_EDIT, editStudent);
}
export function* studentSagas(): Generator {
  yield all([
    call(onGetStudent),
    call(onAddStudent),
    call(onDeleteStudent),
    call(onGetEditStudent),
    call(onEditStudent),
  ]);
}
