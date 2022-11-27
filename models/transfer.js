const mongoose=require('mongoose');


const transferschema= mongoose.Schema({

    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',

      },

      net_amount:{
        type:String
        
      },
      net_transaction:{
        type:string
      },
      detail:
      {
          type:string
      }
      
});
const Transfer=new mongoose.model("Transfer",transferschema);
modules.exports=transfer;