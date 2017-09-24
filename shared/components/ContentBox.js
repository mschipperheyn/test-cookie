import React from 'react';
import cx from 'classnames';
import styles from './contentBox.css';

const ContentBox = ({ image, children, className }) =>
  (<div className={cx(styles.contentBox, className)}>
    {children}
  </div>);

const ContentColumn = ({ children, className }) =>
  (<div className={cx(styles.contentColumn, className)}>
    {children}
  </div>);

export { ContentBox as default, ContentColumn };
