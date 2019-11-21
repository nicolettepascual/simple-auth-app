const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
//import User
const User = require('./user');

router.post('/register', (req, res, next) => {
  let hasErrors = false ;
  let errors = [];
  
  if(!req.body.name){
  //validate name presence in the request
    errors.push({'name': 'Name not received'})
    hasErrors = true;
  }
  if(!req.body.email){
    //validate email presence in the request
    errors.push({'email': 'Email not received'})
    hasErrors = true;
  }
  if(!req.body.password){
    //validate password presence in the request
    errors.push({'password': 'Password not received'})
    hasErrors = true;
  }

  if(hasErrors){
    //if there is any missing field
    res.status(401).json({
      message: "Invalid input",
      errors: errors
    });

  }else{
  //if all fields are present
    //create the user with the model
    const new_user = new User({
      //assign request fields to the user attributes
      _id : mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    //save in the database
    new_user.save().then(saved_user => {
    //return 201, message and user details
      res.status(201).json({
        message: 'User registered',
        user: saved_user,
        errors: errors
      });
    }).catch(err => {
    //failed to save in database
      errors.push(new Error({
        db: err.message
      }))
      res.status(500).json(errors);
    })
  }

});

router.post('/login', (req, res, next) => {
  let hasErrors = false ;
  let errors = [];

  //check if email and password is provided
  if(!req.body.email){
    errors.push({'email': 'Email not received'})
    hasErrors = true;
  }
  if(!req.body.password){
    errors.push({'password': 'Password not received'})
    hasErrors = true;
  }

  if(hasErrors){
  //return error code an info
    res.status(422).json({
      message: "Invalid input",
      errors: errors
    });

  }else{
  //checking if credentials are valid
    if(req.body.email == 'user@person.com' && req.body.password == 'password'){
      //generate JWT token.
      const token = jwt.sign(
        {
          email: req.body.email, 
        }, 
        process.env.JWT_KEY, 
        {
          expiresIn: "1h"
        }
      );
      //validation OK
      res.status(200).json({
        message: 'Auth OK',
        token: token,
        errors: errors
      })
    }else{
      //return 401 and message error
      res.status(401).json({
        message: "Auth error"
      }) 
    }  
  }
});  


module.exports = router;