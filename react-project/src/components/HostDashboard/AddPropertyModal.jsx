import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Autocomplete, Box, Grid, InputAdornment } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../api";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { generateYearsBetween } from "../../utils/arrayOfYears";
import _ from "lodash";

export default function PropertyModal({
  open,
  handleClickOpen,
  handleClose,
  fetchPropertyDetails,
  formValues,
  setFormValues,
  isEdit,
}) {
  const [state, setState] = React.useState([]);
  const [propertyType, setPropertyType] = React.useState([]);
  const [city, setCity] = React.useState([]);
  const [errors, setErrors] = React.useState({
    property: "",
    property_type: "",
    state: "",
    city: "",
    total_bedrooms: "",
    price: "",
    address: "",
    hosted_since: "",
    summary: "",
  });
  React.useEffect(() => {
    fetchState();
    fetchPropertyType();
  }, []);

  const fetchState = async () => {
    await axios
      .get(`${BASE_URL}/state/`)
      .then((res) => {
        setState(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCity = async (id) => {
    await axios
      .get(`${BASE_URL}/city/?state=${id}`)
      .then((res) => {
        setCity(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    if (formValues.state && formValues?.state?.id) {
      fetchCity(formValues.state?.id);
    }
  }, [formValues?.state?.id]);

  const fetchPropertyType = async () => {
    await axios
      .get(`${BASE_URL}/property_type/`)
      .then((res) => {
        setPropertyType(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlelSubmit = async () => {
    if (
      formValues.property &&
      formValues.property_type?.id &&
      formValues.city?.id &&
      formValues?.state?.id &&
      formValues?.address &&
      formValues.total_bedrooms &&
      formValues.price
    ) {
      const obj = {
        property: formValues.property,
        property_type: formValues.property_type.id,
        state: formValues.state.id,
        city: formValues.city.id,
        total_bedrooms: formValues.total_bedrooms,
        price: formValues.price,
        address: formValues.address,
        hosted_since: formValues.hosted_since,
        summary: formValues.summary,
        host: Number(localStorage.getItem("user_id")),
      };

      if (!isEdit) {
        await axios
          .post(`${BASE_URL}/host/property`, obj, {
            headers: { Authorization: localStorage.getItem("token") },
          })
          .then((res) => {
            fetchPropertyDetails();
            handleClose();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        await axios
          .patch(`${BASE_URL}/host/property/${formValues.id}/`, obj, {
            headers: { Authorization: localStorage.getItem("token") },
          })
          .then((res) => {
            fetchPropertyDetails();
            handleClose();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      validate();
    }
  };

  const validate = () => {
    let tempError = _.cloneDeep(errors);
    if (!formValues.property) {
      tempError.property = "Please enter property name";
    }
    if (!formValues.property_type?.id) {
      tempError.property_type = "Please enter property type";
    }
    if (!formValues.state?.id) {
      tempError.state = "please enter state";
    }
    if (!formValues.city?.id) {
      tempError.city = "Please Enter city";
    }
    if (!formValues.address) {
      tempError.address = "Please enter your address";
    }
    if (!formValues.total_bedrooms) {
      tempError.total_bedrooms = "Please enter your total rooms";
    }
    if (!formValues.price) {
      tempError.price = "Please enter price per night";
    }
    setErrors(tempError);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? "Edit a Property" : "Add a Property"}</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="property"
                  required
                  fullWidth
                  id="property"
                  label="Property Name"
                  autoFocus
                  value={formValues.property}
                  onChange={(e) => {
                    setFormValues({ ...formValues, property: e.target.value });
                    setErrors({ ...errors, property: "" });
                  }}
                  error={errors.property ? true : false}
                  helperText={errors.property}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  id="property_type"
                  options={propertyType}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Property Type *"
                      error={errors.property_type ? true : false}
                      helperText={errors.property_type}
                    />
                  )}
                  value={formValues.property_type || null}
                  onChange={(event, newValue) => {
                    setFormValues({ ...formValues, property_type: newValue });
                    setErrors({ ...errors, property_type: "" });
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  id="state"
                  options={state}
                  getOptionLabel={(option) => option.state}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="State *"
                      error={errors.state ? true : false}
                      helperText={errors.state}
                    />
                  )}
                  value={formValues.state || null}
                  onChange={(event, newValue) => {
                    setFormValues({ ...formValues, state: newValue });
                    setErrors({ ...errors, state: "" });
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  disabled={city.length > 0 ? false : true}
                  id="city"
                  options={city}
                  getOptionLabel={(option) => option.city}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="City *"
                      error={errors.city ? true : false}
                      helperText={errors.city}
                    />
                  )}
                  value={formValues?.city || null}
                  onChange={(event, newValue) => {
                    setFormValues({ ...formValues, city: newValue });
                    setErrors({ ...errors, city: "" });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="address"
                  name="address"
                  required
                  fullWidth
                  id="address"
                  label="Full Address"
                  multiline
                  rows={3}
                  value={formValues.address}
                  onChange={(e) => {
                    setFormValues({ ...formValues, address: e.target.value });
                    setErrors({ ...errors, address: "" });
                  }}
                  error={errors.address ? true : false}
                  helperText={errors.address}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  autoComplete="total_bedrooms"
                  name="total_bedrooms"
                  required
                  fullWidth
                  id="total_bedrooms"
                  label="Total Bedrooms"
                  type="number"
                  value={formValues.total_bedrooms}
                  onChange={(e) => {
                    setFormValues({ ...formValues, total_bedrooms: e.target.value });
                    setErrors({ ...errors, total_bedrooms: "" });
                  }}
                  error={errors.total_bedrooms ? true : false}
                  helperText={errors.total_bedrooms}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Price"
                  id="price"
                  name="price"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  value={formValues.price}
                  type="number"
                  required
                  fullWidth
                  onChange={(e) => {
                    setFormValues({ ...formValues, price: e.target.value });
                    setErrors({ ...errors, price: "" });
                  }}
                  error={errors.price ? true : false}
                  helperText={errors.price}
                />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  id="hosted_since"
                  options={generateYearsBetween(2000, 2023)}
                  renderInput={(params) => <TextField {...params} label="Hosted Since" />}
                  value={formValues.hosted_since || null}
                  onChange={(event, newValue) => {
                    setFormValues({ ...formValues, hosted_since: newValue });
                    setErrors({ ...errors, city: "" });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="summary"
                  name="summary"
                  fullWidth
                  id="summary"
                  label="Summary"
                  multiline
                  rows={6}
                  value={formValues.summary}
                  onChange={(e) => {
                    setFormValues({ ...formValues, summary: e.target.value });
                    setErrors({ ...errors, summary: "" });
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlelSubmit} type="submit">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
