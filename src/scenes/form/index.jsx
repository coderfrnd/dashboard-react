import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Header } from "../../components";
import { Formik } from "formik";
import * as yup from "yup";
import { useContext } from "react";
import { ToggledContext } from "../../App";

const initialValues = {
  name: "",
  department: "",
  shift: "",
  onDuty: false,
  email: "",
  phone: "",
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("Required"),
  department: yup.string().required("Required"),
  shift: yup.string().required("Required"),
  onDuty: yup.boolean().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
});

const Form = () => {
  const {setstaffData} =  useContext(ToggledContext)
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = async (values, actions) => {
    try {
      const response = await fetch(
        "http://localhost:3000/staffDashboard",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create new staff");
      }

      const data = await response.json();
      setstaffData((prev)=>[...prev,data])
      console.log("Staff created:", data);
      actions.resetForm({ values: initialValues });
      alert("New staff created successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong while creating staff.");
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE STAFF" subtitle="Create a New Staff Profile" />

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
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={touched.name && errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Department"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.department}
                name="department"
                error={touched.department && errors.department}
                helperText={touched.department && errors.department}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Shift"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.shift}
                name="shift"
                error={touched.shift && errors.shift}
                helperText={touched.shift && errors.shift}
                sx={{ gridColumn: "span 2" }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.onDuty}
                    onChange={handleChange}
                    name="onDuty"
                    sx={{
                      color: "white", // default color (unchecked)
                      "&.Mui-checked": {
                        color: "black", // color when checked
                      },
                    }}
                  />
                }
                label="On Duty?"
                sx={{ gridColumn: "span 4", color: "white" }}
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
                error={touched.email && errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={touched.phone && errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="end"
              mt="20px"
            >
              <Button type="submit" color="secondary" variant="contained">
                Create New Staff
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Form;
