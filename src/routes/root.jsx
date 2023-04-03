import React from 'react'
import { users } from '../utils/generateUsers'
import UserSidebar from '../components/UserSidebar/UserSidebar'
import { Link, Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <div style={{ width: '98vw' }}>
      <div style={{ display: 'flex' }}>
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
          <Outlet context={users} />
        </div>
      </div>
    </div>
  )
}

export default Root
