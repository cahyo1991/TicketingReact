import React from 'react'
import swal from 'sweetalert';

function AlertSuccess(Title,Message) {
  return (
    swal({
        title: Title,
        text: Message,
        icon : 'success'
    
      })
  )
}

export default AlertSuccess