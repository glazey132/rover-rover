import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
/* Redux */
import { Provider } from 'react-redux';
/* Redux Saga */
import watchRequestCmeData from './redux/sagas/index' 
/* Redux ends here */
import Router from './components/Router';
import configureStore from './redux/store/configureStore';
import * as serviceWorker from './serviceWorker';


const store = configureStore()
store.runSaga(watchRequestCmeData)
  


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path={'/'} component={Router} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
