'use strict'
const Product = require( './../models/product' )

function getProduct ( req, res ) {
  let productId = req.params.productId

  Product.findById( productId, ( err, product ) => {
    if( err ) return res.status( 500 ).send( {message: `Error al realizar la peticion: ${err}`} )
    if( !product ) return res.status( 404 ).send( {message: 'Product not found'} )

    res.status( 200 ).send( {product} )
  } )
}

function getProducts (req, res) {
  Product.find( {}, (err, products) => {
    if( err ) return res.status( 500 ).send( {message: `Error al realizar la peticion: ${err}`} )
    if( !products ) return res.status( 404 ).send( {message: 'Products not found'} )

    res.status( 200 ).send( {products} )
  } )
}

function saveProduct ( req, res ) {
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
}

function updateProducts ( req, res ) {
  let productId = req.params.productId
  let update = req.body

  Product.findByIdAndUpdate( productId, update, ( err, productUpdated ) => {
    if( err ) return res.status( 500 ).send( {message: `Error al actualizar el producto: ${err}`} )

    res.status( 200 ).send( {product: productUpdated} )
  } )
}

function deleteProduct ( req, res ) {
  let productId = req.params.productId

  Product.findById( productId, ( err, product ) => {
    if( err ) return res.status( 500 ).send( {message: `Error al borrar el producto: ${err}`} )
    if( !product ) return res.status( 404 ).send( {message: 'Product not found'} )

    product.remove( err => {
      if( err ) return res.status( 500 ).send( {message: `Error al borrar el producto: ${err}`} )

      res.status( 200 ).send( {message: "Product has been removed"} )
    } )
  } )
}

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProducts,
  deleteProduct
}