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
import logoIcon from "../../assets/logo-icon.png";
import name from "../../assets/Tourista-image.png";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api";
import axios from "axios";
import Footer from "../../components/footer";
import { alert } from "../../components/alerts";
import { useSnackbar } from "../../App";

const pages = [{ title: "All Properties", link: "/all-properties" }];
const settings = ["Profile", "Logout"];

function HomeLayout({ children, makeMargin }) {
  const { showAlert } = useSnackbar();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigateTo = (link) => {
    navigate(link);
  };

  const handleCloseUserMenu = (item) => {
    if (item === "Logout") {
      logout();
    }
    setAnchorElUser(null);
  };

  const logout = async () => {
    try {
      const result = await axios.post(`${BASE_URL}/logout/`, null, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      console.log(result);
      alert.error("Logged out");
      navigate("/");
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_type");
      showAlert("success", "Logged out successfully!!!");
    } catch (error) {
      console.log(error);
      showAlert("error", error?.response?.data?.detail ?? "Some error occurred!!");
    }
  };

  return (
    <>
      <Box flexDirection={"column"}>
        <AppBar position="static" color="transparent">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem
                      key={page.title}
                      onClick={() => {
                        handleCloseNavMenu();
                        navigateTo(page.link);
                      }}
                    >
                      <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                color="black"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                LOGO
              </Typography>
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
                <img src={name} alt="name" width="120px" />
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: {
                    xs: "none",
                    md: "flex",
                    justifyContent: "flex-end",
                    marginRight: "30px",
                  },
                }}
              >
                {pages.map((page) => (
                  <Button
                    key={page.title}
                    onClick={() => {
                      handleCloseNavMenu();
                      navigateTo(page.link);
                    }}
                    sx={{ my: 2, color: "black", display: "block" }}
                  >
                    {page.title}
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  {localStorage.getItem("token") ? (
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                  ) : (
                    <Link to="/guest/login">
                      <Button>Login</Button>
                    </Link>
                  )}
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          {makeMargin ? (
            <Box sx={{ mt: 2, mr: 2, ml: 2 }} justifyContent="center">
              {children}
            </Box>
          ) : (
            children
          )}
        </Box>
      </Box>
      <Footer></Footer>
    </>
  );
}
export default HomeLayout;
