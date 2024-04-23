const express = require('express');
const axios = require('axios');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const complaintRoutes = require('./routes/complaints');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
// //express app
const app = express();


//middleware
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json())
app.use(cors())

app.use((req,res, next) => {
    console.log(req.path, req.method);
    next();
})

//db connection
const dbURI= process.env.DB_URI;

mongoose.connect(dbURI)
  .then(result => app.listen(4000 , () => {
    console.log('connected to db and listening to port 4000');
  }))
  .catch(err => console.log(err));

//route for homepage
app.get('/', (req, res) => {
    res.send('Hello')
});







// //complaints route
app.use('/complaints', complaintRoutes);

// // // admin routes
app.use('/admin', adminRoutes);


// //user routes
app.use('/user', userRoutes);









// // API endpoint to predict priority
// app.post('/predict-priority', (req, res) => {
//     const { category, hospitalsCount, schoolCount, upvotes, time } = req.body;
//     const predictedPriority = predict_priority(category, hospitalsCount, schoolCount, upvotes, time);
//     res.json({ predictedPriority });
// });

// //listen for port
// app.listen(4000, () => {
//     console.log("listening to port 4000");
// })