import { SHOW_STATUS, HIDE_STATUS } from '../constants';

export const TYPE = {
  INFO: 'info',
  WARNING: 'warning',
  SUCCESS: 'success',
  ERROR: 'error',
};

export const LOCATION = {
  TOP: 'top',
  BOTTOM: 'bottom',
};

export function showStatus(text, toastType, location, autoHide) {
  return {
    type: SHOW_STATUS,
    text,
    toastType,
    location,
    autoHide,
  };
}

export function showStatusId(textId, textValues, toastType, location, autoHide) {
  return {
    type: SHOW_STATUS,
    id: textId,
    textValues,
    toastType,
    location,
    autoHide,
  };
}

export function showStatusObject(obj) {
  return {
    ...{
      type: SHOW_STATUS,
    },
    ...obj,
  };
}

export function hideStatus() {
  return {
    type: HIDE_STATUS,
  };
}

export function hideFormException() {
  return hideStatus();
}

export function showFormException(message) {
  return showError(message);
}

export function showLoggedOut() {
  return showStatusId('error.loggedout', null, TYPE.ERROR, LOCATION.BOTTOM, true);
}

export function showRemoteServerOffline() {
  return showStatusId('error.serveroffline', null, TYPE.ERROR, LOCATION.BOTTOM, true);
}

export function showGeneralError(message) {
  if (message && typeof message === 'object') {
    return showStatusObject({
      ...{
        toastType: TYPE.ERROR,
        location: LOCATION.TOP,
        autoHide: true,
      },
      ...message,
    });
  }

  return showStatusObject({
    text: message,
    id: message ? null : 'error.error',
    toastType: TYPE.ERROR,
    location: LOCATION.TOP,
    autoHide: true,
  });
}

export function showError(errorText) {
  if (errorText && typeof errorText === 'object') {
    return showStatusObject({
      ...{
        toastType: TYPE.ERROR,
        location: LOCATION.BOTTOM,
        autoHide: true,
      },
      ...errorText,
    });
  }

  return showStatusObject({
    text: errorText,
    toastType: TYPE.ERROR,
    location: LOCATION.BOTTOM,
    autoHide: true,
  });
}

export function showWarning(errorText) {
  if (errorText && typeof errorText === 'object') {
    return showStatusObject({
      ...{
        toastType: TYPE.WARNING,
        location: LOCATION.BOTTOM,
        autoHide: true,
      },
      ...errorText,
    });
  }

  return showStatusObject({
    text: errorText,
    toastType: TYPE.WARNING,
    location: LOCATION.BOTTOM,
    autoHide: true,
  });
}
