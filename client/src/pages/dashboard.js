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
// import { courtNames } from "../utils/courtNames";
import { getBookingData } from "../actions/bookingAction";
import { currentPageToCourts } from "../utils/currentPageToCourts";
import { socket } from "../utils/socketService";
import CustomAlert from "../components/CustomAlert";

const Dashboard = ({
  getPlayersData,
  players,
  currentPage,
  getBookingData,
  booking_data,
  booking_date,
  courts,
}) => {
  const dispatch = useDispatch();
  const history = useNavigate();

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

  // const titles = courtNames;
  const colors = ["green", "red", "yellow", "blue", "pink"];
  const [displayedCourts, setdisplayedCourts] = useState([]);
  const [titles, setTitles] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);

  const bookupdate = () => {
    const { displayedCourtNumbers, displayedCourtNames } =
      currentPageToCourts(currentPage);
    setdisplayedCourts(displayedCourtNumbers);

    if (displayedCourtNames.length !== 0 && booking_date !== "") {
      getBookingData({
        court_names: displayedCourtNames,
        date: booking_date,
      });

      setOpenAlert(false);

      setTimeout(() => {
        setOpenAlert(true);
      }, 200);
    }
  };

  useEffect(() => {
    const { displayedCourtNumbers, displayedCourtNames } = currentPageToCourts(currentPage);
    setdisplayedCourts(displayedCourtNumbers);

    socket.on("book_created", bookupdate);

    socket.on("book_updated", bookupdate);

    socket.on("book_deleted", bookupdate);

    if (displayedCourtNames.length !== 0 && booking_date !== "") {
      getBookingData({ court_names: displayedCourtNames, date: booking_date });
    }
    // eslint-disable-next-line
  }, [currentPage, getBookingData, booking_date]);

  useEffect(() => {
    if (courts.length !== 0) {
      setTitles(courts.map((court) => court.name));
    }
  }, [courts]);

  return (
    <>
      <CustomAlert
        openState={openAlert}
        text="The grid has been updated!"
        severity="success"
      />
      <Topbar />
      <Box>
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
                booking_data={booking_data[index] ? booking_data[index] : []}
                court={courts[court]}
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
  courts: state.booking.courts,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
