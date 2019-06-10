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

    const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
         // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

    const enhancer = composeEnhancers(applyMiddleware(...middleware))
    
    return {
        ...createStore(rootReducer, enhancer),
        runSaga: sagaMiddleware.run,
    }
}