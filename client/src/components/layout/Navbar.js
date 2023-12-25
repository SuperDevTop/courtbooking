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
import InfoIcon from "@mui/icons-material/Info";
import ChatIcon from "@mui/icons-material/Chat";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { Avatar } from "@mui/material";

import { getInitials } from "../../utils/usefulFuncs";
import AccountPopover from "../account/accountPopover";

const drawerWidth = 240;
let navItems = [];

function DrawerAppBar(props) {
  if (props.isAuthenticated) {
    navItems = ["messages", "about"];
  } else {
    navItems = [];
  }

  const { window, user } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const popoverOpen = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
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
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
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
        sx={{ color: "black", padding: 2 }}
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
            color="white"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <a
              href="/dashboard"
              style={{ color: "white", textDecoration: "none" }}
            >
              <i>CourtBooking</i>
            </a>
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" }, gap: 2 }}>
            <Button
              sx={{
                marginRight: 1,
                border: "none",
                color: "white",
              }}
            >
              <ChatIcon sx={{ marginRight: 0.5 }} />
              <Typography variant="h6" fontSize={17}>
                <NavLink
                  to="/messages"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Chat
                </NavLink>
              </Typography>
            </Button>
            <Button
              color="primary"
              sx={{
                marginRight: 2,
                border: "none",
                color: "white",
              }}
            >
              <InfoIcon sx={{ marginRight: 0.5 }} />
              <Typography variant="h6" fontSize={17}>
                <NavLink
                  to="/about"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  About
                </NavLink>
              </Typography>
            </Button>
          </Box>
          <Avatar
            src={user && user.avatar}
            sx={{ width: 35, height: 35, cursor: "pointer" }}
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
            }}
          >
            {getInitials(user.name)}
          </Avatar>
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
  user: state.auth.user,
});

export default connect(mapStateToProps)(DrawerAppBar);
