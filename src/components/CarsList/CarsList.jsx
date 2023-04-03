import React, { useState } from 'react'
import { List } from 'react-virtualized'
import ReactPaginate from 'react-paginate'
import styles from './CarsList.module.css'

const CarsList = ({
  carsPerPage = 20,
  users,
  setSelectedCarOwners,
  setShowCarOwners,
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const cars = users.map((user) => user.vehicle)

  const uniqueCars = cars.filter(
    (car, index, array) =>
      index ===
      array.findIndex(
        (c) =>
          c.make === car.make && c.model === car.model && c.year === car.year
      )
  )

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected)
  }

  const handleCarClick = (car) => {
    const selectedCarOwners = users.filter((user) => user.vehicle.model === car)
    setSelectedCarOwners(selectedCarOwners)
    setShowCarOwners(true)
  }

  const startIndex = currentPage * carsPerPage
  const stopIndex = startIndex + carsPerPage
  const displayedCars = uniqueCars.slice(startIndex, stopIndex)

  const rowRenderer = ({ key, index, style }) => {
    const car = displayedCars[index]
    const price = `${car.price.toString().slice(0, 2)},${car.price
      .toString()
      .slice(2)}`
    return (
      <div
        key={key}
        style={{
          ...style,
          display: 'flex',
          justifyContent: 'space-between',
        }}
        onClick={() => handleCarClick(car.model)}
      >
        <span style={{ cursor: 'pointer' }}>
          {car.make} {car.model}
        </span>
        <span>${price}</span>
      </div>
    )
  }

  const pageCount = Math.ceil(uniqueCars.length / carsPerPage)

  return (
    <section style={{ marginLeft: '100px' }}>
      <List
        width={700}
        height={600}
        rowCount={displayedCars.length}
        rowHeight={50}
        rowRenderer={rowRenderer}
        overscanRowCount={5}
        className={styles.carList}
      />
      <div className={styles.paginationContainer}>
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={styles.pagination}
          activeClassName={styles.active}
          pageClassName={styles.pageItem}
          pageLinkClassName={styles.pageLink}
          previousClassName={styles.pageItem}
          previousLinkClassName={styles.pageLink}
          nextClassName={styles.pageItem}
          nextLinkClassName={styles.pageLink}
          breakClassName={styles.pageItem}
          breakLinkClassName={styles.pageLink}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          previousLabel={'Previous'}
          nextLabel={'Next'}
        />
      </div>
    </section>
  )
}

export default CarsList
