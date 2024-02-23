const express = require('express');
const {
    createComplaint,
    getComplaints,
    getComplaint,
    deleteComplaint,
    updateComplaint
} = require('../controllers/complaintController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();


//require auth for all complaints routes
router.use(requireAuth)



// GET the lodge  complaint page
router.get('/', (req, res) => {
    res.send('Lodge complaints');
})

//GET all complaints
router.get('/all', getComplaints )

//route to POST lodge complaint
router.post('/', createComplaint)

//GET a single complaint
router.get('/:id', getComplaint)

//DELETE COMPLAINT
router.delete('/:id', deleteComplaint)

//UPDATE COMPLAINT
router.patch('/:id', updateComplaint)


module.exports = router;