import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function VerifyOTP() {
  const [otp, setOTP] = useState("");
 const navigate=useNavigate();
  const verifyOTP = async () => {
    
    const resp = await fetch("http://localhost:8000/verifyOTP",{
        method:"POST",
        body:JSON.stringify({otp}),
        headers:{
            'Content-Type':'application/json'
        }
    })
    var result = await resp.json();
    if(result.success){
        alert(result.message);
        navigate("/done")
    }else{
        alert(result.message)
    }
  };
  return (
    <>
      <div class="container">
        <div className="form-cotainer">
          <div className="card p-5 rounded">
            <h4 className="text-center my-3">Verify OTP</h4>
            <div className="d-flex flex-row">
              <input
                type="text"
                className="mx-2"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
              ></input>
            </div>
            <button className="my-4 btn btn-primary p-2" onClick={verifyOTP}>Verify</button>
          </div>
        </div>
      </div>
    </>
  );
}
