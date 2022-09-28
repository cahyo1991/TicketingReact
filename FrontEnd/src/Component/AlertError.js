import React from 'react'
import swal from 'sweetalert';

function AlertError(Title,Message) {
  return (
    swal({
        title: Title,
        text: Message,
        icon : 'error'
    
      })
  )
}

export default AlertError