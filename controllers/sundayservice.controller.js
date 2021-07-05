//const express = require('express');
const SundayService = require('../models/sundayservice.model');
const Member = require('../models/member.model');

/**
 * Retrieve all punishments
 */
function getSundayServices(req,res){
    SundayService.find()
    .then(results => {
        res.json(results);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving SundayServices."
        });
    });
}

function getSundayServiceById(req,res){
    SundayService.findById(req.params.id)
    .then(results=>{
        res.json(results);
    }).catch(err=>{
        res.status(500).send({
            messeage: err.message || "Somethign went wrong"
        });
    })
}

function createSundayService(req,res){
    const data = req.body;
    console.log(req.query);
    SundayService.create(data)
    .then((newSundayService) => {
        res.json(newSundayService);
      }).catch((errors) => {
        res.status(500).json({
          errors,
        });
      });
}

function deleteSundayService(req,res){
    SundayService.findByIdAndRemove(req.params.id)
    .then(result =>{
        if(!result){
            return res.status(400).send({
                message: "SundayService not found with id"+ req.paramas.id
            })
        }
        res.send({message: "SundayService record deleted successfully"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "SundayService not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete SundayService with id " + req.params.id
        });
    });
}

function updateSundayService(req,res){
    if(!req.body){
        console.log(req.body)
        return res.status(400).send({
            message: "SundayService can not be empty"
        });
    }

    SundayService.findByIdAndUpdate(req.params.id,{$set:req.body})
    .then(result => {
        if(!result) {
            return res.status(404).send({
                message: "SundayService not found with id " + req.params.id
            });
        }
        res.send(result);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "SundayService not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating SundayService with id " + req.params.id
        });
    });
}

function addAttendeeToService(req,res) {
    const sundayServiceId = req.params.sundayServiceId;
    const memberId = req.params.memberId;
    console.log(memberId);
    SundayService.findByIdAndUpdate(
      sundayServiceId,
      { $push: { attendees: memberId } },
      { new: true, useFindAndModify: false }
    ).then((updatedSundayService) => {
        return  Member.findByIdAndUpdate(
            { _id: memberId }, {$push: {sundayService: updatedSundayService._id}}, { new: true }
        );
      }).then((updatedMember)=>{
        res.json(updatedMember);
    }).catch(error=>{
        return res.status(500).send({
            message: "Error updating SundayService with id " + sundayServiceId,
            error: error
        });
    });
  };


module.exports = { getSundayServices, getSundayServiceById, createSundayService,deleteSundayService, updateSundayService, addAttendeeToService };
