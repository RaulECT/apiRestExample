'use strict'

const express = require( 'express' )
const bodyParser = require( 'body-parser' )
const mongoose = require( 'mongoose' )

const Product = require( './models/product' )

const app = express()
const port = process.env.PORT || 3000

app.use( bodyParser.urlencoded( {extended: false} ) )
app.use( bodyParser.json() )

app.get( '/api/product', ( req, res ) => {
  Product.find( {}, (err, products) => {
    if( err ) return res.status( 500 ).send( {message: `Error al realizar la peticion: ${err}`} )
    if( !products ) return res.status( 404 ).send( {message: 'Products not found'} )

    res.status( 200 ).send( {products} )
  } )


} )

app.get( '/api/product/:productId', ( req, res ) => {
  let productId = req.params.productId

  Product.findById( productId, ( err, product ) => {
    if( err ) return res.status( 500 ).send( {message: `Error al realizar la peticion: ${err}`} )
    if( !product ) return res.status( 404 ).send( {message: 'Product not found'} )

    res.status( 200 ).send( {product} )
  } )

} )

app.post( '/api/product', ( req, res ) => {
  console.log( 'POST /api/product' )
  console.log( req.body )

  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save( ( err, productStored ) => {
    if( err ) res.status( 500 ).send( {message: `Error to save product: ${err}`} )

    res.status( 200 ).send( {product: productStored} )
  } )
} )

app.put( '/api/product/:productId', ( req, res ) => {
    let productId = req.params.productId
    let update = req.body

    Product.findByIdAndUpdate( productId, update, ( err, productUpdated ) => {
      if( err ) return res.status( 500 ).send( {message: `Error al actualizar el producto: ${err}`} )

      res.status( 200 ).send( {product: productUpdated} )
    } )
} )

app.delete( '/api/product/:productId', ( req, res ) => {
  let productId = req.params.productId

  Product.findById( productId, ( err, product ) => {
    if( err ) return res.status( 500 ).send( {message: `Error al borrar el producto: ${err}`} )
    if( !product ) return res.status( 404 ).send( {message: 'Product not found'} )

    product.remove( err => {
      if( err ) return res.status( 500 ).send( {message: `Error al borrar el producto: ${err}`} )

      res.status( 200 ).send( {message: "Product has been removed"} )
    } )
  } )
} )

mongoose.connect( 'mongodb://localhost:27017/shop', ( err, res ) => {
  if( err ) {
    return console.log( `DB connection erro : ${err}` )
  }

  console.log( 'DB Connection enabled..' )

  app.listen( port, () => {
    console.log( `Running on port ${port}` )
  } )
} )
