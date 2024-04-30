import React from 'react'
import { Link } from 'react-router-dom'
function Grabber() {
  return (
    <div className='second-table'>
      <Link to="/">
        <button>Go Back</button>
      </Link>
    </div>
  )
}

export default Grabber