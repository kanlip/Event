import { OPEN_DIALOG_FORM,SIGNUP_EMAIL,SIGNUP_PASSWORD,SIGNUP_CONFIRMPASSWORD,SIGNUP_FIRSTNAME,SIGNUP_LASTNAME,SUBMITTING_FORM ,ERROR_EMAIL, NOTIFICATION,SUBMIT_LOGIN} from '../actions/types';

const initialState = {
  open: false,
  email:'',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  submitting: false,
  errorEmail: '',
  notification: false,
  submitLogin: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DIALOG_FORM:
      return {
        ...state,
        open: !state.open
      }
    case SIGNUP_EMAIL:
      return{
        ...state,
        email: action.payload
      }
    case SIGNUP_PASSWORD:
      return{
        ...state,
        password: action.payload
      }
    case SIGNUP_CONFIRMPASSWORD:
      return{
        ...state,
        confirmPassword: action.payload
      }
    case SIGNUP_FIRSTNAME:
      return{
        ...state,
        firstName: action.payload
      }
    case SIGNUP_LASTNAME:
      return{
        ...state,
        lastName: action.payload
      }
    case SUBMITTING_FORM:
      return{
        ...state,
        submitting: action.payload
      }
    case ERROR_EMAIL:
      return{
        ...state,
        errorEmail: action.payload
      }
    case NOTIFICATION:
      return{
        ...state,
        notification: action.payload
      }
    case SUBMIT_LOGIN:
      return{
        ...state,
        submitLogin: action.payload
      }
    
    default:
      return state;
  }
};