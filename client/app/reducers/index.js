import {combineReducers} from 'redux';
import eventReducer from './eventReducer';
import loginReducer from './LoginReducer';
import searchReducer from './searchReducer';
import auth from './auth_reducer';
export default combineReducers({events:eventReducer,signUpForm:loginReducer,auth,search:searchReducer});
