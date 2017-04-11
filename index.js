'use strict'

const mongoose = require( 'mongoose' )
const app = require( './app' )
const config = require( './config' )



mongoose.connect( config.db, ( err, res ) => {
  if( err ) {
    return console.log( `DB connection erro : ${err}` )
  }

  console.log( 'DB Connection enabled..' )

  app.listen( config.port, () => {
    console.log( `Running on port ${config.port}` )
  } )
} )
