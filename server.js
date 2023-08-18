// import required packages
const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');

// store public folder path inside a variable
let initial_path = path.join(__dirname, "public");

// create expressJS server, set public path to static
const app = express();
app.use(express.static(initial_path));
app.use(fileupload());

// make home route, and send response file
app.get('/', (req, res) => {
  res.sendFile(path.join(initial_path, "home.html"));
})

app.listen("3000", () => {
  console.log('listening ......');
})


