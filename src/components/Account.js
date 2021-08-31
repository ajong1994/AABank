import React from 'react'

const Account = props => {

  const {
    index,
    value,
    deleteUser,
  } = props

  return (
    <div className="user-wrapper">
      <span>{value}</span>
      <button onClick={() => deleteUser(index)}>Remove Account</button>
    </div>
  )
}

export default Account