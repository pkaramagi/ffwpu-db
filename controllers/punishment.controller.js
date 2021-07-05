//const express = require('express');
const Punishment = require('../models/punishment.model');
const Member = require('../models/member.model');
/**
 * Retrieve all punishments
 */
function getPunishments(req,res){
    Punishment.find()
    .then(results => {
        res.json(results);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Punishments."
        });
    });
}

function getPunishmentById(req,res){
    Punishment.findById(req.params.id)
    .then(results=>{
        res.json(results);
    }).catch(err=>{
        res.status(500).send({
            messeage: err.message || "Somethign went wrong"
        })
    })
}

function createPunishment(req,res){
    const data = req.body;
    console.log(data);
    Punishment.create(data)
    .then((newPunishment) => {
        return  Member.findByIdAndUpdate(
            { _id: req.params.memberid }, {$push: {punishments: newPunishment._id}}, { new: true }
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

function deletePunishment(req,res){
    Punishment.findByIdAndRemove(req.params.id)
    .then(result =>{
        if(!result){
            return res.status(400).send({
                message: "Punishment not found with id"+ req.paramas.id
            })
        }
        res.send({message: "Punishment record deleted successfully"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Punishment not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Punishment with id " + req.params.id
        });
    });
}

function updatePunishment(req,res){
    if(!req.body){
        console.log(req.body)
        return res.status(400).send({
            message: "Punishment can not be empty"
        });
    }

    Punishment.findByIdAndUpdate(req.params.id,{$set:req.body})
    .then(result => {
        if(!result) {
            return res.status(404).send({
                message: "Punishment not found with id " + req.params.id
            });
        }
        res.send(result);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Punishment not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating Punishment with id " + req.params.id
        });
    });
}


module.exports = { getPunishments, getPunishmentById, createPunishment,deletePunishment, updatePunishment };
