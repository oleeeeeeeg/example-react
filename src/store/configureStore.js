import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware, { END } from 'redux-saga';

import App from './../reducers';

export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        App,
        initialState,
        compose(applyMiddleware(
            sagaMiddleware,
            // / #if PROD != true
            createLogger(),
            // / #endif
        )),
    );
    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);
    return store;
}
