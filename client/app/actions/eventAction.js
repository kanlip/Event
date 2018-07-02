import { FETCH_EVENTS,FETCH_SPECIFIC_EVENT,FETCH_REQUEST} from './types';
export const fetchEvents = () => dispatch => {
  fetch('/api/events')
  .then(handleErrors)
  .then(res => res.json())
  .then(events =>
    dispatch({
      type: FETCH_EVENTS,
      payload: events
    })
  )
  .catch(error => console.log(error) );
}
export function handleErrors(response) {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response;
}
export const fetchSpecificEvent = (id) => dispatch => {
  dispatch({
    type: FETCH_REQUEST
  })
  fetch(`/api/events/${id}`)
  .then(handleErrors)
  .then(res => res.json())
  .then(events =>
    dispatch({
      type: FETCH_SPECIFIC_EVENT,
      payload: events
    })
  )
  .catch(error => console.log(error) );
}
export const createEvent = (name,data) => dispatch => {
  
  dispatch({
    type: 'ON_CHANGE_'+ name.toUpperCase(),
    payload: data
  })
}