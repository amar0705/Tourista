import * as React from "react";
import { Autocomplete, Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import banner from "../assets/banner.webp";
import autocompleteRounded from "../utils/autocompleteRounded";
import axios from "axios";
import { BASE_URL } from "../api";
import BasicDateRangePicker from "./DateRangePicker/dateRangePicker";
import { useNavigate } from "react-router-dom";
import cover from "../assets/cover-image-hd.png";

export default function Banner() {
  const [cityList, setCityList] = React.useState([]);
  const [filterValues, setFilterValues] = React.useState({ city: null });
  var date = new Date();
  const [dateRange, setDateRange] = React.useState([new Date(), date.setDate(date.getDate() + 1)]);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchCity();
  }, []);

  const fetchCity = async () => {
    await axios
      .get(`${BASE_URL}/city/`)
      .then((res) => {
        setCityList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      component="div"
      sx={{
        position: "relative",
        width: "100%",
        height: "60vh",
        backgroundImage: `url(${banner})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          position: "relative",
          zindex: 1,
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          top: "80px",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* <Typography
          align="center"
          color="white"
          variant="h2"
          sx={{ textShadow: "1px 1px 2px white", fontStyle: "italic" }}
        >
          Tourista
        </Typography> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            fontStyle: "italic",
            width: "70%",
            margin: "auto",
          }}
        >
          <img src={cover} alt="coverImage" />
          {/* <Typography align="center" color="white" variant="h5">
            " Wanderlust awaits with Tourista - Your passport to endless adventures "
          </Typography> */}
          {/* <Typography align="center" color="white" variant="h5">
            In publishing and graphic design, Lorem ipsum
          </Typography> */}
        </Box>
      </Box>
      <Box
        sx={{
          width: "80%",
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          position: "absolute",
          left: "10%",
          top: "380px",
        }}
      >
        <Paper
          elevation={3}
          sx={{ width: "100%", padding: "40px", display: "flex", flexDirection: "row" }}
        >
          <Grid container spacing={2}>
            <Grid item md={3}>
              <Autocomplete
                id="city"
                options={cityList}
                getOptionLabel={(option) => option.city}
                renderInput={(params) => (
                  <TextField {...params} label="Location" size="small" sx={autocompleteRounded} />
                )}
                value={filterValues.city || null}
                onChange={(event, newValue) => {
                  setFilterValues({ ...filterValues, city: newValue });
                }}
              />
            </Grid>
            <Grid item md={3}>
              <BasicDateRangePicker
                value={dateRange}
                onChange={setDateRange}
              ></BasicDateRangePicker>
            </Grid>
            <Grid item md={3}>
              <TextField
                autoComplete="given-name"
                name="people"
                type="number"
                required
                fullWidth
                id="people"
                label="People"
                size="small"
                onChange={(e) => {
                  setFilterValues({ ...filterValues, people: e.target.value });
                }}
                value={filterValues.people}
                sx={autocompleteRounded}
              />
            </Grid>
            <Grid item md={3}>
              <Button
                variant="contained"
                sx={{ borderRadius: "30px", width: "100%", backgroundColor: "#1bb389" }}
                onClick={() => {
                  navigate("/all-properties", {
                    state: {
                      dateRange: dateRange,
                      city: filterValues?.city,
                    },
                  });
                }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}
