import React from 'react'

function ErrorBar(props) {
  return (
    <div className="alert alert-danger">
    <strong>Error!</strong> {props.message}
  </div>
  )
}

export default ErrorBar