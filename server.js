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

// home route, and send response file
app.get('/', (req, res) => {
  res.sendFile(path.join(initial_path, "home.html"));
})

// editor route
app.get('/editor', (req, res) => {
  res.sendFile(path.join(initial_path, "editor.html"));
})

// upload link
app.post('/upload', (req, res) => {
  let file = req.files.image;
  let date = new Date();
  // image
  let imagename = date.getDate() + date.getTime() + file.name;
  // image upload path
  let path = 'public/uploads/' + imagename;

  // create upload
  file.mv(path, (err, result) => {
    if(err){
      throw err;
    } else{
      // our image upload
      res.json(`uploads/${imagename}`);
    }
  })
})

app.get("/:sketch", (req, res) => {
  res.sendFile(path.join(initial_path, "sketch.html"))
})

app.use((req, res) => {
  res.json("404");
})

app.listen("3000", () => {
  console.log('listening ......');
})


