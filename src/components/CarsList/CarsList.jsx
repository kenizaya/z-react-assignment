import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
const ITEMS_PER_PAGE = 25

function Items({ currentCars }) {
  return (
    <>
      {currentCars &&
        currentCars.map((car) => (
          <div>
            <h3>{car.model}</h3>
          </div>
        ))}
    </>
  )
}

const CarsList = ({ users }) => {
  const cars = users.map((user) => ({
    make: user.vehicle.make,
    model: user.vehicle.model,
    age: user.vehicle.age,
  }))
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

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridGap: '10px',
      }}
    >
      <Items currentCars={currentCars} />
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
