const FormatDate = (inputDate) => {
  const months = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  }

  const [monthDay, year] = inputDate.split(",").map((item) => item.trim())

  const [month, day] = monthDay.split(" ")

  const monthNumber = months[month]

  const paddedDay = day.length === 1 ? `0${day}` : day

  return `${monthNumber}/${paddedDay}/${year}`
}

export default FormatDate
