const mongoose=require('mongoose');

const walletschema=new mongoose.Schema(
    {
        user:{type :mongoose.Types.ObjectId,ref:'User'},
        current_amount:{type:String},

        
          transfer_history: {
            type: mongoose.Types.ObjectId,
            ref: "transfer",
          },
          
          date: { type: String, default: new Date().toDateString() },
        },
        { timestamps: true }
    
);

 wallet=new mongoose.model('Wallet',walletschema);
 module.exports=wallet;