import React from 'react'
import UserBarChart from '../components/UserBarChart/UserBarChart'
import CarPieChart from '../components/CarPieChart/CarPieChart'
import { useOutletContext } from 'react-router-dom'

const StatsPage = () => {
  const { users } = useOutletContext()

  return (
    <div style={{ padding: '20px' }}>
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
  )
}

export default StatsPage
