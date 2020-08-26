import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { peopleCreate } from '../../../Target/People/peopleCreate';
import { peopleView } from '../../../Target/People/peopleView';
import CSV from '../../../CSV';



export default () => (
  <Switch>
    <Route path="/target/people" component={peopleView} />
    <Route path="/target/addpeople" component={peopleView} />
    <Route path="/target/import" component={CSV} />
  </Switch>
);
