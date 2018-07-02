import { ON_CHANGE_CATEGORY_SEARCH, FETCH_EVENTS } from './types';
import {handleErrors} from './eventAction'
import axios from 'axios';
export const onChangeCategorySearch = (data) => dispatch => {
  dispatch({
    type: ON_CHANGE_CATEGORY_SEARCH,
    payload: data
  })
  data === 0 ?
    fetch('/api/events')
      .then(handleErrors)
      .then(res => res.json())
      .then(events =>
        dispatch({
          type: FETCH_EVENTS,
          payload: events
        })
      )
      .catch(error => console.log(error))
    :
    axios.post('/api/events/category', {
      data
    }).then((response) => {
      dispatch({
        type: FETCH_EVENTS,
        payload: response.data
      })
    })
    .catch(error => console.log(error))

}