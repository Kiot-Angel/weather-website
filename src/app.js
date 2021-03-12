const path = require('path')
const express = require('express')
const hbs = require('hbs')
var  geoCode = require('./utils/geocode.js')
var forecast = require('./utils/forecast.js')


console.log(path.join(__dirname, '../public'))

const app = express();
const port = process.env.PORT || 3000

const publicPathDirectory = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('views', path.join(__dirname, '../templates/views'))
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicPathDirectory))


app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather APP',
        name: 'Ankit'
    })
})

app.get('/about' , (req, res)=> {
    res.render('about',{
        title: 'About Page',
        name: 'Ankit'
    })
})

app.get('/help' , (req, res)=> {
    res.render('help',{
       value: 'Demo Value for Help',
       title: "help",
       name: 'Ankit'
    })
})

app.get('/weather' , (req, res)=> {
   
   if(!req.query.address){
       return res.send({
           error :'you must provide address'
       })
    }

    var address = req.query.address
    geoCode(address, (error, {latitude,longitude,location} = {}) => {
        if(error){

            return res.send({ error })
        //    return console.log('Error ', error)
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
               // return console.log("Error", error)
            }

            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
})

app.get('/products' , (req, res)=> {

    if(!req.query.search){
      return  res.send({
            error: 'You must provide a search term'
        })
    }
    //req.query()
    res.send({
        forecast: 'It is raining',
        location: 'India',
        products: []
    })
})

app.get('*', (req, res)=> {
  res.render('404',{
      title: '404',
      name: 'Ankit',
    errorMessage: 'Page Not found'
  })
})

app.listen(port, ()=> {
    console.log('Server Started on port '+port)
})