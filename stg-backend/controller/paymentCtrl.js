const Razorpay=require("razorpay")

const instance=new Razorpay({
    key_id:"rzp_test_E9AqOGvQZQ751k",
    key_secret:"akhfC3qbe4NrN2WiyVtF2ITH"
})

const checkout=async(req,res)=>{
    const {amount}=req.body;
   const option={
     amount:amount*100,
     currency:"INR"
   }
   const order=await instance.orders.create(option)
   res.json({
    success:true,
    order
   })
}



const paymentVerfication=async(req,res)=>{
      const {razorpayOrderId,razorpayPaymentId}=req.body;
      res.json({
        razorpayOrderId,razorpayPaymentId
      })
 }



 module.exports={
    checkout,paymentVerfication
 }