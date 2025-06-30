// import express
const express = require('express')


// import cors
const cors = require('cors')

// IMPORT .env
require('dotenv').config()


// import connect
require('./connection')



// create server
const commerce = express()

const AddController = require('./Controllers/ProductController')

// using cors
commerce.use(cors())

// parse the data - middleware - which have the ability to parse the data
commerce.use(express.json())

// add product

commerce.post("/products",AddController.Addproducts)

//get products
commerce.get('/products', AddController.getAllProducts);

// view single by id
commerce.get('/products/:id', AddController.getProductById);

commerce.delete('/products/:id', AddController.deleteProduct);
// update
commerce.put('/products/:id', AddController.updateProduct);



// port
const PORT = 7000 || process.env.PORT

//listen
commerce.listen(PORT,()=>{
    console.log(`server running successfully at port number ${PORT}`);
    
})
