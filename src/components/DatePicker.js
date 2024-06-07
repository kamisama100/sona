import React from "react"
import "../styles/DatePicker.css"
import arrowLeft from "../assets/images/arrow-left.svg"
import arrowRight from "../assets/images/arrow-right.svg"

function YearButtons({ inputYear }) {
  const years = []
  for (let year = 2024; year >= inputYear; year--) {
    years.push(year)
  }

  return (
    <div>
      {years.map((year) => (
        <button key={year}>{year}</button>
      ))}
    </div>
  )
}

function DatePicker({ right, top }) {
  const datePickerPosition = {
    right: right || 0,
    top: top || 0,
  }

  return (
    <div className="datepicker-container" style={datePickerPosition}>
      <div>
        <YearButtons inputYear={2012} />
      </div>
      <div>
        <div>
          <div className="start-date">
            <div>
              <img src={arrowLeft} alt="arrow" />
              <span>April 2024</span>
              <img src={arrowRight} alt="arrow" />
            </div>
          </div>
          <div className="end-date"></div>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default DatePicker
