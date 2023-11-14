import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { logOut } from "../../actions/authActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import setAuthToken from "../../utils/setAuthToken";
import { Avatar } from "@mui/material";
import AccountPopover from "../account/accountPopover";
// import { useTheme } from '@emotion/react';

const drawerWidth = 240;
let navItems = [];

function DrawerAppBar(props) {
  // const theme = useTheme()
  // const { primary, secondary } = theme.palette;

  if (props.isAuthenticated) {
    navItems = ["Booking", "About"];
  } else {
    navItems = [];
  }

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const history = useNavigate();

  const popoverOpen = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const onLogOut = () => {
    if (localStorage.token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    setAuthToken(false);
    dispatch(logOut(history));
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
      }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        <i>CourtBooking</i>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box display={props.isAuthenticated ? "flex" : "none"}>
      <CssBaseline />
      <AppBar
        component="nav"
        position="static"
        sx={{ backgroundColor: "white", color: "black" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/dashboard">
            <img
              src="/logo.png"
              alt="logo"
              style={{
                width: "2vw",
                marginRight: "0.3vw",
                display: { xs: "none" },
              }}
            />
          </Link>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <i>CourtBooking</i>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{
                  color: "white",
                  marginRight: 2,
                  textTransform: "lowercase",
                  borderColor: "black",
                }}
                variant="contained"
              >
                <Typography variant="h6" fontSize={17}>
                  {item === "Logout" ? (
                    <span
                      fontFamily="cursive"
                      onClick={onLogOut}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {item}
                    </span>
                  ) : (
                    <NavLink
                      to={`/${item}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {item}
                    </NavLink>
                  )}
                </Typography>
              </Button>
            ))}
          </Box>
          <Avatar
            src="/images/avatars/default.png"
            sx={{ width: 35, height: 35, cursor: "pointer" }}
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
            }}
          />
          <AccountPopover
            open={popoverOpen}
            onClose={() => {
              setAnchorEl(null);
            }}
            anchorEl={anchorEl}
            PaperProps={{ sx: { width: 200 } }}
            closePopover={() => {
              setAnchorEl(null);
            }}
          />
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(DrawerAppBar);
