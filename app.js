const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.set('view engine', 'ejs');
app.use(express.static('uploads'));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  fs.readdir('uploads', (err, files) => {
    if (err) return res.status(500).send('Error reading files');
    res.render('index', { files });
  });
});

app.get('/upload', (req, res) => {
  res.render('upload');
});

app.post('/upload', upload.single('image'), (req, res) => {
  res.redirect('/');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
