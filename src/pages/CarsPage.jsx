import React from 'react'
import CarList from '../components/CarsList/CarsList'
import { useOutletContext } from 'react-router-dom'
import UserSidebar from '../components/UserSidebar/UserSidebar'

const CarsPage = () => {
  const { users, setSelectedCarOwners, setShowCarOwners } = useOutletContext()

  return (
    <CarList
      users={users}
      setSelectedCarOwners={setSelectedCarOwners}
      setShowCarOwners={setShowCarOwners}
    />
  )
}

export default CarsPage
