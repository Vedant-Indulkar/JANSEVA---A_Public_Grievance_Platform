const express = require('express');
const {
    createComplaint,
    getComplaints,
    getComplaint,
    deleteComplaint,
    updateComplaint
} = require('../controllers/complaintController')

const router = express.Router();



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