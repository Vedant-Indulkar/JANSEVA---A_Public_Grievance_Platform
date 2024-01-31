const mongoose = require('mongoose');

const Schema = mongoose.Schema; //create a schema

const complaintsSchema = new Schema({
    category : {
        type: String,
        required: true
    },
    
    sub_category : {
        type: String,
        required: true
    },

    description : {
        type: String,
        required: true
    },

    ward_no : {
        type: String,
        required: true
    },

    image_url : {
        type: String,
        required: true
    },

    location : {
        type: String,
        required: true
    }
}, {timestamps : true} );

const Complaint = mongoose.model('Complaint', complaintsSchema);
module.exports = Complaint;