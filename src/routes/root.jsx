import React from 'react'
import { users } from '../utils/generateUsers'
import UserSidebar from '../components/UserSidebar/UserSidebar'
import { Link, Outlet } from 'react-router-dom'

const Root = () => {
  const [selectedCarOwners, setSelectedCarOwners] = React.useState([])
  const [showCarOwners, setShowCarOwners] = React.useState(false)
  return (
    <div style={{ minWidth: '100vw' }}>
      <div style={{ display: 'flex', gap: '35px' }}>
        <UserSidebar users={users} title={'Users'} onUserClick={() => {}} />
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
        <div style={{ position: 'fixed', right: 0, bottom: 0 }}>
          {showCarOwners && (
            <div
              style={{
                backgroundColor: 'white',
                paddingTop: '20px',
                paddingLeft: '10px',
              }}
            >
              <span
                style={{
                  paddingLeft: '10px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
                onClick={() => setShowCarOwners(false)}
              >
                close
              </span>
              <UserSidebar
                users={selectedCarOwners}
                title={'Owners'}
                onUserClick={() => {}}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Root
