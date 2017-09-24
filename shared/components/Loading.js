import React from 'react';
import PropTypes from 'prop-types';
import styles from './loading.css';

const Loading = ({ width, height, borderWidth }) =>
  (<svg
    width={`${width}px`}
    height={`${height}px`}
    viewBox={`0 0 ${width + 1} ${height + 1}`}
    className={styles.svgSpinner}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      fill="none"
      strokeWidth={borderWidth}
      strokeLinecap="round"
      cx={(width + 1) / 2}
      cy={(height + 1) / 2}
      r={(width - borderWidth) / 2}
      className={styles.circleSpinner}
    />
  </svg>);

const propTypes = {
  colors: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  borderWidth: PropTypes.number,
};

const defaultProps = {
  colors: ['#4285F4', '#DE3E35', '#F7C223', '#1B9A59', '#4285F4'],
  width: 65,
  height: 65,
  borderWidth: 6,
};

Loading.propTypes = propTypes;
Loading.defaultProps = defaultProps;

const LoadingBox = props =>
  (<div className={styles.loadingBox}>
    <Loading {...props} />
  </div>);

LoadingBox.propTypes = propTypes;
LoadingBox.defaultProps = defaultProps;

export { Loading as default, LoadingBox };
