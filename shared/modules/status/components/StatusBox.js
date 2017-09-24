import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class StatusBox extends React.PureComponent {

    constructor(props) {

        super(props);

    }

    render() {

        const { type, visible, autoHide, showButton, onDismiss, onHide, location, text } = this.props;

        const statusClasses = classNames('alert', {
            'hidden' : !visible,
            'alert-danger' : type === 'error',
            'alert-warning' : type === 'warn',
            'alert-success' : type === 'success',
        });

        const iconClasses = classNames('icon', 'icon-info');

        return (
      <div className={statusClasses}>
        <span className={iconClasses}/>
        <ul>
          <li>{text}</li>
        </ul>
      </div>
        );
    }
}

StatusBox.propTypes = {
    visible : PropTypes.bool,
  // autoHide    : PropTypes.bool,
    type : PropTypes.oneOf(['warn', 'info', 'error', 'success']).isRequired,
};

StatusBox.defaultProps = {
    visible : false,
};
