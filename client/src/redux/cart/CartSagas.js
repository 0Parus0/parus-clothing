import { all, call, put, takeLatest } from 'redux-saga/effects';

import UserActionsTypes from '../user/userTypes';
import { clearCart } from './CartAction';

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionsTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut)
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess)])
}