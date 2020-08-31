import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { peopleCreate } from '../../../Target/People/peopleCreate';
import { peopleView } from '../../../Target/People/peopleViews';
import CSV from '../../../CSV';
import AuthorizeRoute from '../../../../components/api-authorization/AuthorizeRoute';



export default () => (
  <Switch>
    <AuthorizeRoute path="/target/people" component={peopleView} />
    <Route path="/target/addpeople" component={peopleView} />
    <Route path="/target/import" component={CSV} />
  </Switch>
);
