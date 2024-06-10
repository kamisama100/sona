import React, { useEffect, useRef, useState } from "react"
import "../styles/Table.css"
import arrowLeft from "../assets/images/arrow-left.svg"
import arrowRight from "../assets/images/arrow-right.svg"
import dropdownArrow from "../assets/images/dropdown-arrow.svg"
import DatePicker from "./DatePicker"
import formatDate from "../utils/FormatDate"
import PaginationComponent from "../utils/Pagination"

function Table() {
  const [toggle, setToggle] = useState(false)
  const dropdownRef = useRef(null)

  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    fetch("https://run.mocky.io/v3/cab44c46-4972-49af-9bbd-f42c8fcf7ac9")
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setFilteredData(data)
      })
      .catch((error) => console.error("Error", error))
  }, [])

  const handleFilterChange = (dates) => {
    const formattedDate = dates.map(formatDate)
    const [startDate, endDate] = formattedDate.map((dateString) => {
      const [month, day, year] = dateString.split("/")
      return new Date(`${year}-${month}-${day}`)
    })

    const filtered = data.filter((item) => {
      const customerDate = new Date(item.customerDate)
      const leadDate = new Date(item.leadDate)

      return (
        customerDate >= startDate &&
        customerDate <= endDate &&
        leadDate >= startDate &&
        leadDate <= endDate
      )
    })

    setFilteredData(filtered)
  }

  const toggleDatePicker = () => {
    setToggle(!toggle)
  }

  const handleDatePickerClose = () => {
    setToggle(false)
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setToggle(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const onPageChange = (page) => {
    setCurrentPage(page)
  }

  const renderTableRows = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentItems = filteredData.slice(startIndex, endIndex)

    return currentItems.map((item, index) => (
      <tr key={index}>
        <td>{item.email}</td>
        <td>{item.firstName}</td>
        <td>{item.lastName}</td>
        <td>{item.customerDate}</td>
        <td>{item.leadDate}</td>
      </tr>
    ))
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th colSpan="2">Data</th>
            <th colSpan="3">
              <div className="dropdown" ref={dropdownRef}>
                <button onClick={toggleDatePicker}>
                  <span>Customer Date</span>
                  <img src={dropdownArrow} alt="dropdown" />
                </button>
                <DatePicker
                  right={"0px"}
                  top={"2.5rem"}
                  display={toggle}
                  filterDate={handleFilterChange}
                  onClose={handleDatePickerClose}
                />
              </div>
            </th>
          </tr>
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Customer Date</th>
            <th>Lead Date</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
      <PaginationComponent
        totalCount={filteredData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
        arrowLeft={arrowLeft}
        arrowRight={arrowRight}
      />
    </div>
  )
}

export default Table
