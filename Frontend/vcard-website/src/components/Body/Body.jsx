// import React from "react";
import MainModal from "../Modals/MainModal";
import "./Body.css";
import axios from "axios";
import { useState, useEffect } from "react";

function Body({ empID }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [empID]);

  const fetchData = () => {
    axios
      .get(`http://localhost:3003/vcard/${empID}`)
      .then((response) => {
        setData(response.data[0]);
        console.log("Data has been received!!");
        console.log(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  if (data) {
    return (
      <div className="body-div">
        <div className="vcard-body">
          <table>
            <tbody>
              <tr>
                <th class="py-2" scope="col">
                  <div class="table-row table-row-content">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      co=""
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z"></path>
                    </svg>
                    <small style={{ color: "#b3b4bb" }}>Phone</small>
                    <a href={"tel:" + data.phone_number}>
                      <h5>{data.phone_number}</h5>
                    </a>
                  </div>
                </th>
              </tr>

              <tr>
                <th class="py-2" scope="col">
                  <div class="table-row table-row-content">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"></path>
                    </svg>
                    <small style={{ color: "#b3b4bb" }}>Email</small>
                    <a
                      href={"mailto:" + data.email}
                      target="_newEmail"
                      style={{ wordBreak: "break-all" }}
                    >
                      <h5 style={{ fontFamily: "Arial" }}>{data.email}</h5>
                    </a>
                  </div>
                </th>
              </tr>

              <tr>
                <th class="py-2" scope="col">
                  <div class="table-row table-row-content">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 6h-2v-2c0-1.104.896-2 2-2h6c1.104 0 2 .896 2 2v2h-2v-1.5c0-.276-.224-.5-.5-.5h-5c-.276 0-.5.224-.5.5v1.5zm7 6v2h8v8h-24v-8h8v-2h-8v-5h24v5h-8zm-2-1h-4v4h4v-4z"></path>
                    </svg>

                    <small style={{ color: "#b3b4bb" }}>{data.position}</small>

                    <h5>Teleglobal International Pvt.Ltd.</h5>
                  </div>
                </th>
              </tr>

              <tr>
                <th class="py-2" scope="col">
                  <div class="table-row table-row-content">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"></path>
                    </svg>
                    <small style={{ color: "#b3b4bb" }}>Address</small>
                    <h5>
                      {data.address}
                      <br></br>
                      {data.city} {data.zipcode}
                    </h5>
                  </div>
                </th>
              </tr>

              <tr>
                <th class="py-2" scope="col">
                  <div class="table-row table-row-content">
                    <svg
                      class="icons"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z"></path>
                    </svg>
                    <small style={{ color: "#b3b4bb" }}>Website</small>
                    <a
                      href="https://teleglobals.com/"
                      style={{ wordBreak: "break-all" }}
                    >
                      <h5 style={{ fontFamily: "Arial" }}>{data.website}</h5>
                    </a>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
          <MainModal />
        </div>
      </div>
    );
  }
  return <div></div>;
}

export default Body;
