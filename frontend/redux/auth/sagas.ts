import { takeLatest, call, put, all } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { Viewer } from "./interfaces";
import { ErrorResponse } from "./interfaces";
import { AuthActionTypes, SignUpStart, SignInStart } from "./action-types";
import {
  signUpSuccess,
  getViewerSuccess,
  signInSuccess,
  signOutSuccess,
  signUpFailure,
  getVieweFailure,
  signInFailure,
  signOutFailure,
} from "./actions";

import { toast } from "react-toastify";
function* signUp({ signUpInput }: SignUpStart) {
  try {
    const response: AxiosResponse<Viewer> = yield call(
      axios.post,
      "/api/auth/signup",
      signUpInput
    );
    const { status, data } = response;
    if (status === 201) {
      yield put(signUpSuccess(data));
    }
  } catch (error: any) {
    yield put(
      signUpFailure((error.response as AxiosResponse<ErrorResponse>).data)
    );
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
      "http://[::1]:3000/signup",
      signInInput
    );
    if (status === 200) {
      yield put(signInSuccess(data));
      toast.success("Đăng kí thành công");
    }
  } catch (error: any) {
    yield put(
      signInFailure((error.response as AxiosResponse<ErrorResponse>).data)
    );
  }
}

function* signOut() {
  try {
    const { status, data }: AxiosResponse<boolean> = yield call(
      axios.post,
      "/api/auth/signout",
      null
    );
    if (status === 200) {
      yield put(signOutSuccess(data));
      //   yield call(logout);
    }
  } catch (error: any) {
    yield put(
      signOutFailure((error.response as AxiosResponse<ErrorResponse>).data)
    );
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
function* onSignOutStart() {
  yield takeLatest(AuthActionTypes.signOutStart, signOut);
}

export function* authSagas(): Generator {
  yield all([
    call(onSignUpStart),
    call(onGetViewerStart),
    call(onSignInStart),
    call(onSignOutStart),
  ]);
}
