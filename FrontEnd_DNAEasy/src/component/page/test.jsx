import React, { use } from 'react'
import { useParams } from 'react-router-dom'

export const Test = () => {

   
    const {token} = useParams();
  return (
    <div>{JSON.stringify(token)}</div>
  )
}
