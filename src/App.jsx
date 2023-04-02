import React from 'react'
import UserBarChart from './components/UserBarChart/UserBarChart'
import { users } from './utils/generateUsers'

const App = () => {
  return (
    <div>
      <UserBarChart users={users} />
    </div>
  )
}

export default App
