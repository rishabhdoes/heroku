const joi =require('joi');

module.exports.Campgroundschema =joi.object({

    campground:joi.object({
      title:joi.string().required(),
      price:joi.number().required().min(0),
      location:joi.string().required(),
      description:joi.string().required(),
      image:joi.string().required(),
    }).required()

  });

  
