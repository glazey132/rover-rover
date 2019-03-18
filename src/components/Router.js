import React from 'react';
import { Route } from 'react-router-dom';
import CuriousityContainer from '../containers/CuriousityContainer';
import OpportunityContainer from '../containers/OpportunityContainer';
import SpiritContainer from '../containers/SpiritContainer';

import App from '../App';

function Router() {
  return (
    <div>
      <Route path={'/'} exact component={App} />
      <Route path={'/opportunity'} exact component={OpportunityContainer} />
      <Route path={'/curiousity'} exact component={CuriousityContainer} />
      <Route path={'/spirit'} exact component={SpiritContainer} />
    </div>
  )
}

export default Router;
