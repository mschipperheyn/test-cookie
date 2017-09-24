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
  } else if (response.status === 401 && response.url.indexOf('/login') === -1) {
    dispatch(statusActionCreators.showLoggedOut());
  } else dispatch(statusActionCreators.showGeneralError());

  throw new Error({
    status: response.status,
    message: response.statusText,
  });
}

const FNV_PRIME = 16777619;
const FNV_BASE = 2166136261;

export function hash_int32array(arr) {
  let h = FNV_BASE;

  for (let i = 0; i < arr.length; i++) {
    const dword = arr[i];

    h = Math.imul(h, FNV_PRIME);
    h ^= dword & 0xff;
    h = Math.imul(h, FNV_PRIME);
    h ^= (dword >> 8) & 0xff;
    h = Math.imul(h, FNV_PRIME);
    h ^= (dword >> 16) & 0xff;
    h = Math.imul(h, FNV_PRIME);
    h ^= dword >>> 24;
  }

  return h;
}
