import React from "react";
import axios from "axios";

function EmailButton({ email, empID }) {
  const handleLinkClick = (event) => {
    event.preventDefault();

    axios
      .post(
        "http://localhost:3003/clicks/emailButtonClick",
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
        window.location.href = `mailto:${email}`;
      })
      .catch((error) => {
        console.error("Error updating clicks_email:", error);
      });
  };

  return (
    <a
      href={"mailto:" + email}
      className="mbtn col-4"
      onClick={handleLinkClick}
    >
      <svg
        class="icons"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
      >
        <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"></path>
      </svg>
      <small>Email</small>
    </a>
  );
}

export default EmailButton;
