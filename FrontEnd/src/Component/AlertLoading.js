import React from 'react'
import swal from 'sweetalert';

function AlertLoading() {
  return (
     swal({
    title: 'Loading ..... ',
    text: `Don't Close This Dialog Until Proccess Success`,
    button : false,

  })
  )
}

export default AlertLoading