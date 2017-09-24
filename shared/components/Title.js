import React from 'react';
import { Grid, Row, Col } from 'components/flexbox';
import styles from 'screens/siteStyles.css';

const Title = () => (
  <div className={styles.headerTop}>
    <Grid>
      <Row>
        <Col xs={12} sm={8}>
          <h1>Cookie problem</h1>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default Title;
