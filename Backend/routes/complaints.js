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


const { upload }= require('../middleware/multer.middleware')
const requireAuth = require('../middleware/requireAuth')    

const router = express.Router();




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