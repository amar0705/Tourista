import {
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TvIcon from "@mui/icons-material/Tv";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import HeatPumpIcon from "@mui/icons-material/HeatPump";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import WcIcon from "@mui/icons-material/Wc";
import ChairIcon from "@mui/icons-material/Chair";
import DoorSlidingIcon from "@mui/icons-material/DoorSliding";
import BedIcon from "@mui/icons-material/Bed";
import LightIcon from "@mui/icons-material/Light";
import { useState } from "react";
import { BASE_URL } from "../../api";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import moment from "moment";

function Booking() {
  const [values, setValues] = useState({
    rooms: 1,
    people: 1,
  });
  const params = useParams();
  const location = useLocation();
  const [property, setProperty] = useState({});
  const [nights, setNights] = useState(0);
  const navigate = useNavigate();

  const amenities = [
    [
      { id: 1, icon: <TvIcon />, name: "Television" },
      { id: 2, icon: <HeatPumpIcon />, name: "Geyser" },
      { id: 3, icon: <AcUnitIcon />, name: "Air Conditioner" },
      { id: 4, icon: <WifiIcon />, name: "Wifi" },
      { id: 5, icon: <LocalParkingIcon />, name: "Parking" },
    ],
    [
      { id: 1, icon: <WcIcon />, name: "Attached Washroom" },
      { id: 2, icon: <ChairIcon />, name: "Sofa" },
      { id: 3, icon: <DoorSlidingIcon />, name: "Wardrobe" },
      { id: 4, icon: <BedIcon />, name: "Double Bed" },
      { id: 5, icon: <LightIcon />, name: "Bed Table" },
    ],
  ];

  React.useEffect(() => {
    fetchPropertyDetails();
  }, []);

  React.useEffect(() => {
    if (location?.state) {
      console.log(moment(location.state?.end_date).format("YYYY-MM-DD"), location.state);
      var date1 = new Date(moment(location.state?.start_date).format("YYYY-MM-DD"));
      var date2 = new Date(moment(location.state?.end_date).format("YYYY-MM-DD"));
      var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      var numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
      console.log(numberOfNights);
      setNights(numberOfNights);
    }
  }, [location?.state]);

  const fetchPropertyDetails = async () => {
    await axios
      .get(
        `${BASE_URL}/properties/?property_id=${params.property_id}&start_date=${moment(
          location.state?.start_date
        ).format("YYYY-MM-DD")}&end_date=${moment(location.state?.end_date).format("YYYY-MM-DD")}`
      )
      .then((res) => {
        setProperty(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const bookProperty = async () => {
    if (localStorage.getItem("token")) {
      const obj = {
        guest: Number(localStorage.getItem("user_id")),
        property: Number(params.property_id),
        payment_status: "PAID",
        rooms_booked: values.rooms,
        people: values.people,
        stay_status: "PENDING",
        start_date: moment(location.state?.start_date).format("YYYY-MM-DD"),
        end_date: moment(location.state?.end_date).format("YYYY-MM-DD"),
        total_amount: values.rooms * Number(property?.price) * Number(nights),
      };
      await axios
        .post(`${BASE_URL}/booking/`, obj, {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then((res) => {
          navigate("/all-properties");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/guest/login");
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={4}>
          <Card>
            <CardMedia
              component="img"
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/AIMCO_apartment_interior.jpg/640px-AIMCO_apartment_interior.jpg"
              alt="Live from space album cover"
            />
          </Card>
        </Grid>
        <Grid item md={8}>
          <Paper elevation={3} sx={{ height: "70vh", padding: "20px" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <Typography variant="h5">{property.property}</Typography>
                <Box
                  sx={{ display: "flex", flexDirection: "row", gap: "5px", alignItems: "center" }}
                >
                  <FmdGoodIcon />
                  <Typography variant="body2" color="text.secondary">
                    {property?.location?.city}, {property?.location?.state}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body1" color="text.secondary">
                "The Cliff Garden (TCG) offers new 1BHK & 2BHK flats for sale at affordable prices
                in Hinjewadi, Pune. As a leading developer in the area, TCG provides high-quality
                living spaces with modern amenities. The project's strategic location offers
                convenient access to commercial hubs, IT parks, and entertainment zones, making it
                an ideal choice for families and professionals looking for their dream home.".
              </Typography>
              <Divider></Divider>
              <Typography variant="h6">Amenities</Typography>
              {amenities.map((item, index) => (
                <Box
                  sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
                >
                  {item.map((obj) => (
                    <Box
                      key={obj.id}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        alignItems: "center",
                        width: "200px",
                      }}
                    >
                      {obj.icon}
                      <Typography variant="body2" color="text.secondary">
                        {obj.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ))}
              <Divider></Divider>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "30px" }}>
                <Box sx={{ display: "flex", flexDirection: "row", gap: "6px" }}>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    disabled={values.rooms === 1}
                    onClick={() => {
                      if (values.rooms !== 1)
                        setValues({ ...values, rooms: Number(values.rooms) - 1 });
                    }}
                  >
                    {" "}
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    autoComplete="rooms"
                    name="rooms"
                    required
                    fullWidth
                    id="rooms"
                    label="Rooms"
                    type="number"
                    size="small"
                    sx={{ width: "100px" }}
                    InputProps={{
                      inputProps: {
                        min: 1,
                        max: property?.total_bedrooms - property?.total_rooms_booked,
                        onKeyDown: (event) => {
                          event.preventDefault();
                        },
                      },
                    }}
                    value={values.rooms}
                    onChange={(e) => {
                      setValues({ ...values, rooms: Number(e.target.value) });
                    }}
                  />
                  <IconButton
                    aria-label="delete"
                    size="small"
                    disabled={
                      values.rooms >= property?.total_bedrooms - property?.total_rooms_booked
                    }
                    onClick={() => {
                      setValues({ ...values, rooms: Number(values.rooms) + 1 });
                    }}
                  >
                    {" "}
                    <AddIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", gap: "6px" }}>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    disabled={values.people === 1}
                    onClick={() => {
                      if (values.people !== 1)
                        setValues({ ...values, people: Number(values.people) - 1 });
                    }}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    autoComplete="people"
                    name="people"
                    required
                    fullWidth
                    id="people"
                    label="People"
                    type="number"
                    size="small"
                    sx={{ width: "100px" }}
                    InputProps={{
                      inputProps: {
                        min: 1,
                        max: values.rooms * 2,
                        onKeyDown: (event) => {
                          event.preventDefault();
                        },
                      },
                    }}
                    value={values.people}
                    onChange={(e) => {
                      setValues({ ...values, people: Number(e.target.value) });
                    }}
                  />
                  <IconButton
                    aria-label="delete"
                    size="small"
                    disabled={values.people === values.rooms * 2}
                    onClick={() => {
                      if (values.people < values.rooms * 2)
                        setValues({ ...values, people: Number(values.people) + 1 });
                    }}
                  >
                    {" "}
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
              <Divider></Divider>
              <Box sx={{ display: "flex", justifyContent: "space-between" }} mt={2}>
                <Typography variant="p" color="text.secondary">
                  Total Payable Amount:{" "}
                  <b>₹{values.rooms * Number(property?.price) * Number(nights)}</b>
                </Typography>
                {location.state && (
                  <>
                    <Button
                      variant="contained"
                      sx={{ borderRadius: "5px", backgroundColor: "#1bb389" }}
                      size="medium"
                      onClick={() => {
                        bookProperty();
                      }}
                    >
                      Pay Now
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
export default Booking;
