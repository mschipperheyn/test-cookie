import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withRouter from 'react-router-dom/withRouter';
import styles from 'screens/siteStyles.css';

const Button = ({ onClick, disabled, transparent, large, type, className, children }) => (
  <button
    className={cx(styles.btn, {
      [styles.btnDisabled]: disabled,
      [styles.btnTransparent]: transparent,
      [styles.btnLarge]: large,
      [className]: className,
    })}
    onClick={onClick}
    disabled={disabled}
    type={type}
  >
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  large: PropTypes.bool,
  transparent: PropTypes.bool,
  type: PropTypes.string,
};

Button.defaultProps = {
  disabled: false,
  large: false,
  transparent: false,
  type: 'button',
  onClick: () => {},
};

const NavButton = withRouter(
  ({ history, to, disabled, transparent, large, className, id, children }) => (
    <button
      className={cx(styles.btn, {
        [styles.btnDisabled]: disabled,
        [styles.btnTransparent]: transparent,
        [styles.btnLarge]: large,
        [className]: className,
      })}
      id={id}
      onClick={() => {
        history.push(to);
      }}
      disabled={disabled}
    >
      {children}
    </button>
  ),
);

NavButton.propTypes = {
  to: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  large: PropTypes.bool,
  transparent: PropTypes.bool,
};

NavButton.defaultProps = {
  disabled: false,
  large: false,
  transparent: false,
  id: null,
};

const LinkButton = withRouter(({ history, to, onHash, disabled, inverse, className, children }) => (
  <button
    className={cx(styles.btnLink, {
      [styles.btnLinkDisabled]: disabled,
      [styles.btnInverse]: inverse,
      [className]: className,
    })}
    onClick={() => {
      if (to.startsWith('#')) {
        onHash(to);
      } else {
        history.push(to);
      }
    }}
    disabled={disabled}
  >
    {children}
  </button>
));

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  inverse: PropTypes.bool,
  onHash: PropTypes.func,
};

LinkButton.defaultProps = {
  disabled: false,
  inverse: false,
  onHash: () => {},
};

export { Button, NavButton, LinkButton };
