import React, { useEffect, useRef, useState } from "react"
import "../styles/Table.css"
import arrowLeft from "../assets/images/arrow-left.svg"
import arrowRight from "../assets/images/arrow-right.svg"
import dropdownArrow from "../assets/images/dropdown-arrow.svg"
import DatePicker from "./DatePicker"
import formatDate from "../utils/FormatDate"
import PaginationComponent from "../utils/Pagination"

const Table = () => {
  const [toggle, setToggle] = useState(false)
  const dropdownRef = useRef(null)
  const dropdownImgRef = useRef(null)

  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const [startDate, setStartDate] = useState("2022-01-01")
  const [endDate, setEndDate] = useState("2023-12-31")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/data?startDate=${startDate}&endDate=${endDate}&limit=${itemsPerPage}&page=${currentPage}`
        )
        const responseData = await res.json()
        setData(responseData)
      } catch (error) {
        console.error("Error", error)
      }
    }

    fetchData()
  }, [currentPage, startDate, endDate])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleFilterChange = (dates) => {
    setStartDate(formatDate(dates[0]))
    setEndDate(formatDate(dates[1]))
  }

  const toggleDatePicker = () => {
    const newToggle = !toggle
    setToggle(newToggle)

    dropdownImgRef.current.style.transform = newToggle ? "rotate(180deg)" : "rotate(0deg)"
  }

  const handleDatePickerClose = () => {
    setToggle(false)
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setToggle(false)
    }
  }

  const onPageChange = (page) => {
    setCurrentPage(page)
  }

  const renderTableRows = () => {
    if (!data || !data.data) {
      return null
    }

    return data.data.map((item, index) => (
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
                  <img ref={dropdownImgRef} src={dropdownArrow} alt="dropdown" />
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
        totalCount={data.totalItems}
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
