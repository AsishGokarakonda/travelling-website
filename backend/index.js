const path = require('path')


const connectToMongo = require("./db");

connectToMongo();
const authentication = require('./routes/auth.js')
const products = require('./routes/products.js')

const express = require('express')
var cors = require('cors')
var app = express()
 
app.use(cors())
 
const port = process.env.Port || 5000


app.use(express.json()) 
app.use("/api/auth",authentication)
app.use("/api/products",products)

if (process.env.NODE_ENV === "production"){
  const x = __dirname.replace('\\backend','')
  console.log(path.join(x,'/frontend/build'))
  app.use(express.static(path.join(x,'/frontend/build')))

  app.get('*', (req,res) =>{
    console.log(path.join(path.join(x,'frontend','build','index.html')));
    res.sendFile(path.join(path.join(x,'frontend','build','index.html')))
  })

}else{
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })  
}




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    })