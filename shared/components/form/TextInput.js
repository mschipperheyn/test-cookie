import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './textInput.css';

const TextInput = ({ field }) => (
  <div
    className={cx(styles.formInput, {
      [styles.formInputError]: (field.meta.touched || field.mayDisplayError) && field.meta.error,
      [styles.formInputActive]: field.meta.active,
    })}
  >
    <input
      {...field.input}
      type={field.type || 'text'}
      autoFocus={field.autoFocus}
      placeholder={field.placeholder}
      id={field.id}
    />
    <label>
      {(field.meta.touched || field.mayDisplayError) && field.meta.error ? (
        field.meta.error
      ) : (
        field.label
      )}
    </label>
  </div>
);

TextInput.propTypes = {
  field: PropTypes.any.isRequired,
};

export default TextInput;
