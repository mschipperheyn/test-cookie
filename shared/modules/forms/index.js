import * as statusActionCreators from 'modules/status/actions/statusActions';

export const headers = {
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
};

export function dbg() {
  const args = Array.prototype.slice.call(arguments);
  console.debug(...args);
}

export function status(response, dispatch) {
  dbg(response);

  if (response.status >= 200 && response.status < 300) return response;

  if (response.status === 502 || response.status === 503) {
    // it seems like the server may be offline
    dispatch(statusActionCreators.showRemoteServerOffline());
  } else dispatch(statusActionCreators.showGeneralError());

  throw new Error({
    status: response.status,
    message: response.statusText,
  });
}
