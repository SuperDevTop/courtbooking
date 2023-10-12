import React, { useEffect, useState } from "react";

import { Box, Grid } from "@mui/material";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

import { logOut } from "../actions/authActions";
import TimePanel from "../components/TimePanel";
import Court from "../components/Court";
import { getPlayersData } from "../actions/playerActions";
import setAuthToken from "../utils/setAuthToken";
import Topbar from "../components/layout/Topbar";
import { courtNames } from "../utils/courtNames";
import { getBookingData } from "../actions/bookingAction";

const Dashboard = ({
  getPlayersData,
  players,
  currentPage,
  getBookingData,
  booking_data,
  booking_date,
}) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  console.log(booking_data);

  // Auto Log Out
  useEffect(() => {
    setInterval(() => {
      if (localStorage.token) {
        const decoded = jwtDecode(localStorage.token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          localStorage.removeItem("token");
          setAuthToken(false);
          dispatch(logOut(history));
        }
      }
    }, 5000);

  }, [dispatch, history]);

  useEffect(() => {
    getPlayersData();
  }, [getPlayersData]);

  const titles = courtNames;
  const colors = ["green", "red", "yellow", "blue", "pink"];
  const [displayedCourts, setdisplayedCourts] = useState([]);

  useEffect(() => {
    let temp = [];
    let displayedCourtNames = [];

    if (currentPage === 6) {
      temp = [25, 26];
      displayedCourtNames = courtNames.slice(25, 27);
    } else {
      for (
        let index = 5 * (currentPage - 1);
        index < 5 * currentPage;
        index++
      ) {
        temp.push(index);
        displayedCourtNames.push(courtNames[index]);
      }
    }

    setdisplayedCourts(temp);
    
    if (displayedCourtNames.length !== 0 && booking_date !== '') {
      getBookingData({ court_names: displayedCourtNames, date: booking_date });
    }
  }, [currentPage, getBookingData, booking_date]);

  return (
    <>
      <Topbar />
      <Box marginBottom={8}>
        <Grid container>
          <Grid item xs={12} sm={3} md={2} lg={2}>
            <TimePanel />
          </Grid>
          {displayedCourts.map((court, index) => (
            <Grid item xs={12} sm={3} md={2} lg={2} key={court}>
              <Court
                name={titles[court]}
                headerColor={colors[court % 5]}
                players={players}
                booking_data={booking_data[index]}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getPlayersData: () => dispatch(getPlayersData()),
  getBookingData: (court_names, date) =>
    dispatch(getBookingData(court_names, date)),
});

const mapStateToProps = (state) => ({
  players: state.players.players,
  currentPage: state.page.currentPage,
  booking_data: state.booking.booking_data,
  booking_date: state.booking.booking_date,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
