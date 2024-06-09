import React, { useRef } from "react"
import "../styles/DatePicker.css"
import arrowLeft from "../assets/images/arrow-left-no-tail.svg"
import arrowRight from "../assets/images/arrow-right-no-tail.svg"

function YearButtons({ yearStart }) {
  const years = []
  for (let year = 2024; year >= yearStart; year--) {
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

function DatePicker({ right, top, display }) {
  const datePickerRef = useRef(null)

  const datePickerStyle = {
    right: right || 0,
    top: top || 0,
    display: display || "none",
  }

  function hideDatePicker() {
    datePickerRef.current.style.display = "none"
  }

  return (
    <div ref={datePickerRef} className="datepicker-container shadow-xs" style={datePickerStyle}>
      <div>
        <div>
          <YearButtons yearStart={2012} />
        </div>
      </div>
      <div>
        <div>
          <div className="start-date">
            <div>
              <img src={arrowLeft} alt="arrow" />
              <span>April 2024</span>
              <img src={arrowRight} alt="arrow" />
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
              <div>
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
                <button>5</button>
                <button>6</button>
                <button>7</button>
                <button>8</button>
                <button>9</button>
              </div>
            </div>
          </div>
          <div className="end-date">
            <div>
              <img src={arrowLeft} alt="arrow" />
              <span>May 2024</span>
              <img src={arrowRight} alt="arrow" />
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
              <div>
                <span className="disabled">26</span>
                <span className="disabled">27</span>
                <span className="disabled">28</span>
                <span className="disabled">29</span>
                <span className="disabled">30</span>
                <span className="disabled">31</span>
                <span>1</span>
              </div>
              <div>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
              </div>
              <div>
                <span>9</span>
                <span>10</span>
                <span>11</span>
                <span>12</span>
                <span>13</span>
                <span>14</span>
                <span>15</span>
              </div>
              <div>
                <span>16</span>
                <span>17</span>
                <span>18</span>
                <span>19</span>
                <span>20</span>
                <span>21</span>
                <span>22</span>
              </div>
              <div>
                <span>23</span>
                <span>24</span>
                <span>25</span>
                <span>26</span>
                <span>27</span>
                <span>28</span>
                <span>29</span>
              </div>
              <div>
                <span>30</span>
                <span>31</span>
                <span className="disabled">1</span>
                <span className="disabled">2</span>
                <span className="disabled">3</span>
                <span className="disabled">4</span>
                <span className="disabled">5</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <input type="text" className="shadow-xs" placeholder="Start Date" />
              <span>-</span>
              <input type="text" className="shadow-xs" placeholder="End Date" />
            </div>
            <div>
              <button onClick={hideDatePicker} className="primary-button text-sm">
                Cancel
              </button>
              <button className="primary-button text-sm">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DatePicker
