/* Redux */
import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from '../reducers/index'
/* redux middleware */
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'

export default function configureStore() {
    const logger = createLogger()
    const sagaMiddleware = createSagaMiddleware()
    const middleware = [logger, sagaMiddleware]
    
    return {
        ...createStore(rootReducer, compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())),
        runSaga: sagaMiddleware.run,
    }
}