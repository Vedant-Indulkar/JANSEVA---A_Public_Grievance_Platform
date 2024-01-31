const Complaint = require('../models/complaintModels');
const mongoose = require('mongoose')

//get all complaints
const getComplaints = async (req, res) => {
    const complaints = await Complaint.find({}).sort({createdAt: -1})

    res.status(200).json(complaints)
}

//get a single complaint
const getComplaint =  async (req , res) => {
    const { id } = req.params
    
    const complaint = await Complaint.findById(id)

    if(!complaint){
        return res.status(404).json({error: 'No such complaint'})
    }

    res.status(200).json(complaint)
}

//create new complaint
const createComplaint = async (req, res) => {
    const {category, sub_category, description, ward_no, image_url, location} = req.body


    //add doc to db
    try{
        const complaint = await Complaint.create({category, sub_category, description, ward_no, image_url, location}) 
        res.status(200).json(complaint)
    }catch(error) {
        res.status(400).json({error: error.message})
    }
}

//delete a complaint
const deleteComplaint = async (req, res) => {
    const { id } = req.params

    const complaint = await Complaint.findOneAndDelete({
        _id : id
    })

    if(!complaint){
        return res.status(400).json({error: 'No such complaint'})
    }

    res.status(200).json(complaint)

}

//update a complaint
const updateComplaint = async (req,res) => {
    const { id } = req.params

    const complaint = await Complaint.findOneAndUpdate({ _id : id}, {
        ...req.body
    })
    if(!complaint){
        return res.status(400).json({error: 'No such complaint'})
    }

    res.status(200).json(complaint)


}


module.exports = {
    createComplaint,
    getComplaints,
    getComplaint,
    deleteComplaint,
    updateComplaint
}