const GenerateCalendar = (year) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const calendar = []

  for (let month = 0; month < 12; month++) {
    const monthName = months[month]
    const startDate = new Date(year, month, 1)
    const endDate = new Date(year, month + 1, 0)
    const startDay = startDate.getDay()
    const endDay = endDate.getDate()

    const days = []

    // Push days of the current month
    for (let i = 1; i <= endDay; i++) {
      days.push(i)
    }

    const prevMonthDays = []
    const nextMonthDays = []

    // Push days from the previous month
    const prevMonthEndDate = new Date(year, month, 0).getDate()
    for (let i = startDay - 1; i >= 0; i--) {
      prevMonthDays.push(prevMonthEndDate - i)
    }

    // Push days from the next month
    const remainingDays = 42 - days.length - prevMonthDays.length
    for (let i = 1; i <= remainingDays; i++) {
      nextMonthDays.push(i)
    }

    calendar.push({
      month: monthName,
      days: days,
      previousMonthDays: prevMonthDays,
      nextMonthDays: nextMonthDays,
    })
  }

  return calendar
}

export default GenerateCalendar
