const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

//middleware
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

//multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'D:\\programming\\college website\\client\\src\\images'); // Change this to your desired path
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now(); // Get current timestamp
        const originalName = file.originalname; // Get original file name
        const extension = path.extname(originalName); // Get file extension
        const nameWithoutExt = path.basename(originalName, extension); // Get name without extension
    
        // Construct the new filename
        const newFileName = `${timestamp}_${nameWithoutExt}${extension}`;
        cb(null, newFileName); // Use the new filename
    },
    
  });

  const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Not an image! Please upload only images.'), false);
    }
    cb(null, true);
  };
  
  const upload = multer({ storage,fileFilter });

//add a news
app.post("/news", async (req,res)=>{
    try {
        const { description } = req.body;
        const addNews = await pool.query("INSERT INTO news(description) VALUES($1) RETURNING *",[description]);
        res.json(addNews.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});
 
//get all news
app.get("/news", async (req,res)=>{
    try {
        const getNews = await pool.query("SELECT description FROM news");
        res.json(getNews.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//get news with id
app.get("/news-id", async (req,res)=>{
    try {
        const getNews = await pool.query("SELECT * FROM news");
        res.json(getNews.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//update a news
app.put("/news/:id", async (req,res)=>{
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateNews = await pool.query("UPDATE news SET description = $1 WHERE id = $2",[description,id]);
        res.json("News Updated");
    } catch (error) {
        console.error(error.message);
    }
});
//delete a news
app.delete("/news/:id",async (req,res)=>{
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM news WHERE id = $1",[id]);
        res.json("News Deleted");
    } catch (error) {
        console.error(error.message);
    }
});

//add an announcement
app.post("/announcements", async (req,res)=>{
    try {
        const { description } = req.body;
        const addAnnouncements = await pool.query("INSERT INTO announcements(description) VALUES($1) RETURNING *",[description]);
        res.json(addAnnouncements.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

//get all announcements
app.get("/announcements", async (req,res)=>{
    try {
        const getAnnouncements = await pool.query("SELECT description FROM announcements");
        res.json(getAnnouncements.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//get with id
app.get("/announcements-id", async (req,res)=>{
    try {
        const getAnnouncements = await pool.query("SELECT * FROM announcements");
        res.json(getAnnouncements.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//update an announcements
app.put("/announcements/:id", async (req,res)=>{
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateNews = await pool.query("UPDATE announcements SET description = $1 WHERE id = $2",[description,id]);
        res.json("announcements Updated");
    } catch (error) {
        console.error(error.message);
    }
});
//delete an announcement
app.delete("/announcements/:id",async (req,res)=>{
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM announcements WHERE id = $1",[id]);
        res.json("announcements Deleted");
    } catch (error) {
        console.error(error.message);
    }
});

//upload an image
app.post('/upload', upload.array('images', 10), (req, res) => {
    res.json({ message: 'Files uploaded successfully!', files: req.files });
  });

// Endpoint to fetch the list of uploaded images
app.get('/images', (req, res) => {
    const directoryPath = 'D:\\programming\\college website\\client\\src\\images';
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return res.status(500).json({ message: 'Unable to scan files.' });
      }
      const images = files.map(file => ({ name: file }));
      res.json(images);
    });
  });
  
  // Endpoint to delete a specific image
  app.delete('/delete/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const filePath = path.join('D:\\programming\\college website\\client\\src\\images', imageName);
  
    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to delete image.' });
      }
      res.json({ message: 'Image deleted successfully.' });
    });
  });

app.listen(5000, ()=>{
    console.log("Server on port 5000");
});