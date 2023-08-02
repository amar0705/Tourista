import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Icon from "../../assets/tourista.png";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api";
import axios from "axios";
import Banner from "../../components/banner";
import FeatureCards from "../../components/featureCards";

function HomeSection() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box>
        <Banner></Banner>
      </Box>
      <div
        style={{
          marginTop: 150,
          display: "flex",
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <FeatureCards></FeatureCards>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Box>
  );
}
export default HomeSection;
