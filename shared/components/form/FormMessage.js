import React from 'react';
import cx from 'classnames';
import styles from './formMessage.css';

const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';

const FormMessage = ({ type, children }) =>
  (<div
    className={cx(styles.formMessage, {
      [styles.formError]: type === ERROR,
      [styles.formSuccess]: type === SUCCESS,
    })}
  >
    {children}
  </div>);

export { FormMessage as default, SUCCESS, ERROR };
