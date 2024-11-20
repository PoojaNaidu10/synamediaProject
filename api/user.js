
var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.models.User,
  apiResponse = require('../utils/apiResponse'),
  apiErrors = require('../utils/apiErrors')

  const addUser = async function(req, res){
    try{
        let user = new User(req.body)
        await user.save()
        return apiResponse.sendResponse({message:"User added successfully"}, 200, res)
    } catch(err){
        console.log("------err-------",err)
        return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
    }
  }

  router.post('/user/addUser', addUser)
  module.exports = router;