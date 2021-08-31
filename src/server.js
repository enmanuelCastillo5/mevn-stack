const cors = require('cors')
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()

mongoose.connect('mongodb://localhost/mevn-stack').then(() => console.log('db conected')).catch(error => console.log(error));
//settings
app.set('port', process.env.PORT || 3000)

//midleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'))

//routes
app.use('/api/items', require('./routes/item'));


//static files
app.use(express.static(path.join(__dirname, 'public')))

app.listen(app.get('port'), (res) =>{
    console.log(`server on port ${app.get('port')}`)
});