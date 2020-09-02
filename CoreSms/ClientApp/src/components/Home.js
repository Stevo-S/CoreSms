import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import { Redirect } from 'react-router';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <Redirect to='/peopleView'  />
         </div>
    );
  }
}
