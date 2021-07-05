//const express = require('express');
const Certification = require('../models/certification.model');
const Member = require('../models/member.model');

/**
 * Retrieve all Certifications
 */
function getCertifications(req,res){
    Certification.find()
    .then(results => {
        res.json(results);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Certifications."
        });
    });
}

function getCertificationById(req,res){
    Certification.findById(req.params.id)
    .then(results=>{
        res.json(results);
    }).catch(err=>{
        res.status(500).send({
            messeage: err.message || "Somethign went wrong"
        })
    })
}

function createCertification(req,res){
    const data = req.body;
    console.log(data);
    Certification.create(data)
    .then((newCertification) => {
       return  Member.findByIdAndUpdate(
            { _id: req.params.memberid }, {$push: {certifications: newCertification._id}}, { new: true }
        );
      })
      .then((updatedMember)=>{
        res.json(updatedMember);
    })
      .catch((errors) => {
        res.status(500).json({
          errors,
        });
      });
}

function deleteCertification(req,res){
    Certification.findByIdAndRemove(req.params.id)
    .then(result =>{
        if(!result){
            return res.status(400).send({
                message: "Certification not found with id"+ req.paramas.id
            })
        }
        res.send({message: "Certification record deleted successfully"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Certification not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Certification with id " + req.params.id
        });
    });
}

function updateCertification(req,res){
    if(!req.body){
        console.log(req.body)
        return res.status(400).send({
            message: "Certification can not be empty"
        });
    }

    Certification.findByIdAndUpdate(req.params.id,{$set:req.body})
    .then(result => {
        if(!result) {
            return res.status(404).send({
                message: "Certification not found with id " + req.params.id
            });
        }
        res.send(result);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Certification not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating Certification with id " + req.params.id
        });
    });
}


module.exports = { getCertifications, getCertificationById, createCertification,deleteCertification, updateCertification };
