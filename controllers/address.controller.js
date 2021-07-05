//const express = require('express');
const Address = require('../models/address.model');
const Member = require('../models/member.model');

/**
 * Retrieve all punishments
 */
function getAddresses(req,res){
    Address.find()
    .then(results => {
        res.json(results);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Addresses."
        });
    });
}

function getAddressById(req,res){
    Address.findById(req.params.id)
    .then(results=>{
        res.json(results);
    }).catch(err=>{
        res.status(500).send({
            messeage: err.message || "Somethign went wrong"
        })
    })
}

function createAddress(req,res){
    const data = req.body;
    console.log(req.query);
    Address.create(data)
    .then((newAddress) => {
        return  Member.findByIdAndUpdate(
            { _id: req.params.memberid }, {$push: {addresses: newAddress._id}}, { new: true }
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

function deleteAddress(req,res){
    Address.findByIdAndRemove(req.params.id)
    .then(result =>{
        if(!result){
            return res.status(400).send({
                message: "Address not found with id"+ req.paramas.id
            })
        }
        res.send({message: "Address record deleted successfully"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Address not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Address with id " + req.params.id
        });
    });
}

function updateAddress(req,res){
    if(!req.body){
        console.log(req.body)
        return res.status(400).send({
            message: "Address can not be empty"
        });
    }

    Address.findByIdAndUpdate(req.params.id,{$set:req.body})
    .then(result => {
        if(!result) {
            return res.status(404).send({
                message: "Address not found with id " + req.params.id
            });
        }
        res.send(result);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Address not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating Address with id " + req.params.id
        });
    });
}


module.exports = { getAddresses, getAddressById, createAddress,deleteAddress, updateAddress };
