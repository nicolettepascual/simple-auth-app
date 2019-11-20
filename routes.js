const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/register', (req, res, next) => {
  let hasErrors = false ;
  let errors = [];
  
  if(!req.body.name){
    errors.push({'name': 'Name not received'})
    hasErrors = true;
  }
  if(!req.body.email){
    errors.push({'email': 'Email not received'})
    hasErrors = true;
  }
  if(!req.body.password){
    errors.push({'password': 'Password not received'})
    hasErrors = true;
  }

  if(hasErrors){
    res.status(422).json({
      message: "Invalid input",
      errors: errors
    });

  }else{
    res.status(201).json({
        message: 'User created!',
        errors: errors
      });
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