import express from "express"
import cors from "cors"
import fetch from "node-fetch"

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())

app.get("/api/data", async (req, res) => {
  try {
    const { startDate, endDate, limit, page } = req.query
    const apiUrl = `https://staging.sonalabs.com/mock.php?startDate=${startDate}&endDate=${endDate}&limit=${limit}&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error("Error fetching data:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
