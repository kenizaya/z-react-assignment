import React from 'react'
import UserBarChart from './components/UserBarChart/UserBarChart'
import { users } from './utils/generateUsers'
import CarPieChart from './components/CarPieChart/CarPieChart'
import UserSidebar from './components/UserSidebar/UserSidebar'
import CarList from './components/CarsList/CarsList'

const App = () => {
  return (
    <div style={{ width: '98vw' }}>
      <UserSidebar users={users} onUserClick={() => {}} />
      <CarList users={users} />
      <UserBarChart users={users} />
      <CarPieChart users={users} />
    </div>
  )
}

export default App
