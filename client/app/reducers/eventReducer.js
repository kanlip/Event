import {
  FETCH_EVENTS,
  FETCH_SPECIFIC_EVENT,
  FETCH_REQUEST,
  ON_CHANGE_TITLE,
  ON_CHANGE_PRICE,
  ON_CHANGE_AGE,
  ON_CHANGE_DESCRIPTION,
  ON_CHANGE_STARTTIME,
  ON_CHANGE_RULE,
  ON_CHANGE_ADDRESS,
  ON_CHANGE_CATEGORY
} from '../actions/types';

const initialState ={
  items: [],
  item : [],
  loading: false,
  title: '',
  age: 0,
  price: 0,
  currency: '',
  address: '',
  category: '',
  startTime: '',
  description: '',
  rules: '',
}

export default function(state = initialState,action){
  switch(action.type){
    case FETCH_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_EVENTS:
      return{
        ...state,
     
        items: action.payload
      }
    case FETCH_SPECIFIC_EVENT:
      return{
        ...state,
        loading: false,
        item: action.payload
      }
    case ON_CHANGE_TITLE:
      return{
        ...state,
        title: action.payload
      }
    case ON_CHANGE_AGE:
      return{
        ...state,
        age: action.payload
      }
    case ON_CHANGE_PRICE:
      return{
        ...state,
        price: action.payload
      }
    case ON_CHANGE_DESCRIPTION:
      return{
        ...state,
        description: action.payload
      }
    case ON_CHANGE_STARTTIME:
      return{
        ...state,
        startTime: action.payload
      }
    case ON_CHANGE_RULE:
      return{
        ...state,
        rules: action.payload
      }
    case ON_CHANGE_ADDRESS:
      return{
        ...state,
        address: action.payload
      }
    case ON_CHANGE_CATEGORY:
      return{
        ...state,
        category: action.payload
      }
      default:
        return state;
  }
}