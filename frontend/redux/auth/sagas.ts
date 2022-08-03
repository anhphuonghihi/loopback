import { takeLatest, call, put, all } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { Viewer } from "./interfaces";
import { ErrorResponse } from "./interfaces";
import { AuthActionTypes, SignUpStart, SignInStart } from "./action-types";
import {
  signUpSuccess,
  getViewerSuccess,
  signInSuccess,
  signUpFailure,
  getVieweFailure,
  signInFailure,
} from "./actions";

import { toast } from "react-toastify";
function* signUp({ signUpInput }: SignUpStart) {
  try {
    const response: AxiosResponse<Viewer> = yield call(
      axios.post,
      "http://[::1]:3000/signup",
      signUpInput
    );
    const { status, data } = response;
    if (status === 200) {
      yield put(signUpSuccess(data));
      toast.success("Đăng kí thành công");
    }
  } catch (error: any) {
    yield put(
      signUpFailure((error.response as AxiosResponse<ErrorResponse>).data)
    );
    const err: any = (error.response as AxiosResponse<ErrorResponse>).data;
    toast.error(err.error.message);
  }
}

function* getViewer() {
  try {
    const { status, data }: AxiosResponse<{ viewer: Viewer | null }> =
      yield call(axios.get, "/api/auth/viewer");
    if (status === 200) {
      yield put(getViewerSuccess(data));
    }
  } catch (error: any) {
    yield put(
      getVieweFailure((error.response as AxiosResponse<ErrorResponse>).data)
    );
  }
}

function* signIn({ signInInput }: SignInStart) {
  try {
    const { status, data }: AxiosResponse<Viewer> = yield call(
      axios.post,
      "http://[::1]:3000/users/refresh-login",
      signInInput
    );
    if (status === 200) {
      yield put(signInSuccess(data));
      toast.success("Đăng nhập thành công");
    }
  } catch (error: any) {
    yield put(
      signInFailure((error.response as AxiosResponse<ErrorResponse>).data)
    );
    const err: any = (error.response as AxiosResponse<ErrorResponse>).data;
    err.error.message && toast.error(err.error.message);
  }
}


function* onSignUpStart() {
  yield takeLatest(AuthActionTypes.signUpStart, signUp);
}
function* onGetViewerStart() {
  yield takeLatest(AuthActionTypes.getViewerStart, getViewer);
}
function* onSignInStart() {
  yield takeLatest(AuthActionTypes.signInStart, signIn);
}

export function* authSagas(): Generator {
  yield all([
    call(onSignUpStart),
    call(onGetViewerStart),
    call(onSignInStart),
  ]);
}
