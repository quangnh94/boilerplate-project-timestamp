const express = require('express')
const { parseDate } = require('chrono-node')
const { format, parse } = require('date-fns')

const app = express()

app.use(express.static('public'))

const isUnixTimestamp = timestamp => {
  const unixTime = new Date(timestamp * 1000)
  if (unixTime != 'Invalid Date') {
    return unixTime
  } else {
    return false
  }
}
const isNLDate = timestamp => parseDate(timestamp)

app.get('/time', (req, res) => {
  const response = {
    unix: null,
    natural: null
  }
  const { timestamp } = req.query

  const parsedTimestamp = isUnixTimestamp(timestamp)
  const parsedNLDate = isNLDate(timestamp)

  if (parsedTimestamp) {
    response.unix = parseInt(timestamp, 10),
    response.natural = format(parsedTimestamp, 'MMMM d, yyyy')
  }

  if (parsedNLDate) {
    response.unix = parsedNLDate.getTime()/1000
    response.natural = timestamp
  }

  res.send(response)
})

const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})