import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import withRouter from 'react-router-dom/withRouter';

import { Grid, Row, Col } from 'components/flexbox';

import Title from 'components/Title';
import ContentBox from 'components/ContentBox';
import Menu from 'components/admin/Menu';
import styles from 'screens/siteStyles.css';

class AdminRoute extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>Admin</title>
        </Helmet>
        <Title />
        <Grid>
          <Row className={styles.contentBoxNeg}>
            <Col xs={12}>
              <ContentBox>
                <h2>Admin</h2>
                <Menu />
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
    state => ({}),
    dispatch => ({
      dispatch,
    }),
    null,
    {
      pure: false,
    },
  )(AdminRoute),
);
