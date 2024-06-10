import React from "react"

const PaginationComponent = ({
  totalCount,
  itemsPerPage,
  currentPage,
  onPageChange,
  arrowLeft,
  arrowRight,
}) => {
  const totalPages = Math.ceil(totalCount / itemsPerPage)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  const renderPaginationButtons = () => {
    const buttons = []
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={currentPage === i ? "active" : ""}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      )
    }
    return buttons
  }

  return (
    <div className="pagination">
      <button
        className="primary-button font-inherit"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <img src={arrowLeft} alt="Previous" />
        <span>Previous</span>
      </button>

      <div className="font-inherit" colSpan="3" align="center">
        {renderPaginationButtons()}
      </div>

      <button
        className="primary-button font-inherit"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <span>Next</span>
        <img src={arrowRight} alt="Next" />
      </button>
    </div>
  )
}

export default PaginationComponent
