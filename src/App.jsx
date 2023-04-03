import React from 'react'
import UserBarChart from './components/UserBarChart/UserBarChart'
import { users } from './utils/generateUsers'
import CarPieChart from './components/CarPieChart/CarPieChart'
import UserSidebar from './components/UserSidebar/UserSidebar'
import CarList from './components/CarsList/CarsList'

const App = () => {
  return (
    <div style={{ width: '98vw', padding: '20px' }}>
      <div style={{ display: 'flex' }}>
        <UserSidebar users={users} onUserClick={() => {}} />
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <UserBarChart users={users} />
          </div>
          <CarPieChart users={users} />
        </div>
      </div>

      <CarList users={users} />
    </div>
  )
}

export default App
