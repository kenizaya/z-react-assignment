import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import supra from '../../assets/supra.jpg'
import styles from './CarsList.module.css'

const ITEMS_PER_PAGE = 25

const Items = ({ currentCars, handleCarClick }) => {
  return (
    <>
      {currentCars &&
        currentCars.map((car) => (
          <div className={styles.car} onClick={() => handleCarClick(car)}>
            <img src={supra} width={225} alt='supra' />
            <h3>{car}</h3>
          </div>
        ))}
    </>
  )
}

const CarsList = ({ users, setSelectedCarOwners, setShowCarOwners }) => {
  const cars = [...new Set(users.map((user) => user.vehicle.model))]

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0)

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + ITEMS_PER_PAGE
  const currentCars = cars.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(cars.length / ITEMS_PER_PAGE)

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * ITEMS_PER_PAGE) % cars.length
    setItemOffset(newOffset)
  }

  const handleCarClick = (car) => {
    const selectedCarOwners = users.filter((user) => user.vehicle.model === car)
    setSelectedCarOwners(selectedCarOwners)
    setShowCarOwners(true)
  }

  return (
    <div className={styles.container}>
      <Items currentCars={currentCars} handleCarClick={handleCarClick} />
      <ReactPaginate
        breakLabel='...'
        nextLabel='next >'
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel='< previous'
        renderOnZeroPageCount={null}
      />
    </div>
  )
}
export default CarsList
