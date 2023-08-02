import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider, Grid } from "@mui/material";
import logoIcon from "../assets/logo-icon.png";
import name from "../assets/Tourista-image.png";
import nameWhite from "../assets/Tourista-image-white.png";
import { useNavigate } from "react-router-dom";
import android from "../assets/android.png";
import apple from "../assets/apple.jpeg";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <>
      <Box
        bgcolor="#505050"
        sx={{ display: "flex", flexDirection: "column", height: "100px", color: "white" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            width: "90%",
            margin: "auto",
            height: "100px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={logoIcon} alt="logo" width="60px" />
            <img src={nameWhite} alt="nameWhite" width="120px" />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
              ml: 2,
              mr: 2,
            }}
          >
            <Typography variant="h5">World's leading chain of hotels and homes</Typography>
            <Typography variant="h5">Join our network and grow your business!</Typography>
          </Box>
        </Box>
        <Divider color="white"></Divider>
        <Box bgcolor="#505050" mt={2} pb={2}>
          <Grid container spacing={2} sx={{ width: "90%", margin: "auto" }}>
            <Grid item md={4} sx={{ borderRight: "1px solid white" }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <Typography>Download our App</Typography>
                <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                  <img src={android} alt="and" width="130px"></img>
                  <img src={apple} alt="and" width="120px"></img>
                </Box>
              </Box>
            </Grid>
            <Grid item md={4} sx={{ borderRight: "1px solid white" }}>
              <ul
                style={{
                  listStyleType: "none",
                  display: "flex",
                  gap: "20px",
                  flexDirection: "column",
                }}
              >
                <li>
                  <a href="#about">About Tourista</a>
                </li>{" "}
                <li>
                  <a href="#teams">Teams / Careers</a>
                </li>{" "}
                <li>
                  <a href="#blogs">Blogs</a>
                </li>{" "}
                <li>
                  <a href="#support">Support</a>
                </li>
              </ul>
            </Grid>
            <Grid item md={4}>
              <ul
                style={{
                  listStyleType: "none",
                  display: "flex",
                  gap: "20px",
                  flexDirection: "column",
                }}
              >
                <li>
                  <a href="#tnc">Terms & Conditions</a>
                </li>
                <li>
                  <a href="#guest">Guest Policies</a>
                </li>{" "}
                <li>
                  <a href="#privacy">Privacy Policies</a>
                </li>{" "}
                <li>
                  <a href="#safety">Trust & Safety</a>
                </li>
              </ul>
            </Grid>
          </Grid>
        </Box>
        <Divider color="white"></Divider>
        <Box bgcolor="#505050">
          <Box
            pt={2}
            pb={2}
            sx={{ width: "90%", margin: "auto", display: "flex", justifyContent: "space-between" }}
          >
            <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <FacebookIcon color="white"></FacebookIcon>
              <InstagramIcon color="white"></InstagramIcon>
              <TwitterIcon color="white"></TwitterIcon>
              <YouTubeIcon color="white"></YouTubeIcon>
              <PinterestIcon color="white"></PinterestIcon>
            </Box>
            <Typography variant="body2">2020-2022 © Tourista Stays Limited</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
