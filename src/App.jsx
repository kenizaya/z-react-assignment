import React from 'react'
import UserBarChart from './components/UserBarChart/UserBarChart'
import { users } from './utils/generateUsers'
import CarPieChart from './components/CarPieChart/CarPieChart'
import UserSidebar from './components/UserSidebar/UserSidebar'

const App = () => {
  return (
    <div style={{ width: '98vw' }}>
      <UserSidebar users={users} onUserClick={() => {}} />
      <UserBarChart users={users} />
      <CarPieChart users={users} />
    </div>
  )
}

export default App
