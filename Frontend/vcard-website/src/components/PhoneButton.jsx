import React from "react";
import axios from "axios";

function PhoneButton({ phone, empID }) {
  const handleLinkClick = (event) => {
    event.preventDefault();

    axios
      .post(
        "http://localhost:3003/clicks/phoneButtonClick",
        { id: empID },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data.message);
        window.location.href = `tel:${phone}`;
      })
      .catch((error) => {
        console.error("Error updating clicks_phone:", error);
      });
  };

  return (
    <a href={"tel:" + phone} className="mbtn col-4" onClick={handleLinkClick}>
      <svg
        class="icons"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
      >
        <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z"></path>
      </svg>
      <small>Phone</small>
    </a>
  );
}

export default PhoneButton;
