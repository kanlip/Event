import {
  OPEN_DIALOG_FORM,
  SIGNUP_EMAIL,
  SIGNUP_PASSWORD,
  SIGNUP_CONFIRMPASSWORD,
  SIGNUP_FIRSTNAME,
  SIGNUP_LASTNAME,
  SUBMITTING_FORM,
  ERROR_EMAIL,
  NOTIFICATION,
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  // FETCH_MESSAGE,
  AUTH_NAME,
  AUTH_ROLE
} from './types';
import axios from 'axios';

export const openDialog = () => dispatch => {
  dispatch({
    type: OPEN_DIALOG_FORM
  })
}
export const signupEmail = (event) => dispatch => {
  dispatch({
    type: SIGNUP_EMAIL,
    payload: event
  })
}
export const signupPassword = (event) => dispatch => {
  dispatch({
    type: SIGNUP_PASSWORD,
    payload: event
  })
}
export const signupConfirmPassword = (event) => dispatch => {
  dispatch({
    type: SIGNUP_CONFIRMPASSWORD,
    payload: event
  })
}
export const signupFirstName = (event) => dispatch => {
  dispatch({
    type: SIGNUP_FIRSTNAME,
    payload: event
  })
}
export const signupLastName = (event) => dispatch => {
  dispatch({
    type: SIGNUP_LASTNAME,
    payload: event
  })
}
export const errorEmailForm = (err) => dispatch => {
  dispatch({
    type: ERROR_EMAIL,
    payload: err,
  })
}
export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}
export function signoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  localStorage.removeItem('role');

  return { type: UNAUTH_USER }
}
export const loginFacebook = (data) => dispatch => {
  axios.post('/api/facebook', {
    item: data
  }).then(response => {

    if (response.status === 200) {
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('name', response.data.user.name)
      localStorage.setItem('role', response.data.user.role)
      dispatch({
        type: AUTH_USER
      });
      dispatch({
        type: AUTH_NAME,
        payload: response.data.user.name
      })
      dispatch({
        type: AUTH_ROLE,
        payload: response.data.user.role
      })

    }


  })
}

export const submitLoginForm = (data) => dispatch => {
  axios.post('/api/login', {
    item: data
  }).then((response) => {

    dispatch({
      type: AUTH_USER
    });
    dispatch({
      type: AUTH_NAME,
      payload: response.data.user.name
    })
    dispatch({
      type: AUTH_ROLE,
      payload: response.data.user.role
    })
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('name', response.data.user.name)
    localStorage.setItem('role', response.data.user.role)
    if (response.status) {
      window.location.href = '/';
    }
  })
    .catch(() => dispatch(authError('Wrong Login Info')))
}
export const submittingForm = (data) => dispatch => {
  dispatch({
    type: SUBMITTING_FORM,
    payload: true
  })
  axios.post('/api/signup', {
    item: data
  }).then((response) => {
    dispatch({
      type: SUBMITTING_FORM,
      payload: false
    })
    dispatch({
      type: NOTIFICATION,
      payload: true
    })
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('name', response.data.user.name)
    localStorage.setItem('role', response.data.user.role)
    dispatch({
      type: AUTH_USER
    });
    dispatch({
      type: AUTH_NAME,
      payload: response.data.user.name
    })
    dispatch({
      type: AUTH_ROLE,
      payload: response.data.user.role
    })
    window.location.href = '/';
  })
    .catch((error) => {
      dispatch({
        type: ERROR_EMAIL,
        payload: error.response.data.error,
      })
      dispatch({
        type: SUBMITTING_FORM,
        payload: false
      })
    });
}

