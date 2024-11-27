var express = require('express');
var app = express();

function isInvalidDate(date) { return isNaN(new Date(date).getTime()); }

function isNumeric(value) {
  return /^\d+$/.test(value);
}

function formatToCustomUTCString(timestamp) {
  // Create a Date object from the timestamp
  const date = new Date(timestamp);

  // Validate if the date is valid
  if (isNaN(date.getTime())) {
    return;
  }

  // Array of weekday and month names for formatting
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Extract components
  const dayName = weekdays[date.getUTCDay()];
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  // Construct the string
  return `${dayName}, ${day} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`;
}

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", function(req, res) {
  let date = new Date();

  if(isInvalidDate(date)) res.json({ error : "Invalid Date" });
  else {
    const unix = Math.floor(date.getTime());
    const utc = date.toISOString();
    const response = { unix: Number(unix), utc: utc };

    res.json(response);
  }
});

app.get("/api/:date?", function(req, res) {
  let date = req.params.date;

  if (isNumeric(req.params.date)) {
    date = req.params.date ? new Date(Number(date)) : new Date();
  } else {
    date = req.params.date ? new Date(req.params.date) : new Date();
  }

  if(isInvalidDate(date)) res.json({ error : "Invalid Date" });
  else {
    const unix = Math.floor(date.getTime());
    const utc = formatToCustomUTCString(date);
    const response = { unix: Number(unix), utc: utc };

    res.json(response);
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
