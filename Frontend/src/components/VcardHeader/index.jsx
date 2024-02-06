import MakeProtectedAPICall from "../../utils/api"
import PhoneButton from "../PhoneButton";
import EmailButton from "../EmailButton";
import WebsiteButton from "../WebsiteButton";
import "./index.css";
import { useState, useEffect } from "react";

function Header({ empID, company }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = `get-user/${company}/${empID}`
      const response = await MakeProtectedAPICall(url, "get");
      if (response.status === 200) {
        setData(response.data.data);
      }
    }
    fetchData();
  }, [empID]);

  if (data) {
    return (
      <div className="header-div">
        <div className="vcard-header">
          <div className="img-wrap">
            <img
              src={`http://localhost:3003/profiles/${data.adminId}/${empID}.png`}
              alt="Profile"
            />
          </div>
          <div className="title">
            <h2>{data.firstName} {data.lastName}</h2>
            <h6>{data.position} - {data.company}</h6>
          </div>
          <div className="btn-div row">
            <PhoneButton phone={data.contact} empID={empID} />
            <EmailButton email={data.email} empID={empID} />
            <WebsiteButton website={data.website} empID={empID} />
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Please check the employee id!</div>;
  }
}

export default Header;
