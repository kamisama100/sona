import React, { useEffect, useState } from "react"
import "../styles/Table.css"
import arrowLeft from "../assets/images/arrow-left.svg"
import arrowRight from "../assets/images/arrow-right.svg"
import dropdownArrow from "../assets/images/dropdown-arrow.svg"
import DatePicker from "./DatePicker"

function Table() {
  const [toggle, setToggle] = useState("none")
  const [data, setData] = useState([])

  function toggleDatePicker() {
    setToggle((prevToggle) => (prevToggle === "none" ? "flex" : "none"))
  }

  useEffect(() => {
    fetch("https://run.mocky.io/v3/a403d680-7912-4ba8-9e0c-115c470df0af")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((er) => console.error("Error", er))
  }, [])

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th colSpan="2">Data</th>
            <th colSpan="3">
              <div className="dropdown">
                <button onClick={toggleDatePicker}>
                  <span>Customer Date</span>
                  <img src={dropdownArrow} alt="dropdown" />
                </button>
                <DatePicker right={"0px"} top={"2.5rem"} display={toggle} />
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
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.email}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.customerDate}</td>
              <td>{item.leadDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button className="primary-button">
          <img src={arrowLeft} alt="Previous" />
          <span>Previous</span>
        </button>
        <div colSpan="3" align="center">
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>...</button>
          <button>8</button>
          <button>9</button>
          <button>10</button>
        </div>
        <button className="primary-button">
          <span className="text-gray-700">Next</span>
          <img src={arrowRight} alt="Next" />
        </button>
      </div>
    </div>
  )
}

export default Table
