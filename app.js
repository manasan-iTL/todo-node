const express = require('express')
const app = express()
const port = 3000
const router = require("./routes/router")

app.use(express.json())
app.use("/", router)
app.use(express.static('public'))
app.listen(port)