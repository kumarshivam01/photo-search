const express = require('express');
const router = express.Router();
const GalleryModel = require('../models/imageUpload')
const { body, validationResult } = require('express-validator');
const multer = require("multer");
const path = require('path');
const { requireAuth } = require('../middleware/auth')

// Set up multer to handle file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "gallery/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });


// upload image route
// Signup route
router.post('/image-upload',requireAuth,
    [
        // body('title').isLength({ min: 3 }).withMessage('Title Should be at least 3 chars long'),
        // body('description').isLength({ min: 10 }).withMessage('Description Should be at least 10 chars long'),
        // body('referenceId').isLength({ min: 1 }).withMessage('Id should be required'),
    ],upload.single('image'), async (req, res) => {
        const { title, description, referenceId, keyword } = req.body;
        

        // validate form
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.errors[0].msg });
        }

        // save image to database
        newImage = new GalleryModel({
            title, description, referenceId:req.user.user.id, keyword:JSON.parse(keyword), image:req.file.filename
        });
        await newImage.save();
        res.json({ message: 'Data Saved successfully' });
    });

    // get image through file name
    router.get('/gallery/:fileName', (req, res) => {
        const filePath = path.join(__dirname, '../gallery', req.params.fileName);
        res.sendFile(filePath);
    });

    // Define validation middleware for request body
const validateSearchQuery = [
    body('search').isLength({ min: 3 }).withMessage('Search query must be at least 3 characters long'),
  ];
  
  // API endpoint for searching items with pagination
  router.get('/api/items', validateSearchQuery, async (req, res) => {
    try {
      const errors = validationResult(req);
  
      const { search = '', page = 1, limit = 10 } = req.query;
  
      // Calculate skip and limit values for pagination
      const skip = (page - 1) * limit;
  
      // Create a MongoDB query for searching items
      const query = {
        $or: [
          { title: { $regex: search, $options: 'i' } }, 
          { description: { $regex: search, $options: 'i' } }, 
          { keyword: { $regex: search, $options: 'i' } }, 
        ],
      };
  
      //  query with pagination
      const items = await GalleryModel.find(query)
        .skip(skip)
        .limit(limit)
        .exec();
  
      // total items
      const totalItems = await GalleryModel.countDocuments(query);
  
      res.json({
        items,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

    module.exports = router;