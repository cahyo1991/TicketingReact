import React from 'react'

function LoadingBar() {
  return (
<div className="progress">
  <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="100" aria-valuemax="100"
  style={{
    width: '100%',
    
  }}
  >
    Loading
  </div>
</div>
  )
}

export default LoadingBar