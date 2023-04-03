import React, { useRef, useState } from 'react'
import {
  AutoSizer,
  List,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized'
import 'react-virtualized/styles.css'

const CarList = ({ users }) => {
  const [selectedCar, setSelectedCar] = useState(null)
  const [carUsers, setCarUsers] = useState([])
  const carCache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
  )
  const usersCache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
  )

  // Get unique list of car models
  const carModels = [...new Set(users.map((user) => user.vehicle.model))]

  // Handle click on a car
  const handleCarClick = (car) => {
    const carUsers = users.filter((user) => user.vehicle.model === car)
    setCarUsers(carUsers)
    setSelectedCar(car)
  }

  // Render a car row
  const carRowRenderer = ({ index, key, style }) => {
    const car = carModels[index]

    return (
      <CellMeasurer
        key={key}
        cache={carCache.current}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div key={key} style={style} onClick={() => handleCarClick(car)}>
          <div>{car}</div>
        </div>
      </CellMeasurer>
    )
  }

  // Render a user row
  const userRowRenderer = ({ index, key, style }) => {
    const { username, age } = carUsers[index]

    return (
      <CellMeasurer
        key={key}
        cache={usersCache.current}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div style={style}>
          <div>{username}</div>
          <div>{age}</div>
        </div>
      </CellMeasurer>
    )
  }

  return (
    <div style={{ display: 'flex' }}>
      <div
        style={{
          borderRight: '1px solid gray',
          overflowY: 'auto',
          height: '100vh',
          width: '20%',
          flex: '1',
        }}
      >
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              rowCount={carModels.length}
              deferredMeasurementCache={carCache.current}
              rowHeight={carCache.current.rowHeight}
              rowRenderer={carRowRenderer}
              width={width}
            />
          )}
        </AutoSizer>
      </div>
      {selectedCar && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            overflow: 'auto',
            width: '50%',
            backgroundColor: 'white',
          }}
        >
          <div>{selectedCar}</div>
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                rowCount={carUsers.length}
                deferredMeasurementCache={usersCache.current}
                rowHeight={usersCache.current.rowHeight}
                rowRenderer={userRowRenderer}
                width={width}
              />
            )}
          </AutoSizer>
        </div>
      )}
    </div>
  )
}

export default CarList
