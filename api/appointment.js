var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Booking = mongoose.models.Booking,
  apiResponse = require('../utils/apiResponse'),
  apiErrors = require('../utils/apiErrors'),
  User = mongoose.models.User,
  Doctor = mongoose.models.Doctor,
  Booking = mongoose.models.Booking


  const bookAppointment = async function(req, res){
    try{
        let booking = new Booking()
        let userEmail = req.body.user_email
        let doctorEmail = req.body.doctor_email
        let appointmentTime = req.body.appointment_time
        let userObj = await User.findOne({"email":userEmail})
        let doctorObj = await Doctor.findOne({"email":doctorEmail})
        booking.user = userObj
        booking.doctor = doctorObj
        booking.appointment_time = appointmentTime
        await booking.save()
        return apiResponse.sendResponse({message:"Appointment booked successfully"}, 200, res)
    } catch(err){
        console.log("---------err----------",err)
        return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
    }
  }

  const getUserAppointmentByEmail = async function(req, res){
    try{
        let email = req.query.email

        let bookingList = await Booking.find({"user.email":email})
        return apiResponse.sendResponse(bookingList, 200, res)
    } catch(err){
        console.log("---------err----------",err)
        return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
    }
  }

  const getAllUserAppointmentByDoctorName = async function(req, res){
    try{
        let doctorName = req.query.doctor_name

        let bookingList = await Booking.find({"doctor.name":doctorName})
        return apiResponse.sendResponse(bookingList, 200, res)
    } catch(err){
        console.log("---------err----------",err)
        return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
    }
  }

  const cancelAppointment = async function(req, res){
    try{
        let userEmail = req.body.user_email
        let appointmentTime = req.body.appointment_time
  console.log("------&&&----",userEmail,appointmentTime)
        let updatedAppointment = await Booking.updateOne({$and:[{"user.email":userEmail},{"appointment_time":appointmentTime}]},{$set:{"status":"CANCELLED"}})

        return apiResponse.sendResponse({message:"Appointment cancelled successfully"}, 200, res)
    } catch(err){
        console.log("---------err----------",err)
        return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
    }
  }

  const changeAppointmentTime = async function(req, res){
    try{
        let userEmail = req.body.user_email
        let originalAppointmentTime = req.body.original_appointment_time
        let newAppointmentTime = req.body.new_appointment_time

        let updatedAppointment = await Booking.updateOne({"user.email":userEmail,"appointment_time":originalAppointmentTime},{$set:{"appointment_time":newAppointmentTime}})

        return apiResponse.sendResponse({message:"Appointment cancelled successfully"}, 200, res)
    } catch(err){
        console.log("---------err----------",err)
        return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res)
    }
  }

  router.post('/appointment/bookAppointment', bookAppointment)

  router.get('/appointment/getUserAppointmentByEmail', getUserAppointmentByEmail)
  router.get('/appointment/getAllUserAppointmentByDoctorName', getAllUserAppointmentByDoctorName)

  router.put('/appointment/cancelAppointment', cancelAppointment)
  router.put('/appointment/changeAppointmentTime', changeAppointmentTime)

  module.exports = router;