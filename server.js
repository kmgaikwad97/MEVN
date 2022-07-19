const express = require('express')
const app = express()
// const PORT = 3000
const dotenv = require('dotenv')
const mongoose  = require('mongoose')
const {PORT,mongoUri} = require('./config')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser') 
const bucketListItemRoutes = require('./routes/api/bucketListItems')
const path = require('path')


app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

dotenv.config({path:'./.env'})



app.use('/api/bucketListItems', bucketListItemRoutes)

// app.get('/',(req,res)=>{
//     res.send("Hello World")
// })


// horeku start
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}
// horeku end

app.listen(PORT,()=>{
    console.log(`App is Listening at ${PORT}`);
})