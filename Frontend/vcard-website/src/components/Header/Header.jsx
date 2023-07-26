import PhoneButton from "../PhoneButton";
import EmailButton from "../EmailButton";
import WebsiteButton from "../WebsiteButton";
import "./Header.css";
import axios from "axios";
import { useState, useEffect } from "react";

function Header({ empID }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [empID]);

  const fetchData = () => {
    axios
      .get(`http://localhost:3003/vcard/${empID}`)
      .then((response) => {
        setData(response.data[0]);
        console.log("Data has been received:");
        console.log(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  if (data) {
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
            <h2>{data.first_name} {data.last_name}</h2>
            <h6>{data.position} - Teleglobal International Pvt. Ltd.</h6>
          </div>
          <div className="btn-div row">
            <PhoneButton phone={data.phone_number} />
            <EmailButton email={data.email}/>
            <WebsiteButton website={data.website}/>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Please check the employee id!</div>;
  }
}

export default Header;
