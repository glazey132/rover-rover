/* Redux */
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/index'
/* redux middleware */
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'

export default function configureStore() {
    const middleware = []
    const sagaMiddleware = createSagaMiddleware()
    // middleware.push(createLogger())
    // middleware.push(sagaMiddleware)

    return {
        ...createStore(rootReducer, applyMiddleware(sagaMiddleware)),
        runSaga: sagaMiddleware.run,
    }
}