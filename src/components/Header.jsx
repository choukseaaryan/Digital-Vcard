import React from "react";
import PhoneButton from "./PhoneButton";
import EmailButton from "./EmailButton";
import WebsiteButton from "./WebsiteButton";

function Header() {
  return (
    <div className="header-div">
      <div className="vcard-header">
        <div className="img-wrap">
          <img
            src="https://media.licdn.com/dms/image/C5103AQG8A20f3LN4ag/profile-displayphoto-shrink_400_400/0/1541751259170?e=1694649600&v=beta&t=JULq87kOc4ZEvuMxXWf0Fm7O1NzkFgFs-SmI94P9eHo"
            alt="Profile"
          />
        </div>
        <div className="title">
          <h2>Kamlesh Kumar</h2>
          <h6>Managing Director - Teleglobal International Pvt. Ltd.</h6>
        </div>
        <div className="btn-div row">
          <PhoneButton />
          <EmailButton />
          <WebsiteButton />
        </div>
      </div>
    </div>
  );
}

export default Header;
