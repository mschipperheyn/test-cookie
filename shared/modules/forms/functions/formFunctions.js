import { SubmissionError } from 'redux-form';
import {
  hideStatus,
  showFormException,
  hideFormException,
  showGeneralError,
} from '../../status/actions/statusActions';
import { dbg } from '../../../utils';

function convertErrors(errors) {
  if (!(errors instanceof Array)) console.error('Wrong type of errors array supplied', errors);

  const oErrors = {};

  for (const err of errors) oErrors[err.field || '_error'] = err.message;

  return oErrors;
}

export async function asyncValidate(action, form, dispatch, options = {}) {
  dbg('async validating', action, form, options);

  try {
    dispatch(hideStatus());

    dispatch(hideFormException());

    const result = await dispatch(action);

    dbg(result);

    if (result.errors && result.errors.length > 0) {
      throw new SubmissionError(convertErrors(result.errors));
    }

    return result;
  } catch (err) {
    if (err && err.errors) {
      if (!options.hideFormException) dispatch(showFormException());

      throw err;
    }

    dispatch(showGeneralError());

    console.error(err);

    throw new SubmissionError({
      _error: 'SERVER ERRROR',
    });
  }
}

export function lowerCase(value) {
  return value && value.toLowerCase();
}

/* FormData.prototype.appendRecursive = function(data, wrapper) {
    for(const x in data) {
        if(data instanceof Array)
            this.appendRecursive(data[x], (wrapper ? wrapper : '') + '[' + x + ']');
        else if(typeof data[x] === 'object')
            this.appendRecursive(data[x], (wrapper ? wrapper + '.' : '') + x);
        else
          this.append((wrapper ? wrapper + '.' : '') + x, data[x]);

    }
}; */

const objectToFormData = function (obj, namespace) {
  const fd = new FormData();

  fd.appendRecursive(obj);

  return fd;
};

const validateRequired = (data = {}, field, errors = {}) => {
  if (!data[field] || data[field].length === 0) errors[field] = 'Não pode ser vazio';
};

const emailRegex = new RegExp(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);

const validateEmail = (data = {}, field, errors = {}) => {
  if (data[field] && !emailRegex.test(data[field])) errors[field] = 'Email incorreto';
};

const validateLength = (min = 0, max, data = {}, field, errors = {}) => {
  if (max && max < min) throw new Error('validateLength: max needs to be larger than min');
  if (
    (!data[field] && min > 0) ||
    ((data[field] && data[field].length > max) || (data[field] && data[field].length < min))
  ) {
    errors[field] = `Deveria ser entre ${min} e ${max} caracteres`;
  }
};

const validateChecked = (data = {}, field, errors = {}) => {
  if (!data[field]) errors[field] = 'Deveria ser activa';
};

const httpRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
const validateHTTP = (data = {}, field, errors = {}) => {
  if (data[field] && !httpRegex.test(data[field])) {
    errors[field] = 'Deveria ser um URL (e.g. http://www.abc.com.br/1234)';
  }
};

const normalizePhone = (value) => {
  if (!value) {
    return value;
  }

  const onlyNums = value.replace(/[^\d]/g, '');
  if (onlyNums.length <= 2) {
    return onlyNums;
  }

  return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 10)}`;
};

const normalizeLowercase = value =>
  (value && typeof value === 'string' ? value.toLowerCase() : value);

export {
  normalizePhone,
  objectToFormData,
  validateRequired,
  validateEmail,
  validateLength,
  validateHTTP,
  validateChecked,
  normalizeLowercase,
};
