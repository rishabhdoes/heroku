const joi =require('joi');

module.exports.cardschema =joi.object({

    card:joi.object({
      mess:joi.string().required(),
      price:joi.number().required().min(0),
      description:joi.string().required(),
      
      //image:joi.string().required(),
    }).required(),
    
  });

  



  
