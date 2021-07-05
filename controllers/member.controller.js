//const express = require('express');
const Member = require('../models/member.model');


/**
 * Retrieve all punishments
 */
function getMembers(req,res){
    Member.find()
    .then(results => {
        res.json(results);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Members."
        });
    });
}

function getMemberById(req,res){
    Member.findById(req.params.id)
    .populate('addresses')
    .populate({ path: 'sundayService', select: ["date", "preacher","sermonTitle"] })
    .populate({path:'workshops', select:["title","theme", "location"] })
    .populate('certifications')
    .populate('uccareers')
    .populate('punishments')
    .populate('awards')
    .then(results=>{
        res.json(results);
    }).catch(err=>{
        res.status(500).send({
            messeage: err.message || "Somethign went wrong"
        })
    })
}

function createMember(req,res){
    const data = req.body;
    console.log(req.query);
    Member.create(data)
    .then((newMember) => {
        res.json(newMember);
      }).catch((errors) => {
        res.status(500).json({
          errors,
        });
      });
}

function deleteMember(req,res){
    Member.findByIdAndRemove(req.params.id)
    .then(result =>{
        if(!result){
            return res.status(400).send({
                message: "Member not found with id"+ req.paramas.id
            })
        }
        res.send({message: "Member record deleted successfully"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Member not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Member with id " + req.params.id
        });
    });
}

function updateMember(req,res){
    if(!req.body){
        console.log(req.body)
        return res.status(400).send({
            message: "Member can not be empty"
        });
    }

    Member.findByIdAndUpdate(req.params.id,{$set:req.body})
    .then(result => {
        if(!result) {
            return res.status(404).send({
                message: "Member not found with id " + req.params.id
            });
        }
        res.send(result);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Member not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating Member with id " + req.params.id
        });
    });
}


module.exports = { getMembers, getMemberById, createMember,deleteMember, updateMember };
