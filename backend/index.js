const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const otpGenerator = require("otp-generator");

dotenv.config();
const client = require("twilio")(process.env.AccountSID, process.env.AuthToken);


const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());


const OTP_CONFIG = {
    digits: true,
  };
  
  const OTP = otpGenerator.generate(4, OTP_CONFIG);

app.post("/sendOTP", (req, res) => {
  const { mobileNo } = req.body;
  client.messages
    .create({
      body: `Your otp verification for this number is ${OTP}`,
      from: "+13153609239",
      to: mobileNo,
    })
    .then(() => res.status(201).send({
        success:true,
        message : "Otp sent"
    })).catch((error)=>{
        res.status(400).send({
            success:false,
            message:error
        })
    })
});
app.post('/verifyOTP',(req,res)=>{
    try {
        const {otp}=req.body;
        if(!otp){
            res.status(400).send({
                success:false,
                message:"Please enter the otp"
            })
        }else{
            if(otp != OTP){
                res.status(400).send({
                    success:false,
                    message:"Please enter correct otp"
                })
            }else{
                res.status(200).send({
                    success:false,
                    message:"OTP verified"
                })
            }
        }
    } catch (error) {
        res.status(400).send({
            success:false,
            message:error
        }) 
    }
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server Connected");
});
