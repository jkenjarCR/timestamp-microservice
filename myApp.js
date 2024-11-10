let express = require('express');
let app = express();

console.error("Hello World");

// app.get('/test-log', (req, res) => {
//     var home_page = __dirname + '/views/index.html';
//     res.send('Hello World');
//     res.sendFile(home_page);
// });

// app.listen(3000);

module.exports = app;
