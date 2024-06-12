const FormatDate = (inputDate) => {
  const cleanedDate = inputDate.replace(/,/g, "")

  const [month, day, year] = cleanedDate.split(" ")

  const monthNumber = new Date(Date.parse(`${month} 1, 2022`)).getMonth() + 1

  const paddedDay = day.padStart(2, "0")

  return `${year}-${monthNumber}-${paddedDay}`
}

export default FormatDate
