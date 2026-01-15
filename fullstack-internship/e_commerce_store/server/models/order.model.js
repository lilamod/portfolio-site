const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref:"User"
  },
  product: {
        type: mongoose.Types.ObjectId,
        ref: "Product"
     }, 
     quantity: Number, 
 total : {
        type: String
    },
    address :{
        type: String
    }
},
{
    timestamps: true,
});
module.exports= mongoose.model("Order", orderSchema);
