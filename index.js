const express = require('express');
const multer = require('multer');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises; // Import the promises version for async/await

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',//password 
  database: 'gallery'
});

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

app.post('/upload', upload.single('image'), (req, res) => {
  const photo = req.file.filename;
  db.query(
    'INSERT INTO images (photo) VALUES (?)',
    [photo],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, photo });
    }
  );
});

app.get('/images', (req, res) => {
  db.query('SELECT * FROM images ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.delete('/images/:id', async (req, res) => {
  const imageId = req.params.id;

  try {
    // Fetch the filename of the image to delete from the file system
    const [rows] = await db.promise().execute(
      'SELECT photo FROM images WHERE id = ?',
      [imageId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const photoFilename = rows[0].photo;
    const imagePath = path.join(__dirname, 'uploads', photoFilename);

    // Delete the database record
    await db.promise().execute('DELETE FROM images WHERE id = ?', [imageId]);

    // Delete the actual image file
    try {
      await fs.unlink(imagePath);
      console.log(`Deleted file: ${imagePath}`);
    } catch (fileDeleteError) {
      console.error('Error deleting file:', fileDeleteError);
      // We still want to consider the database deletion successful
    }

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Failed to delete image' });
  }
});

app.listen(8800, () => console.log('Server running on port 8800'));
