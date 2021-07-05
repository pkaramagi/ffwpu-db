const express = require("express");
const MemberController = require('../controllers/member.controller');
const memberRouter = express.Router();

memberRouter.post('/create',MemberController.createMember)
memberRouter.get('/', MemberController.getMembers);
memberRouter.get( '/:id',MemberController.getMemberById)
memberRouter.delete('/delete/:id',MemberController.deleteMember)
memberRouter.put('/update/:id',MemberController.updateMember)


module.exports =  memberRouter;

