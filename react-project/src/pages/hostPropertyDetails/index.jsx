import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DataGridDemo from "../../components/DataGrid";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { callApi } from "../../api";
import { useState } from "react";

const defaultTheme = createTheme();

export default function HostPropertyDetails() {
  const [rows, setRows] = useState([]);
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
  ];

  useEffect(() => {
    fetchPropertyDetails();
  }, []);

  const fetchPropertyDetails = async () => {
    try {
      const result = await callApi("/host/property", "GET", null, true);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <DataGridDemo cols={columns}></DataGridDemo>
    </ThemeProvider>
  );
}
