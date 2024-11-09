let express = require('express');
let app = express();

console.error("Hello World");

app.get('/test-log', (req, res) => {
    res.send('Response String');
});

app.listen(3000);

module.exports = app;
