const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"user",
      require:true
    },
    shippingInfo:{
      firstname:{
        type:String,
        required:true,

      },
      lastname:{
        type:String,
        required:true,
      },
      address:{
        type:String,
        required:true,
      },
      city:{
        type:String,
        required:true,
      },
      state:{
        type:String,
        required:true,
      },
      other:{
        type:String,
        required:true
      },
      pincode:{
        type:Number,
        required:true,
      }

    },
    paymentInfo:{
      razorpayOrderId:{
        type:String,
        required:true
      },
      razorpayPaymentId:{
        type:String,
        required:true
      },
    },
    orderItems:[
      {
          product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            require:true

          },
          color:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Color",
            require:true
          },
          quantity:{
            type:Number,
            require:true
          },
          price:{
            type:Number,
            required:true
          }
      }
    ],
    paidAt:{
      type:Date,
      default:Date.now()

    },
    month:{
       type:String,
       default:new Date().getMonth()
    },
    totalPrice:{
      type:Number,
      require:true,
    },
    totalPriceAfterDiscount:{
      type:Number,
      require:true,
    },
    orderStatus:{
       type:String,
      default:"Ordered"
    }

  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);
