import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Route from 'react-router-dom/Route';
import Redirect from 'react-router-dom/Redirect';
import withRouter from 'react-router-dom/withRouter';
import { LoadingBox as Loading } from 'components/Loading';
import * as userActions from 'modules/user/actions/userActions';

class PrivateRoute extends React.Component {
  async componentDidMount() {
    const { actions, lastCheck, loggedIn } = this.props;

    if (!loggedIn && lastCheck === -1) await actions.checkLogin();
  }

  render() {
    const { component: Component, lastCheck, ...rest } = this.props;
    if (lastCheck === -1) return <Loading />;

    return (
      <Route
        {...rest}
        render={props =>
          (rest.loggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/admin/login',
                state: { from: props.location },
              }}
            />
          ))}
      />
    );
  }
}

PrivateRoute.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  lastCheck: PropTypes.number.isRequired,
  component: PropTypes.any.isRequired,
};

export default withRouter(
  connect(
    state => ({
      loggedIn: state.user.authenticated,
      lastCheck: state.user.lastCheck,
    }),
    dispatch => ({
      actions: bindActionCreators(userActions, dispatch),
    }),
  )(PrivateRoute),
);
