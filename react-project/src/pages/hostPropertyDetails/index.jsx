import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DataGridDemo from "../../components/DataGrid";
import { Box, Button, IconButton } from "@mui/material";
import { useEffect } from "react";
import { BASE_URL, callApi } from "../../api";
import { useState } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PropertyModal from "../../components/HostDashboard/AddPropertyModal";
import _ from "lodash";

const defaultTheme = createTheme();

export default function HostPropertyDetails() {
  const [gridRows, setGridRows] = useState([]);
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [formValues, setFormValues] = React.useState({
    property: "",
    property_type: null,
    state: null,
    city: null,
    total_bedrooms: null,
    price: null,
    address: "",
    hosted_since: null,
    summary: "",
  });
  const columns = [
    {
      field: "property",
      headerName: "Property Name",
      width: 150,
      sortable: true,
    },
    {
      field: "property_type",
      headerName: "Property type",
      width: 110,
      sortable: false,
    },
    {
      field: "location",
      headerName: "Location",
      width: 110,
    },
    {
      field: "price",
      headerName: "Price/night",
      width: 110,
    },
    {
      field: "total_bedrooms",
      headerName: "Total Bedrooms",
      width: 110,
    },
    {
      field: "address",
      headerName: "Address",
      width: 110,
    },
    {
      field: "hosted_since",
      headerName: "Hosted Since",
      width: 110,
    },
    {
      field: "created_at",
      headerName: "Created",
      width: 110,
    },
    {
      field: "updated_at",
      headerName: "Updated",
      width: 110,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <IconButton aria-label="edit" onClick={() => handleSelectRow(id)}>
            <EditIcon />
          </IconButton>,
          <IconButton aria-label="delete" onClick={() => handleDelete(id)}>
            <DeleteIcon />
          </IconButton>,
        ];
      },
    },
  ];

  const handleSelectRow = (id) => {
    const item = data.find((item) => item.id === id);
    item.state = { id: item.location.state_id, state: item.location.state };
    item.city = { id: item.location.id, state: item.location.city };
    item.property_type = { id: item.property_type.id, name: item.property_type.name };
    delete item.location;
    setFormValues(item);
    setIsEdit(true);
    handleClickOpen();
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`${BASE_URL}/host/property/${formValues.id}/`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then(() => {
        fetchPropertyDetails();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPropertyDetails();
  }, []);

  const fetchPropertyDetails = async () => {
    await axios
      .get(`${BASE_URL}/host/property`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        const cloneRes = _.cloneDeep(res.data.data);
        cloneRes.forEach((item) => {
          item.location = `${item.location.city}, ${item.location.state}`;
          item.property_type = item.property_type.name;
        });
        setGridRows(cloneRes);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clearFormValues = () => {
    setFormValues({
      property: "",
      property_type: null,
      state: null,
      city: null,
      total_bedrooms: null,
      price: null,
      address: "",
      hosted_since: null,
      summary: "",
    });
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ gap: 2, display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <Button
            onClick={() => {
              handleClickOpen();
              clearFormValues();
            }}
            variant="contained"
            endIcon={<AddIcon />}
          >
            Add New Property
          </Button>
        </Box>
        {gridRows?.length > 0 ? (
          <DataGridDemo cols={columns} rows={gridRows?.length > 0 ? gridRows : []}></DataGridDemo>
        ) : null}
      </Box>
      <PropertyModal
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        fetchPropertyDetails={fetchPropertyDetails}
        formValues={formValues}
        setFormValues={setFormValues}
        isEdit={isEdit}
      ></PropertyModal>
    </ThemeProvider>
  );
}
