import { combineReducers } from 'redux';

import userRepos from './userRepos';
import appState from './appState';

const App = combineReducers({
    userRepos,
    appState,
});

export default App;
