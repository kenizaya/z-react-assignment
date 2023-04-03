import React from 'react'
import CarList from '../components/CarsList/CarsList'
import { useOutletContext } from 'react-router-dom'

const CarsPage = () => {
  const users = useOutletContext()

  return <CarList users={users} />
}

export default CarsPage
