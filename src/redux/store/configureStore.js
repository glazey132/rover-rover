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
        ...createStore(rootReducer, applyMiddleware(...middleware)),
        runSaga: sagaMiddleware.run,
    }
}