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

  const handleUserClick = (user) => {
    setSelectedUser(user)
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
        <div style={style} onClick={() => handleUserClick(user)}>
          <div>{user.username}</div>
          <div>{user.age}</div>
        </div>
      </CellMeasurer>
    )
  }
  return (
    <div
      className={styles['users-idebar']}
      style={{
        borderRight: '1px solid gray',
        height: '100vh',
        width: '20%',
        overflowY: 'auto',
      }}
    >
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
      {selectedUser && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: '50%',
            backgroundColor: 'white',
          }}
        >
          <div>{selectedUser.username}</div>
          <div>{selectedUser.age}</div>
          <div>{selectedUser.phoneNumber}</div>
          <div>{selectedUser.occupation}</div>
          <div>{selectedUser.address.street}</div>
          <div>{selectedUser.address.city}</div>
          <div>{selectedUser.address.state}</div>
          <div>{selectedUser.address.streetAddress}</div>
          <div>{selectedUser.address.zipCode}</div>
          <div>{selectedUser.address.country}</div>
          <div>{selectedUser.vehicle.make}</div>
          <div>{selectedUser.vehicle.model}</div>
          <div>{selectedUser.vehicle.age}</div>
        </div>
      )}
    </div>
  )
}

export default UserSidebar
