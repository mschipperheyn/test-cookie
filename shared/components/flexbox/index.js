import React from 'react';
import PropTypes from 'prop-types';
import styles from 'screens/siteStyles.css';
import Grid from './components/Grid';

const GridWithGutter = ({ children }) => <Grid className={styles.gridGutter}>{children}</Grid>;

GridWithGutter.propTypes = {
  fluid: PropTypes.bool,
  className: PropTypes.string,
  tagName: PropTypes.string,
  children: PropTypes.node,
};

export Grid from './components/Grid';
// export { GridWithGutter as Grid };
export Row, { getRowProps } from './components/Row';
export Col, { getColumnProps } from './components/Col';
