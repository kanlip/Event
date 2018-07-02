import React from 'react'

export function Loading(props) {
  if (props.error) {
    return (
      <div className="mt-3">
        <h1>Error loading page.</h1>
        <p>
          Oh no! We were unable to load this page. This usually means that you
          lost your internet connection. Please refresh this page when your
          internet connection is back up.
        </p>
      </div>
    )
  } else if (props.pastDelay) {
    return <div>Loading Chunk</div>
  } else {
    return null
  }
}
