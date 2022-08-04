import { all, call } from 'redux-saga/effects';
import { authSagas } from './auth/sagas';
import { studentSagas } from './student/sagas';
export function* rootSaga(): Generator {
  yield all([call(authSagas),call(studentSagas)]);
}