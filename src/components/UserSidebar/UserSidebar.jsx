import React, { useRef, useState } from 'react'
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized'
import 'react-virtualized/styles.css'
import styles from './UserSidebar.module.css'

const UserSidebar = ({ users, onUserClick }) => {
  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
  )
  const [selectedUser, setSelectedUser] = useState(null)
  const [showSidebar, setShowSidebar] = useState(false)

  const handleUserClick = (user) => {
    setSelectedUser(user)
    setShowSidebar(true)
    // onUserClick(user)
  }

  const rowRenderer = ({ index, key, style, parent }) => {
    const user = users[index]

    return (
      <CellMeasurer
        key={key}
        cache={cache.current}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div
          className={styles['user-left-sidebar']}
          style={{
            fontSize: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px',
            cursor: 'pointer',
            ...style,
          }}
          onClick={() => handleUserClick(user)}
        >
          <div>{user.username}</div>
          <div>{user.age}</div>
        </div>
      </CellMeasurer>
    )
  }
  return (
    <div
      style={{
        borderRight: '1px solid gray',
        minHeight: '95vh',
        minWidth: '275px',
        overflowY: 'auto',
        backgroundColor: 'white',
      }}
    >
      <h2 style={{ margin: '0', padding: '0.5rem', textAlign: 'center' }}>
        Users
      </h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px',
          fontWeight: 'bold',
        }}
      >
        <span>Name</span>
        <span>Age</span>
      </div>

      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            rowCount={users.length}
            rowHeight={cache.current.rowHeight}
            deferredMeasurementCache={cache.current}
            rowRenderer={rowRenderer}
            width={width}
          />
        )}
      </AutoSizer>
      {showSidebar && selectedUser && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '20%',
              backgroundColor: 'white',
              zIndex: 10,
              padding: '20px',
              boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
              fontSize: '14px',
              lineHeight: '1.5',
              color: '#333',
            }}
          >
            <div
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'flex-end',
                fontWeight: 'bold',
              }}
              onClick={() => setShowSidebar(false)}
            >
              close
            </div>

            <h2 style={{ marginBottom: '20px' }}>{selectedUser.username}</h2>
            <div>
              <span style={{ fontWeight: 'bold' }}>Age:</span>{' '}
              {selectedUser.age}
            </div>
            <div>
              <span style={{ fontWeight: 'bold' }}>Phone:</span>{' '}
              {selectedUser.phoneNumber}
            </div>
            <div>
              <span style={{ fontWeight: 'bold' }}>Occupation:</span>{' '}
              {selectedUser.occupation}
            </div>
            <div>
              <span style={{ fontWeight: 'bold' }}>Address:</span>{' '}
              {selectedUser.address.street}, {selectedUser.address.city},{' '}
              {selectedUser.address.state} {selectedUser.address.zipCode}
            </div>
            <div>
              <span style={{ fontWeight: 'bold' }}>Country:</span>{' '}
              {selectedUser.address.country}
            </div>
            <div>
              <span style={{ fontWeight: 'bold' }}>Vehicle:</span>{' '}
              {selectedUser.vehicle.make} {selectedUser.vehicle.model} (
              {selectedUser.vehicle.age} years old)
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default UserSidebar
