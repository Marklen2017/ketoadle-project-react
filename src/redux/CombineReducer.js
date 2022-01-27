import { combineReducers } from 'redux';

// import { reducer as forms } from 'redux-form/immutable';
import reducerMethod from './Reducer';

const rootReducer = combineReducers({
    // loginReducer,
    // form: forms,
    reducerMethod
})

export default rootReducer;