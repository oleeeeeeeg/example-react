import * as ActionType from './../constants/ActionType';

export const userReposRequest = data => ({
    type: ActionType.USER_REPOS_REQUEST,
    data,
});

export const changeSortField = data => ({
    type: ActionType.CHANGE_SORT_FIELD,
    data,
});
export const changeSortOrder = data => ({
    type: ActionType.CHANGE_SORT_ORDER,
    data,
});
export const changeFilter = data => ({
    type: ActionType.CHANGE_FILTER,
    data,
});
export const changePage = data => ({
    type: ActionType.CHANGE_PAGE,
    data,
});
export const changeCurrentRepo = data => ({
    type: ActionType.CHANGE_CURRENT_REPO,
    data,
});
