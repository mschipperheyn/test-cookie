import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import { Row, Col } from 'components/flexbox';
import {
  validateEmail,
  validateRequired,
  normalizeLowercase,
} from 'modules/forms/functions/formFunctions';
import TextInput from 'components/form/TextInput';
import FormMessage, { SUCCESS, ERROR } from 'components/form/FormMessage';
import { Button } from 'components/Buttons';
import { LoadingBox as Loading } from 'components/Loading';
import siteStyles from 'screens/siteStyles.css';
import styles from 'screens/form.css';

const FORM = 'loginForm';

const validate = (data) => {
  const errors = {};

  ['email', 'password'].forEach(field => validateRequired(data, field, errors));

  ['email'].forEach(field => validateEmail(data, field, errors));

  return errors;
};

const inputField = field => <TextInput field={field} />;

const LoginForm = ({
  submitting,
  submitFailed,
  valid,
  pristine,
  submitSucceeded,
  handleSubmit,
}) => {
  const submittingOverlay = submitting ? (
    <div className={styles.submitOverlay}>
      <Loading />
    </div>
  ) : null;

  let message = null;
  if (!valid && submitFailed) {
    message = <FormMessage type={ERROR}>Por favor, complete o formulário.</FormMessage>;
  } else if (submitFailed) {
    message = <FormMessage type={ERROR}>Falha na submissão. Tenta de novo.</FormMessage>;
  } else if (submitSucceeded) {
    message = <FormMessage type={SUCCESS}>Redirecting...</FormMessage>;
  }

  return (
    <div className={styles.form}>
      <Row className={siteStyles.noRowPadding}>
        <Col xs={12} sm={8} smOffset={2} lg={6} lgOffset={3} className={styles.formCol}>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Login</legend>

              <Field
                id="email"
                name="username"
                type="email"
                autoFocus
                component={inputField}
                label="E-mail"
                placeholder="E-mail"
                normalize={normalizeLowercase}
              />

              <Field
                id="password"
                name="password"
                component={inputField}
                type="password"
                label="Senha"
                placeholder="Senha"
              />

              <div className={styles.submitBox}>
                {message}
                {submitting ? (
                  <Button disabled onClick={() => {}}>
                    ...Um momento
                  </Button>
                ) : (
                  <Button type="submit">Enviar indicação</Button>
                )}
              </div>
            </fieldset>
          </form>
        </Col>
      </Row>

      {submittingOverlay}
    </div>
  );
};

export default reduxForm({
  form: FORM,
  validate,
})(LoginForm);
