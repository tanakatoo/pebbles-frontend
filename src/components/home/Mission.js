import React from 'react'

function Mission({ icon, text }) {
  console.log(icon)
  return (
    <>
      <div className="mx-auto">{icon}</div>
      <p className="text-center mt-6 mx-12">{text}</p>
    </>
  )
}

export default Mission