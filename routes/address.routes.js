const express = require("express");
const AddressController = require('../controllers/address.controller');


const addressRouter = express.Router();


addressRouter.post('/create/:memberid',AddressController.createAddress)
addressRouter.get('/', AddressController.getAddresses);
addressRouter.get( '/:id',AddressController.getAddressById)
addressRouter.delete('/delete/:id',AddressController.deleteAddress)
addressRouter.put('/update/:id',AddressController.updateAddress)


module.exports =  addressRouter;
