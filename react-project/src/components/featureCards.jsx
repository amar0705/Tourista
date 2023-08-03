import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ApartmentIcon from "@mui/icons-material/Apartment";

const bull = (
  <Box component="span" sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}>
    •
  </Box>
);

export default function FeatureCards() {
  const cards = [
    {
      id: 1,
      icon: <PublicIcon sx={{ fontSize: "50px" }} />,
      title: "10000+ countries",
      description: "World's leading chain of hotels and homes",
    },
    {
      id: 2,
      icon: <PeopleAltIcon sx={{ fontSize: "50px" }} />,
      title: "10M+ Customers",
      description: "World's leading chain of hotels and homes",
    },
    {
      id: 3,
      icon: <ApartmentIcon sx={{ fontSize: "50px" }} />,
      title: "Multiple Properties",
      description: "Hotels & Properties all across the Globe",
    },
  ];
  return (
    <>
      <Grid container spacing={2}>
        {cards.map((item) => (
          <Grid item md={4} key={item.id}>
            <Card sx={{ minWidth: 275, padding: "10px" }}>
              <CardContent sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>{item.icon}</Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>{item.title}</Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>{item.description}</Box>

                {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Word of the Day
                </Typography> */}
                {/* <Typography variant="h5" component="div">
                  be{bull}nev{bull}o{bull}lent
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  adjective
                </Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography> */}
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  sx={{ borderRadius: "30px", backgroundColor: "#1bb389" }}
                  size="small"
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
