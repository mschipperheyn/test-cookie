import React from 'react';
import { connect } from 'react-redux';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import withRouter from 'react-router-dom/withRouter';

import AsyncLoginRoute from 'screens/account/AsyncLoginRoute';
import AsyncLogoutRoute from 'screens/account/AsyncLogoutRoute';
import AsyncHomeRoute from 'screens/account/AsyncHomeRoute';
import AsyncAdminHomeRoute from 'screens/admin/AsyncAdminHomeRoute';

import PrivateRoute from './PrivateRoute';

class Routes extends React.PureComponent {
  getRoutes() {
    return (
      <Switch>
        <Route exact path="/" component={AsyncHomeRoute} />
        <Route path="/admin/login" component={AsyncLoginRoute} />
        <Route path="/admin/logout" component={AsyncLogoutRoute} />

        <PrivateRoute path="/admin" component={AsyncAdminHomeRoute} />
      </Switch>
    );
  }

  render() {
    return <div>{this.getRoutes()}</div>;
  }
}

export default withRouter(connect(state => ({}), dispatch => ({}))(Routes));
