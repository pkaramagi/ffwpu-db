//const express = require('express');
const Award = require('../models/award.model');
const Member = require('../models/member.model');

/**
 * Retrieve all punishments
 */
function getAwards(req,res){
    Award.find()
    .then(results => {
        res.json(results);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while retrieving Awards."
        });
    });
}

function getAwardById(req,res){
    Award.findById(req.params.id)
    .then(results=>{
        res.json(results);
    }).catch(err=>{
        res.status(500).send({
            messeage: err.message || "Could not find Award"
        })
    })
}

function createAward(req,res){
    const data = req.body;
    console.log(req.query);
    Award.create(data)
    .then((newAward) => {
        return  Member.findByIdAndUpdate(
            { _id: req.params.memberid }, {$push: {awards: newAward._id}}, { new: true }
        );
      })
      .then((updatedMember)=>{
        res.json(updatedMember);
    }).catch((errors) => {
        res.status(500).json({
          errors,
        });
      });
}

function deleteAward(req,res){
    Award.findByIdAndRemove(req.params.id)
    .then(result =>{
        if(!result){
            return res.status(400).send({
                message: "Award not found with id"+ req.paramas.id
            })
        }
        res.send({message: "Award record deleted successfully"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Award not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Award with id " + req.params.id
        });
    });
}

function updateAward(req,res){
    if(!req.body){
        console.log(req.body)
        return res.status(400).send({
            message: "Award can not be empty"
        });
    }

    Award.findByIdAndUpdate(req.params.id,{$set:req.body})
    .then(result => {
        if(!result) {
            return res.status(404).send({
                message: "Award not found with id " + req.params.id
            });
        }
        res.send(result);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Award not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating Award with id " + req.params.id
        });
    });
}


module.exports = { getAwards, getAwardById, createAward,deleteAward, updateAward };
