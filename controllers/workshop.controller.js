//const express = require('express');
const Workshop = require('../models/workshop.model');
const Member = require('../models/member.model');

/**
 * Retrieve all punishments
 */
function getWorkshops(req,res){
    Workshop.find()
    .then(results => {
        res.json(results);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Workshops."
        });
    });
}

function getWorkshopById(req,res){
    Workshop.findById(req.params.id)
    .then(results=>{
        res.json(results);
    }).catch(err=>{
        res.status(500).send({
            messeage: err.message || "Somethign went wrong"
        })
    })
}

function createWorkshop(req,res){
    const data = req.body;
   Workshop.create(data)
    .then((newWorkshop) => {
        res.json(newWorkshop);
        console.log(data);
      }).catch((errors) => {
        res.status(500).json({
          errors,
        });
      });
}

function deleteWorkshop(req,res){
    Workshop.findByIdAndRemove(req.params.id)
    .then(result =>{
        if(!result){
            return res.status(400).send({
                message: "Workshop not found with id"+ req.paramas.id
            })
        }
        res.send({message: "Workshop record deleted successfully"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Workshop not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Workshop with id " + req.params.id
        });
    });
}

function updateWorkshop(req,res){
    if(!req.body){
        console.log(req.body)
        return res.status(400).send({
            message: "Workshop can not be empty"
        });
    }

    Workshop.findByIdAndUpdate(req.params.id,{$set:req.body})
    .then(result => {
        if(!result) {
            return res.status(404).send({
                message: "Workshop not found with id " + req.params.id
            });
        }
        res.send(result);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Workshop not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating Workshop with id " + req.params.id
        });
    });
}


function addAttendeeToWorkshop(req,res) {
    const workshopId = req.params.workshopId;
    const memberId = req.params.memberId;
    console.log(memberId);
    Workshop.findByIdAndUpdate(
      workshopId,
      { $push: { attendees: memberId } },
      { new: true, useFindAndModify: false }
    ).then((updatedWorkshop) => {
        return  Member.findByIdAndUpdate(
            { _id: memberId }, {$push: {workshops: updatedWorkshop._id}}, { new: true }
        );
      }).then((updatedMember)=>{
        res.json(updatedMember);
    }).catch(error=>{
        return res.status(500).send({
            message: "Error updating Workshop with id " + sundayServiceId,
            error: error
        });
    });
  };

module.exports = { getWorkshops, getWorkshopById, createWorkshop,deleteWorkshop, updateWorkshop, addAttendeeToWorkshop };
