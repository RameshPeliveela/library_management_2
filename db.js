const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.DB_URL;

mongoose.connect(url);

const db = mongoose.connection;

db.on('connected', ()=>{console.log("Database connected successfully")})

db.on('disconnect', ()=>{console.log("Datbase is disconnected")})

db.on('error', ()=>{console.log("error in connecting database")})

module.exports = db;
