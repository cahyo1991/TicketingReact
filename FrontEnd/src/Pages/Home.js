import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

function Home({ hideLoader }) {

  useEffect(() => {
    hideLoader();
    // window.localStorage.clear();

    if (!localStorage.getItem("Token")) {
      window.location = "/"      
    } 
    

  }, [])
  

  return (
    <div>Home</div>
  )
}

export default Home