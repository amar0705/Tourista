import * as React from "react";
import Box from "@mui/material/Box";
import {
  Autocomplete,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Icon,
  InputAdornment,
  Pagination,
  Paper,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SearchIcon from "@mui/icons-material/Search";
import SortItems from "./SortItems";
import { BASE_URL } from "../../api";
import axios from "axios";
import autocompleteRounded from "../../utils/autocompleteRounded";
import BasicDateRangePicker from "../../components/DateRangePicker/dateRangePicker";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

function AllProperties() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [cityList, setCityList] = React.useState([]);
  const [propertyTypeList, setPropertyTypeList] = React.useState([]);
  const [allProperties, setAllProperties] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [pageData, setPageData] = React.useState(null);
  var date = new Date();
  const location = useLocation();
  const [dateRange, setDateRange] = React.useState([new Date(), date.setDate(date.getDate() + 1)]);
  const [filterValues, setFilterValues] = React.useState({
    search: "",
    sort: "",
    city: null,
    property_type: null,
    price: [],
  });
  const prices = [
    { id: 0, label: "< ₹500" },
    { id: 1, label: "₹500 - ₹1200" },
    { id: 2, label: "₹1200 - ₹2000" },
    { id: 3, label: "> ₹2000" },
  ];
  React.useEffect(() => {
    fetchCity();
    fetchPropertyType();
  }, []);
  React.useEffect(() => {
    setDateRange(location?.state?.dateRange);
    setFilterValues({ ...filterValues, city: location?.state?.city });
  }, [location]);

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

  const fetchPropertyType = async () => {
    await axios
      .get(`${BASE_URL}/property_type/`)
      .then((res) => {
        setPropertyTypeList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPropertyType = () => {
    if (filterValues.property_type?.id) {
      return `property_type=${filterValues.property_type?.id}`;
    } else return ``;
  };

  const getLocation = () => {
    if (filterValues.city?.id) {
      return `&city=${filterValues.city?.id}`;
    } else return ``;
  };

  const getPrice = () => {
    if (filterValues.price.length > 0) {
      return `&price=${filterValues.price.join(",")}`;
    } else return ``;
  };

  const getSearch = () => {
    if (filterValues.search) {
      return `&search=${filterValues?.search}`;
    } else return ``;
  };

  const getSort = () => {
    if (filterValues?.sort) {
      return `&sort=${filterValues?.sort}`;
    } else {
      return ``;
    }
  };

  React.useEffect(() => {
    if (filterValues.property_type?.id) {
      fetchProperties();
    }
  }, [filterValues.property_type]);

  React.useEffect(() => {
    if (filterValues.city?.id) {
      fetchProperties();
    }
  }, [filterValues.city]);

  React.useEffect(() => {
    fetchProperties();
  }, [filterValues.price.length]);

  React.useEffect(() => {
    fetchProperties();
  }, [filterValues.search]);

  React.useEffect(() => {
    if (filterValues.sort) fetchProperties();
  }, [filterValues.sort]);

  const fetchProperties = async () => {
    await axios
      .get(
        `${BASE_URL}/properties/?start_date=${moment(dateRange[0]).format(
          "YYYY-MM-DD"
        )}&end_date=${moment(dateRange[1]).format(
          "YYYY-MM-DD"
        )}${getPropertyType()}${getLocation()}${getPrice()}${getSearch()}${getSort()}`
      )
      .then((res) => {
        setAllProperties(res.data.data);
        setPageData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePage = async (e, value) => {
    setPage(value);
    await axios
      .get(
        `${BASE_URL}/properties/?${getPropertyType()}${getLocation()}${getPrice()}${getSearch()}${getSort()}&page=${value}`
      )
      .then((res) => {
        console.log();
        setAllProperties(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    if (dateRange?.length > 0) fetchProperties();
  }, [dateRange]);

  return (
    <Grid container gap={3}>
      <Grid md={3}>
        <Paper elevation={3} sx={{ p: 2, gap: 4, display: "flex", flexDirection: "COLUMN" }}>
          <Typography gutterBottom variant="h6" component="div">
            Filter
          </Typography>
          <Autocomplete
            id="property_type"
            options={propertyTypeList}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Property Type" size="small" sx={autocompleteRounded} />
            )}
            value={filterValues.property_type || null}
            onChange={(event, newValue) => {
              setFilterValues({ ...filterValues, property_type: newValue });
            }}
          />
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
          <Divider></Divider>
          <FormGroup>
            <Typography variant="h6" component="div">
              Price Per Night
            </Typography>
            {prices.map((item) => (
              <FormControlLabel
                key={item.id}
                control={
                  <Checkbox
                    checked={filterValues.price.includes(item.id)}
                    onChange={(e) => {
                      const temp = [...filterValues.price];
                      if (e.target.checked) {
                        temp.push(item.id);
                        setFilterValues({ ...filterValues, price: temp });
                      } else {
                        const arr = temp.filter((n) => n !== item.id);
                        setFilterValues({ ...filterValues, price: arr });
                      }
                    }}
                  />
                }
                label={item.label}
              />
            ))}
          </FormGroup>
        </Paper>
      </Grid>
      <Grid md={7}>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row", gap: 2 }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <TextField
              id="search"
              label="Search here"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: { borderRadius: "30px" },
              }}
              value={filterValues.search}
              onChange={(e) => {
                setFilterValues({ ...filterValues, search: e.target.value });
              }}
            />
            <BasicDateRangePicker value={dateRange} onChange={setDateRange}></BasicDateRangePicker>
          </Box>
          <SortItems filterValues={filterValues} setFilterValues={setFilterValues}></SortItems>
        </Box>
        {allProperties?.length > 0 ? (
          <>
            {allProperties.map((item) => (
              <>
                <Card sx={{ display: "flex", mt: 2 }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/AIMCO_apartment_interior.jpg/640px-AIMCO_apartment_interior.jpg"
                    alt="Live from space album cover"
                  />
                  <CardContent sx={{ width: "100%" }}>
                    <Box>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.property}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.summary
                          ? item.summary
                          : "The Cliff Garden (TCG) offers new 1BHK & 2BHK flats for sale at Hinjewadi, Pune. Get home of your dreams at affordable price rates from the best developer."}
                      </Typography>
                    </Box>
                    <br />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 1,
                            alignContent: "center",
                            justifyContent: "center",
                          }}
                        >
                          <FmdGoodIcon sx={{ fontSize: 20 }}></FmdGoodIcon>
                          <Typography variant="body2" color="text.secondary">
                            {item.location?.city}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 1,
                            alignContent: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CurrencyRupeeIcon sx={{ fontSize: 20 }}></CurrencyRupeeIcon>
                          <Typography variant="body2" color="text.secondary">
                            {item.price}/night
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 1,
                            alignContent: "center",
                            justifyContent: "center",
                          }}
                        >
                          <ApartmentIcon sx={{ fontSize: 20 }}></ApartmentIcon>
                          <Typography variant="body2" color="text.secondary">
                            {item.property_type.name}
                          </Typography>
                        </Box>
                      </Box>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          navigate(`/booking/${item.id}`, {
                            state: { start_date: dateRange[0], end_date: dateRange[1] },
                          });
                        }}
                      >
                        Book Now
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </>
            ))}
            {pageData && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Pagination
                  count={pageData?.num_pages}
                  size="small"
                  page={page}
                  onChange={handlePage}
                />
              </Box>
            )}
          </>
        ) : (
          <Box sx={{ display: "flex", m: 2 }}>No Data to display </Box>
        )}
      </Grid>
    </Grid>
  );
}
export default AllProperties;
