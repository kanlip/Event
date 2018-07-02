import {ON_CHANGE_CATEGORY_SEARCH} from '../actions/types';
const initialState = {
  category: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ON_CHANGE_CATEGORY_SEARCH:
      return{
        ...state,
        category: action.payload
      }
    default:
      return state;
  }
};