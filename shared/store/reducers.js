import combineReducers from 'redux/lib/combineReducers';
import createReducer from 'redux-form/lib/createReducer';
import plain from 'redux-form/lib/structure/plain';
import user from 'modules/user/reducers/userReducer';
import status from 'modules/status/reducers/reducer';

export default combineReducers({
  form: createReducer(plain),
  status,
  user,
});
