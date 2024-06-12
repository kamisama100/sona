import React, { useEffect, useRef, useState } from "react"
import "../styles/DatePicker.css"
import arrowLeft from "../assets/images/arrow-left-no-tail.svg"
import arrowRight from "../assets/images/arrow-right-no-tail.svg"
import GenerateCalendar from "../utils/GenerateCalendar"

const YearButtons = ({
  yearStart,
  setCustomerSelectedYear,
  setLeadSelectedYear,
  dayClicked,
  yearActive,
}) => {
  const [activeYear, setActiveYear] = useState(yearActive)

  useEffect(() => {
    setActiveYear(yearActive)
  }, [yearActive])

  const handleClick = (year) => {
    dayClicked ? setCustomerSelectedYear(year) : setLeadSelectedYear(year)
    setActiveYear(year)
  }

  const years = []
  for (let year = 2024; year >= yearStart; year--) {
    years.push(year)
  }

  return (
    <div>
      {years.map((year) => (
        <button
          key={year}
          onClick={() => handleClick(year)}
          className={activeYear === year ? "active" : ""}
        >
          {year}
        </button>
      ))}
    </div>
  )
}

const DatePicker = ({ right, top, display, filterDate, onClose }) => {
  const datePickerRef = useRef(null)
  const [dayClicked, setDayClicked] = useState(true)
  const [yearActive, setYearActive] = useState(2024)

  const customerDateInput = useRef(null)
  const [customerSelectedYear, setCustomerSelectedYear] = useState(2024)
  const [customerMonth, setCustomerMonth] = useState("January")
  const [customerSelectedDay, setCustomerSelectedDay] = useState(1)
  const customerCalendar = GenerateCalendar(customerSelectedYear)

  const leadDateInput = useRef(null)
  const [leadSelectedYear, setLeadSelectedYear] = useState(2024)
  const [leadMonth, setLeadMonth] = useState("January")
  const [leadSelectedDay, setLeadSelectedDay] = useState(1)
  const leadCalendar = GenerateCalendar(leadSelectedYear)

  const datePickerStyle = {
    right: right || 0,
    top: top || 0,
    display: display ? "flex" : "none",
  }

  const handleDatePickerClose = () => {
    onClose()
  }

  const handlePrevMonthButtonClick = (calendarType) => {
    if (calendarType === "customer") {
      const currentMonthIndex = customerCalendar.findIndex((m) => m.month === customerMonth)
      if (currentMonthIndex !== -1 && currentMonthIndex !== 0) {
        setCustomerMonth(customerCalendar[currentMonthIndex - 1].month)
      } else if (currentMonthIndex === 0 && customerSelectedYear !== 2012) {
        setCustomerMonth(customerCalendar[11].month)
        setCustomerSelectedYear(customerSelectedYear - 1)
      }
    } else if (calendarType === "lead") {
      const currentMonthIndex = leadCalendar.findIndex((m) => m.month === leadMonth)
      if (currentMonthIndex !== -1 && currentMonthIndex !== 0) {
        setLeadMonth(leadCalendar[currentMonthIndex - 1].month)
      } else if (currentMonthIndex === 0 && leadSelectedYear !== 2012) {
        setLeadMonth(leadCalendar[11].month)
        setLeadSelectedYear(leadSelectedYear - 1)
      }
    }
  }

  const handleNextMonthButtonClick = (calendarType) => {
    if (calendarType === "customer") {
      const currentMonthIndex = customerCalendar.findIndex((m) => m.month === customerMonth)
      if (currentMonthIndex !== -1 && currentMonthIndex !== 11) {
        setCustomerMonth(customerCalendar[currentMonthIndex + 1].month)
      } else if (currentMonthIndex === 11 && customerSelectedYear !== 2024) {
        setCustomerMonth(customerCalendar[0].month)
        setCustomerSelectedYear(customerSelectedYear + 1)
      }
    } else if (calendarType === "lead") {
      const currentMonthIndex = leadCalendar.findIndex((m) => m.month === leadMonth)
      if (currentMonthIndex !== -1 && currentMonthIndex !== 11) {
        setLeadMonth(leadCalendar[currentMonthIndex + 1].month)
      } else if (currentMonthIndex === 11 && leadSelectedYear !== 2024) {
        setLeadMonth(leadCalendar[0].month)
        setLeadSelectedYear(leadSelectedYear + 1)
      }
    }
  }

  const handleSelectedDay = (day, calendarType) => {
    if (calendarType === "customer") {
      setCustomerSelectedDay(day)
      handleDayClick("customer")
    } else if (calendarType === "lead") {
      setLeadSelectedDay(day)
      handleDayClick("lead")
    }
  }

  const handleApplyButton = (customerDate, leadDate) => {
    if (new Date(customerDate) > new Date(leadDate)) {
      alert("Customer date cannot be later than Lead date.")
      return
    }

    filterDate([customerDate, leadDate])

    handleDatePickerClose()
  }

  const handleDayClick = (calendarType) => {
    if (calendarType === "customer") {
      setDayClicked(true)
      setYearActive(customerSelectedYear)
    } else if (calendarType === "lead") {
      setDayClicked(false)
      setYearActive(leadSelectedYear)
    }
  }

  useEffect(() => {}, [dayClicked])

  return (
    <div ref={datePickerRef} className="datepicker-container shadow-xs" style={datePickerStyle}>
      <div>
        <div>
          <YearButtons
            yearStart={2010}
            setCustomerSelectedYear={setCustomerSelectedYear}
            setLeadSelectedYear={setLeadSelectedYear}
            dayClicked={dayClicked}
            yearActive={yearActive}
          />
        </div>
      </div>
      <div>
        <div>
          <div className="customer-date">
            <div>
              <button
                onClick={() => handlePrevMonthButtonClick("customer")}
                className="cursor-pointer"
              >
                <img src={arrowLeft} alt="arrow" />
              </button>
              <span>
                {customerMonth} {customerSelectedYear}
              </span>
              <button
                onClick={() => handleNextMonthButtonClick("customer")}
                className={`cursor-pointer`}
              >
                <img src={arrowRight} alt="arrow" />
              </button>
            </div>
            <div>
              <div>
                <span className="font-medium">Mo</span>
                <span className="font-medium">Tu</span>
                <span className="font-medium">We</span>
                <span className="font-medium">Th</span>
                <span className="font-medium">Fr</span>
                <span className="font-medium">Sat</span>
                <span className="font-medium">Su</span>
              </div>
              {customerCalendar.map((item) => {
                if (item.month === customerMonth) {
                  return (
                    <div key={item.month}>
                      {item.previousMonthDays.map((day, index) => (
                        <button className="disabled" key={index}>
                          {day}
                        </button>
                      ))}
                      {item.days.map((day, index) => (
                        <button
                          className={customerSelectedDay === day ? "selected" : ""}
                          onClick={() => handleSelectedDay(day, "customer")}
                          key={index}
                        >
                          {day}
                        </button>
                      ))}
                      {item.nextMonthDays.map((day, index) => (
                        <button className="disabled" key={index}>
                          {day}
                        </button>
                      ))}
                    </div>
                  )
                }
                return null
              })}
            </div>
          </div>
          <div className="lead-date">
            <div>
              <button onClick={() => handlePrevMonthButtonClick("lead")} className="cursor-pointer">
                <img src={arrowLeft} alt="arrow" />
              </button>
              <span>
                {leadMonth} {leadSelectedYear}
              </span>
              <button
                onClick={() => handleNextMonthButtonClick("lead")}
                className={`cursor-pointer`}
              >
                <img src={arrowRight} alt="arrow" />
              </button>
            </div>
            <div>
              <div>
                <span className="font-medium">Mo</span>
                <span className="font-medium">Tu</span>
                <span className="font-medium">We</span>
                <span className="font-medium">Th</span>
                <span className="font-medium">Fr</span>
                <span className="font-medium">Sat</span>
                <span className="font-medium">Su</span>
              </div>
              {leadCalendar.map((item) => {
                if (item.month === leadMonth) {
                  return (
                    <div key={item.month}>
                      {item.previousMonthDays.map((day, index) => (
                        <button className="disabled" key={index}>
                          {day}
                        </button>
                      ))}
                      {item.days.map((day, index) => (
                        <button
                          onClick={() => handleSelectedDay(day, "lead")}
                          key={index}
                          className={leadSelectedDay === day ? "selected" : ""}
                        >
                          {day}
                        </button>
                      ))}
                      {item.nextMonthDays.map((day, index) => (
                        <button className="disabled" key={index}>
                          {day}
                        </button>
                      ))}
                    </div>
                  )
                }
                return null
              })}
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <input
                ref={customerDateInput}
                type="text"
                className="shadow-xs"
                placeholder="Customer Date"
                value={`${customerMonth.substring(
                  0,
                  3
                )} ${customerSelectedDay}, ${customerSelectedYear}`}
                readOnly
              />
              <span>-</span>
              <input
                ref={leadDateInput}
                type="text"
                className="shadow-xs"
                placeholder="Lead Date"
                value={`${leadMonth.substring(0, 3)} ${leadSelectedDay}, ${leadSelectedYear}`}
                readOnly
              />
            </div>
            <div>
              <button onClick={handleDatePickerClose} className="primary-button text-sm">
                Cancel
              </button>
              <button
                onClick={() =>
                  handleApplyButton(
                    `${customerMonth} ${customerSelectedDay}, ${customerSelectedYear}`,
                    `${leadMonth} ${leadSelectedDay}, ${leadSelectedYear}`
                  )
                }
                className="primary-button text-sm"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DatePicker
