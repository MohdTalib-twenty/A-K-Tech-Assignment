import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CountryCodeSelector() {
  const [countryCodes, setCountryCodes] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState('');

  useEffect(() => {
    // Fetch country codes from the API when the component mounts
    axios.get('https://countrycode.org/api/countryCode')
      .then((response) => {
        // Extract the country codes and store them in the state
        const codes = response.data.map((country) => ({
          code: country.code,
          name: `${country.name} (+${country.code})`,
        }));
        setCountryCodes(codes);
      })
      .catch((error) => {
        console.error('Error fetching country codes:', error);
      });
  }, []); // Empty dependency array ensures this runs only on component mount

  const handleCountryCodeChange = (event) => {
    setSelectedCountryCode(event.target.value);
  };

  return (
    <div>
      <label htmlFor="countrySelect">Select Country:</label>
      <select
        id="countrySelect"
        className="form-control"
        onChange={handleCountryCodeChange}
        value={selectedCountryCode}
      >
        <option value="">Select a country code</option>
        {countryCodes.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>

      <div className="form-group">
        <label htmlFor="mobileNumber">Mobile Number:</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">+{selectedCountryCode}</span>
          </div>
          <input
            type="text"
            className="form-control"
            id="mobileNumber"
            placeholder="Enter your mobile number"
          />
        </div>
      </div>
    </div>
  );
}

export default CountryCodeSelector;
