import { call, put, takeLatest, fork } from 'redux-saga/effects';

import * as api from './../services/api';
import * as ActionType from './../constants/ActionType';

function* fetchUserRepos(action) {
    try {
        const message = yield call(api.userReposApi, action.data);
        yield put({ type: ActionType.USER_REPOS_RESPONSE, message });
    } catch (e) {
        yield put({ type: ActionType.USER_REPOS_FAILED, message: e.message });
    }
}

function* userRepos() {
    yield takeLatest(ActionType.USER_REPOS_REQUEST, fetchUserRepos);
}

export default function* root() {
    yield fork(userRepos);
}
