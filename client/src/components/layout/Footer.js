import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
// import { useTheme } from '@mui/material';
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

const Footer = ({ isAuthenticated }) => {
  // const theme = useTheme()
  // const { primary } = theme.palette;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const [isMessagesPage, setIsMessagesPage] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMessagesPage(location.pathname.includes("messages"));
  }, [location]);

  return isMessagesPage ? null : (
    <Box
      py={2}
      color="white"
      textAlign="center"
      display={isAuthenticated ? "block" : "none"}
      boxShadow={2}
    >
      <Grid container alignItems="center" color="secondary.main">
        <Grid item xs={4}>
          <span style={{ fontWeight: 800 }}>34, 450 </span> <br></br>
          <span style={{ fontWeight: 500 }}>Registered Users</span>
        </Grid>
        <Grid item xs={4}>
          Copyright @ {currentYear} BookingCourt
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Footer);
