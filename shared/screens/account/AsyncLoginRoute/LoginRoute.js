import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import withRouter from 'react-router-dom/withRouter';

import { Grid, Col, Row } from 'components/flexbox';
import * as formFunctions from 'modules/forms/functions/formFunctions';
import * as userActions from 'modules/user/actions/userActions';
import LoginForm from 'modules/user/forms/LoginForm';
import Title from 'components/Title';
import ContentBox from 'components/ContentBox';
import styles from 'screens/siteStyles.css';

const FORM = 'loginForm';

class LoginRoute extends React.PureComponent {
  handleSubmit = (data, dispatch) =>
    formFunctions.asyncValidate(userActions.login(data), FORM, dispatch);

  handleSubmitSuccess = () => {
    const { history, dispatch } = this.props;
    dispatch(reset(FORM));
    history.push('/admin');
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <Title />
        <Grid>
          <Row className={styles.contentBoxNeg}>
            <Col xs={12}>
              <ContentBox>
                <h2>Login</h2>
                <p />
                <LoginForm
                  onSubmit={this.handleSubmit}
                  onSubmitSuccess={this.handleSubmitSuccess}
                />
              </ContentBox>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default withRouter(
  connect(
    () => ({}),
    dispatch => ({
      dispatch,
    }),
  )(LoginRoute),
);
