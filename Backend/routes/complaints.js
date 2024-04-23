const express = require('express');
const {
    upvoteComplaint,
    createComplaint,
    getComplaints,
    getComplaint,
    deleteComplaint,
    updateComplaint,
    getAllComplaints
} = require('../controllers/complaintController')

const axios = require('axios');




const { upload }= require('../middleware/multer.middleware')
const requireAuth = require('../middleware/requireAuth')    

const router = express.Router();

// Route to submit a complaint
router.post('/submit', async (req, res) => {
    try {
        // Forward complaint data to Flask API
        const response = await axios.post('http://127.0.0.1:5000/submit-complaint', req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to fetch all complaints
router.get('/allfromflask', async (req, res) => {
    try {
        // Fetch complaints from Flask API
        const response = await axios.get('http://127.0.0.1:5000/get-all-complaints');
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to fetch predictions for complaint priorities
router.post('/predict-priority', async (req, res) => {
    try {
        // Forward complaint data to Flask API
        const response = await axios.post('http://127.0.0.1:5000/predict-priority', req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//require auth for all complaints routes
router.use(requireAuth)

router.post('/:id/upvote', upvoteComplaint)

router.get('/all/upvote', getAllComplaints )




// GET the lodge  complaint page
router.get('/', (req, res) => {
    res.send('Lodge complaints');
})

//GET all complaints
router.get('/all', getComplaints )


//route to POST lodge complaint
router.post('/', upload.fields([
    {
        name:'image_url',
        maxCount:1
    }
]) ,createComplaint)

//GET a single complaint
router.get('/:id', getComplaint)

//DELETE COMPLAINT
router.delete('/:id', deleteComplaint)

//UPDATE COMPLAINT
router.patch('/:id', updateComplaint)


module.exports = router;