import React from 'react'
import { Link } from 'react-router-dom'

const Missing = () => {

  return (

    <main className='missing'>

      <h2>Sorry, did not found the page</h2>
      <Link to={'/gym-planner-app'}>Go to our home page</Link>

    </main>

  )

}

export default Missing
