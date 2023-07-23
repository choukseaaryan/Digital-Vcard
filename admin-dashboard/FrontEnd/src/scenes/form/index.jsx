import React, { useState } from "react";
import QRCode from "qrcode";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const QRCodeGenerator = () => {
  const [qrCodeData, setQRCodeData] = useState("");
  const generateQRCode = (values) => {
    const vcfData = `BEGIN:VCARD
                    VERSION:3.0
                    N:${values.lastName};${values.firstName};;;
                    FN:${values.firstName} ${values.lastName}
                    ADR;TYPE=WORK:;;${values.address};;;;${values.city};;${values.zipCode};;
                    TEL;TYPE=WORK:${values.contact}
                    EMAIL:${values.email}
                    URL:${values.website}
                    END:VCARD`;

    QRCode.toDataURL(vcfData)
      .then((url) => {
        setQRCodeData(url);
      })
      .catch((err) => {
        console.error("Error generating QR code:", err);
      });
  };

  const handleFormSubmit = (values) => {
    axios
      .post(
        "http://localhost:3003/form",
        {
          firstName: values.firstName,
          lastName: values.lastName,
          address: values.address,
          contact: values.contact,
          email: values.email,
          employee_id: values.employee_id,
          city: values.city,
          zipCode: values.zipCode,
          position: values.position,
          website: values.website,
          qrcode_data: qrCodeData
        },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
    console.log(values);
    generateQRCode(values);
  };

  const handleDownloadQRCode = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = qrCodeData;
    downloadLink.download = "qrcode.png";
    downloadLink.click();
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    email: yup.string().email("Invalid email").required("Required"),
    contact: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Required"),
    address: yup.string().required("Required"),
    employee_id: yup.string().required("Required")
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address: "",
    city: "",
    zipCode: "",
    website: "",
    employee_id: "",
    position: "",
  };

  return (
    <div className="reg-form-div">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="City"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                name="city"
                error={!!touched.city && !!errors.city}
                helperText={touched.city && errors.city}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Zip Code"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.zipCode}
                name="zipCode"
                error={!!touched.zipCode && !!errors.zipCode}
                helperText={touched.zipCode && errors.zipCode}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Website"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.website}
                name="website"
                error={!!touched.website && !!errors.website}
                helperText={touched.website && errors.website}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Employee ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.setEmployee_id}
                name="employee_id"
                error={!!touched.employee_id && !!errors.employee_id}
                helperText={touched.employee_id && errors.employee_id}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Position"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.position}
                name="position"
                error={!!touched.position && !!errors.position}
                helperText={touched.position && errors.position}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button style={{"marginRight": "10px"}} type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={handleDownloadQRCode}
              >
                Download QR Code
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      {qrCodeData && <img src={qrCodeData} alt="QR Code" />}
    </div>
  );
};

export default QRCodeGenerator;
