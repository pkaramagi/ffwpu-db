const models = require('../models/');

const addAttendeeToService = function(sundayServiceId, member) {
    return models.SundayService.findByIdAndUpdate(
      sundayServiceId,
      { $push: { attendees: member._id } },
      { new: true, useFindAndModify: false }
    );
  };
  
  const addServiceToAttendee = function(memberId, sundayService) {
    return models.Member.findByIdAndUpdate(
      memberId,
      { $push: { sundayService: sundayService._id } },
      { new: true, useFindAndModify: false }
    );
  };

  const addAttendeeToWorkshop = function(workshopId, member) {
    return models.Workshop.findByIdAndUpdate(
      workshopId,
      { $push: { attendees: member._id } },
      { new: true, useFindAndModify: false }
    );
  };
  
  const addWorkshopToAttendee = function(memberId, workshop) {
    return models.Member.findByIdAndUpdate(
      memberId,
      { $push: { workshops: workshop._id } },
      { new: true, useFindAndModify: false }
    );
  };


