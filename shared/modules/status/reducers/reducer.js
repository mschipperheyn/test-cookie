import { SHOW_STATUS, HIDE_STATUS } from '../constants';
import { TYPE, LOCATION } from '../actions/statusActions';

const initialState = {
    status : {
        visible : false,
        autoHide : false,
        text : null,
        type : TYPE.INFO,
        location : LOCATION.BOTTOM,
    }
};

export default function status(state = initialState, action) {
    switch (action.type) {
        case SHOW_STATUS:
            return {...state, ...{
                status : {
                    visible : true,
                    autoHide : action.autoHide,
                    text : action.text,
                    type : action.toastType,
        // location:action.location
                    location : LOCATION.BOTTOM
                }
            }};
        case HIDE_STATUS:
            return {...state, ...{
                status : {
                    ...state.status,
                    visible : false
                }
            }};
        default:
            return state;
    }
}
