import React, { useState } from "react";
import {useNavigate}from 'react-router-dom'
import "./index.css";

export default function Home() {
  const [code, setCode] = useState("+91");
  const [number, setNumber] = useState("");
  const navigate = useNavigate();
  const genrateOTP = async () => {
    const mobileNo= code+number
    const resp = await fetch("http://localhost:8000/sendOTP",{
        method:"POST",
        body:JSON.stringify({mobileNo}),
        headers:{
            'Content-Type':'application/json'
        }
    })
    var result = await resp.json();
    if(result.success){
        navigate('/verifyOTP')
        alert(result.message);
      
    }else{
        alert(result.message)
    }
  };
  return (
    <>
      <div class="container">
        <div className="form-cotainer">
          <div className="card p-5 rounded">
            <h4 className="text-center my-3">OTP Verification</h4>
            <div className="d-flex flex-row">
              <select
                className=""
                value={code}
                onChange={(e) => setCode(e.target.value)}
              >
                <option disabled>County Code</option>

                <option value="+91">(+91)India</option>
                <option value="1">(+1)USA</option>
                <option value="+44">(+44)UK</option>
              </select>
              <input
                type="Number"
                className="mx-2"
                placeholder="Mobile No"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              ></input>
            </div>
            <button className="my-4 btn btn-primary p-2" onClick={genrateOTP}>Generate</button>
          </div>
        </div>
      </div>
    </>
  );
}
