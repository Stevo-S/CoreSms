import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainWrapper from '../MainWrapper';
import NotFound404 from '../../DefaultPage/404/index';
import LockScreen from '../../Account/LockScreen/index';
import LogIn from '../../Account/LogIn/index';
import LogInPhoto from '../../Account/LogInPhoto/index';
import Register from '../../Account/Register/index';
import RegisterPhoto from '../../Account/RegisterPhoto/index';
import ResetPassword from '../../Account/ResetPassword/index';
import ResetPasswordPhoto from '../../Account/ResetPasswordPhoto';
import WrappedRoutes from './WrappedRoutes';
import AuthorizeRoute from '../../../components/api-authorization/AuthorizeRoute';
import { ApplicationPaths } from '../../../components/api-authorization/ApiAuthorizationConstants';
import ApiAuthorizationRoutes from '../../../components/api-authorization/ApiAuthorizationRoutes';
import { FetchData } from '../../../components/FetchData';
import { Home } from '../../../components/Home';
import { Login } from '../../../components/api-authorization/Login';
import Layout from '../../Layout';
import { NavMenu } from '../../../components/NavMenu';


const Router = () => (
  <MainWrapper>
    <main>
   
      <Switch>
        
        
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
        <Route path="/404" component={NotFound404} />
        <Route path="/lock_screen" component={LockScreen} />
        <Route path="/log_in_photo" component={LogInPhoto} />
        <Route path="/register" component={Register} />
        <Route path="/register_photo" component={RegisterPhoto} />
        <Route path="/reset_password" component={ResetPassword} />
        <Route path="/reset_password_photo" component={ResetPasswordPhoto} />
        <AuthorizeRoute path="/" component={WrappedRoutes} />
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;