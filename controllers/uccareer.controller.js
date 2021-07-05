//const express = require('express');
const UCCareer = require('../models/uccareer.model');
const Member = require('../models/member.model');

/**
 * Retrieve all UcCareers
 */
function getUcCareers(req,res){
    UCCareer.find()
    .then(results => {
        res.json(results);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving UCCareers."
        });
    });
}

function getUcCareerById(req,res){
    UCCareer.findById(req.params.id)
    .then(results=>{
        res.json(results);
    }).catch(err=>{
        res.status(500).send({
            messeage: err.message || "Somethign went wrong"
        })
    })
}


function createUcCareer(req,res){
    const data = req.body;
    
    console.log(req);
    
    UCCareer.create(data)
    .then((newUCCareer) => {
        return  Member.findByIdAndUpdate(
            { _id: req.params.memberid }, {$push: {uccareers: newUCCareer._id}}, { new: true }
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

function deleteUcCareer(req,res){
    UCCareer.findByIdAndRemove(req.params.id)
    .then(result =>{
        if(!result){
            return res.status(400).send({
                message: "UCCareer not found with id"+ req.paramas.id
            })
        }
        res.send({message: "UCCareer record deleted successfully"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "UCCareer not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete UCCareer with id " + req.params.id
        });
    });
}

function updateUcCareer(req,res){
    if(!req.body){
        console.log(req.body)
        return res.status(400).send({
            message: "UcCareer can not be empty"
        });
    }

    UCCareer.findByIdAndUpdate(req.params.id,{$set:req.body})
    .then(result => {
        if(!result) {
            return res.status(404).send({
                message: "UCCareer not found with id " + req.params.id
            });
        }
        res.send(result);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "UCCareer not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating UC Career with id " + req.params.id
        });
    });
}


module.exports = { getUcCareers, getUcCareerById, createUcCareer,deleteUcCareer, updateUcCareer };
