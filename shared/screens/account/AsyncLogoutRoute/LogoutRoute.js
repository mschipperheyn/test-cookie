import React from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router-dom/withRouter';

import * as userActions from 'modules/user/actions/userActions';

class LogoutRoute extends React.PureComponent {
  async componentDidMount() {
    const { dispatch, history } = this.props;

    await this.props.dispatch(userActions.logout());
    history.replace('/');
  }

  render() {
    return null;
  }
}

export default withRouter(
  connect(
    () => ({}),
    dispatch => ({
      dispatch,
    }),
  )(LogoutRoute),
);
