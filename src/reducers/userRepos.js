import * as ActionType from './../constants/ActionType';

const initialState = {
    repos: [],
};

export default function userRepos(state = initialState, action) {
    switch (action.type) {
    case ActionType.USER_REPOS_RESPONSE: {
    	return Object.assign({}, state, { repos: action.message });
    }
    default:
        return state;
    }
}
