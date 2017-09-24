import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import withRouter from 'react-router-dom/withRouter';
import Link from 'react-router-dom/Link';

import { Grid, Row, Col } from 'components/flexbox';

import Title from 'components/Title';
import ContentBox from 'components/ContentBox';
import styles from 'screens/siteStyles.css';

class HomeRoute extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <Title />
        <Grid>
          <Row className={styles.contentBoxNeg}>
            <Col xs={12}>
              <ContentBox>
                Not logged in Home <Link to="/admin">Go to Admin</Link>
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
  )(HomeRoute),
);
