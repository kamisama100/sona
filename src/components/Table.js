import React from "react"
import "../styles/Table.css"
import arrowLeft from "../assets/images/arrow-left.svg"
import arrowRight from "../assets/images/arrow-right.svg"
import dropdownArrow from "../assets/images/dropdown-arrow.svg"
import DatePicker from "./DatePicker"

function Table() {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th colspan="2">Data</th>
            <th colspan="3">
              <div className="dropdown">
                <span>Customer Date</span>
                <img src={dropdownArrow} alt="dropdown" />
                <DatePicker right={"0px"} top={"34px"} />
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
          <tr>
            <td>
              <span>olivia@untitledui.com</span>
            </td>
            <td>
              <span>Olivia</span>
            </td>
            <td>
              <span>Garcia</span>
            </td>
            <td>
              <span>03/11/2024</span>
            </td>
            <td>
              <span>03/02/2024</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>phoenix@untitledui.com</span>
            </td>
            <td>
              <span>Phoenix</span>
            </td>
            <td>
              <span>Baker</span>
            </td>
            <td>
              <span>01/20/2024</span>
            </td>
            <td>
              <span>04/02/2024</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>lana@untitledui.com</span>
            </td>
            <td>
              <span>Lana</span>
            </td>
            <td>
              <span>Steiner</span>
            </td>
            <td>
              <span>02/15/2024</span>
            </td>
            <td>
              <span>01/02/2024</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>demi@untitledui.com</span>
            </td>
            <td>
              <span>Demi</span>
            </td>
            <td>
              <span>Roamer</span>
            </td>
            <td>
              <span>01/16/2024</span>
            </td>
            <td>
              <span>02/02/2024</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>candice@untitledui.com</span>
            </td>
            <td>
              <span>Candice</span>
            </td>
            <td>
              <span>Xu</span>
            </td>
            <td>
              <span>03/29/2024</span>
            </td>
            <td>
              <span>03/15/2024</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>natali@untitledui.com</span>
            </td>
            <td>
              <span>Natali</span>
            </td>
            <td>
              <span>David</span>
            </td>
            <td>
              <span>02/11/2024</span>
            </td>
            <td>
              <span>04/15/2024</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>drew@untitledui.com</span>
            </td>
            <td>
              <span>Drew</span>
            </td>
            <td>
              <span>Addison</span>
            </td>
            <td>
              <span>03/02/2024</span>
            </td>
            <td>
              <span>02/15/2024</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>orlando@untitledui.com</span>
            </td>
            <td>
              <span>Orlando</span>
            </td>
            <td>
              <span>Rodrigo</span>
            </td>
            <td>
              <span>03/10/2024</span>
            </td>
            <td>
              <span>01/15/2024</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>andi@untitledui.com</span>
            </td>
            <td>
              <span>Andi</span>
            </td>
            <td>
              <span>Atkinson</span>
            </td>
            <td>
              <span>04/08/2024</span>
            </td>
            <td>
              <span>03/25/2024</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>kate@untitledui.com</span>
            </td>
            <td>
              <span>Kate</span>
            </td>
            <td>
              <span>Launder</span>
            </td>
            <td>
              <span>04/20/2024</span>
            </td>
            <td>
              <span>03/25/2024</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="pagination">
        <button className="primary-button">
          <img src={arrowLeft} alt="Previous" />
          <span>Previous</span>
        </button>
        <div colspan="3" align="center">
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
