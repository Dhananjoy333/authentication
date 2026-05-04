import React from 'react'
import { Link } from 'react-router-dom'

export const HomePage = () => {
  return (
    <div>
      Homepage
      <Link to="/auth">Login</Link>
    </div>
  )
}
