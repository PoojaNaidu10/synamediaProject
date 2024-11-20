var express = require('express'),
  router = express.Router(),
  
  mongoose = require('mongoose'),
  Doctor = mongoose.models.Doctor,
  apiResponse = require('../utils/apiResponse'),
  apiErrors = require('../utils/apiErrors')

  const addDoctor = async function(req, res){
    try{
        let doctor = new Doctor(req.body)
        await doctor.save()
        return apiResponse.sendResponse({message:"Doctor added successfully"}, 200, res)
    } catch(err){
        console.log("---------err---------",err)
        return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
    }
  }


  router.post('/doctor/addDoctor', addDoctor)
  module.exports = router;