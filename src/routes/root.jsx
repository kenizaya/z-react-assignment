import React from 'react'
import { users } from '../utils/generateUsers'
import UserSidebar from '../components/UserSidebar/UserSidebar'
import { Link, Outlet } from 'react-router-dom'

const Root = () => {
  const [selectedCarOwners, setSelectedCarOwners] = React.useState([])
  const [showCarOwners, setShowCarOwners] = React.useState(false)

  return (
    <div style={{ width: '98vw' }}>
      <div style={{ display: 'flex', gap: '35px' }}>
        <UserSidebar users={users} onUserClick={() => {}} />
        <div>
          <nav>
            <ul
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '40px',
                listStyle: 'none',
                fontSize: '1.1rem',
              }}
            >
              <li>
                <Link to={`stats`}>Stats</Link>
              </li>
              <li>
                <Link to={`cars`}>Cars</Link>
              </li>
            </ul>
          </nav>
          <Outlet context={{ users, setSelectedCarOwners, setShowCarOwners }} />
        </div>
        {showCarOwners && (
          <UserSidebar users={selectedCarOwners} onUserClick={() => {}} />
        )}
      </div>
    </div>
  )
}

export default Root
