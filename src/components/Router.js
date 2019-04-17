import React from 'react';
import { Route } from 'react-router-dom';
import CuriosityContainer from '../containers/CuriosityContainer';
import OpportunityContainer from '../containers/OpportunityContainer';
import SpiritContainer from '../containers/SpiritContainer';

import App from '../App';

function Router() {
  return (
    <div>
      <Route path={'/'} exact component={App} />
      <Route path={'/opportunity'} exact component={OpportunityContainer} />
      <Route path={'/curiosity'} exact component={CuriosityContainer} />
      <Route path={'/spirit'} exact component={SpiritContainer} />
    </div>
  )
}

export default Router;
