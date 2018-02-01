import * as ActionType from './../constants/ActionType';
import SortField from '../constants/SortField';
import SortOrder from '../constants/SortOrder';

const initialState = {
    sortField: SortField.ID,
    sortOrder: SortOrder.ASCENDING,
    filters: [
        {
            field: SortField.ID,
            value: '',
        },
        {
            field: SortField.NAME,
            value: '',
        },
        {
            field: SortField.STARS,
            value: '',
        },
        {
            field: SortField.FORKS,
            value: '',
        },
        {
            field: SortField.WATCHERS,
            value: '',
        },
    ],
    itemsOnPage: 5,
    pageNumber: 1,
    currentRepoId: 0,
};

export default function userRepos(state = initialState, action) {
    switch (action.type) {
    case ActionType.CHANGE_SORT_ORDER: {
        return Object.assign({}, state, { sortOrder: !state.sortOrder });
    }
    case ActionType.CHANGE_SORT_FIELD: {
        return Object.assign({}, state, {
            sortField: action.data,
            sortOrder: SortOrder.ASCENDING,
        });
    }
    case ActionType.CHANGE_FILTER: {
        const currentFilter = state.filters.find(filter => filter.field === action.data.field);
        currentFilter.value = action.data.value;
        return Object.assign({}, state);
    }
    case ActionType.CHANGE_PAGE: {
        return Object.assign({}, state, { pageNumber: action.data });
    }
    case ActionType.CHANGE_CURRENT_REPO: {
        return Object.assign({}, state, { currentRepoId: action.data });
    }
    default:
        return state;
    }
}
