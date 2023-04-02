import React from 'react'
import UserBarChart from './components/UserBarChart/UserBarChart'
import { users } from './utils/generateUsers'
import CarPieChart from './components/CarPieChart/CarPieChart'

const App = () => {
  return (
    <div>
      <UserBarChart users={users} />
      <CarPieChart users={users} />
    </div>
  )
}

export default App
