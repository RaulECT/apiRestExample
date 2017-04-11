'use strict'

const mongoose = require( 'mongoose' )
const app = require( './app' )

const port = process.env.PORT || 3000


mongoose.connect( 'mongodb://localhost:27017/shop', ( err, res ) => {
  if( err ) {
    return console.log( `DB connection erro : ${err}` )
  }

  console.log( 'DB Connection enabled..' )

  app.listen( port, () => {
    console.log( `Running on port ${port}` )
  } )
} )
