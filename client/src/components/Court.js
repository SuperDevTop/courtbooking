import { Box, Button, Typography, Grid, MenuItem } from "@mui/material";
import React, { useEffect } from "react";
import StadiumIcon from "@mui/icons-material/Stadium";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { connect } from "react-redux";
import { Select } from "@mui/material";
import { FormControl, InputLabel } from "@mui/material";
import WorldFlag from "react-country-flag";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

import ImageCard from "../components/ImageCard";
import { createBook, deleteBooking } from "../actions/bookingAction";
import { alpha3ToAlph2 } from "../utils/countryCode";
import CustomAlert from "./CustomAlert";
import ChipsWithCloseButton from "./ChipsWithCloseButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { colorScale } from "../utils/gradientColor";
// import { courtActiveBackground } from "../utils/gradientColor";
import EditDialog from "./reservation/EditDialog";
// import { playerColors } from "../utils/playerColors";
import { currentPageToCourts } from "../utils/currentPageToCourts";
import LoadingOverlay from "./layout/LoadingOverlay";
import ConfirmationDialog from "./reservation/ConfirmDialog";
import { bookingOptionTexts } from "../utils/texts";
import { useTheme } from "@emotion/react";

// const theme = createTheme({
//     components: {
//         MuiButton: {
//             styleOverrides: {
//                 root: {
//                     backgroundColor: '#0ef05d'
//                 }
//             }
//         }
//     }
// });

const withCommonIconStyle = (WrappedComponent) => (props) =>
  (
    <WrappedComponent
      {...props}
      sx={{ marginRight: 1, verticalAlign: "text-bottom" }}
    />
  );

const CheckCircleWithStyle = withCommonIconStyle(CheckCircleIcon);

const Court = (props) => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [bookingCreated, setbookingCreated] = useState(false);
  const [bookingDeleted, setbookingDeleted] = useState(false);

  const players = props.players;
  const [openDialog, setOpenDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState({});
  const [schedulingPlayers, setSchdulingPlayers] = useState([]);
  const [image, setImage] = useState("/images/players/Djokovic.jpg");
  const [rownum, setRownum] = useState(0);
  const [timeLength, setTimeLength] = useState(2);
  const [dataofEditDialog, setDataofEditDialog] = useState({});
  const [warmups, setWarmups] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [indexToBeDeleted, setIndexToBeDeleted] = useState(0);
  // const headerColor = props.headerColor;
  const name = props.name;
  const bookedTimeIndexes = [];
  const [selectedOption, setSelectedOption] = useState("");
  const { court } = props;
  const theme = useTheme();

  // 10/6
  const booking_data = props.booking_data;

  let timeTexts = [
    "8:00",
    "8:30",
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
  ];

  const times = [
    "8:00",
    "8:30",
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
  ];

  let dat = new Array(booking_data.length);

  booking_data.forEach((data, index) => {
    const start_time = data.start_time;
    const date = new Date(start_time);
    const hour = date.getHours().toString();
    const min = date.getMinutes().toString().padStart(2, "0");
    const time = hour + ":" + min;
    const ind = timeTexts.indexOf(time);
    bookedTimeIndexes.push(ind);
    dat[ind] = booking_data[index];
    dat[ind]["seeded"] = new Array(dat[ind].players.length);

    // if (dat[ind]) {
    //   // eslint-disable-next-line
    //   dat[ind].players.map((player, index) => {
    //     const match = players.find((one) => one.name === player);

    //     if (match.tournament_seed !== 0) {
    //       dat[ind]["seeded"][index] = true;
    //     } else {
    //       dat[ind]["seeded"][index] = false;
    //     }
    //   });
    // }

    // for expansion of panel
    const time_slot = booking_data[index].time_slot;

    if (time_slot > 1) {
      for (let i = 1; i < time_slot; i++) {
        timeTexts.splice(ind + i, 1);
      }
    }
  });

  const flatProps = {
    options: players.map((option) => option.name),
  };

  const flatOptionProps = {
    options: bookingOptionTexts,
  };

  useEffect(() => {
    players.length > 0 && setSelectedPlayer(players[0]);

    if (players.length > 0) {
      const lastname = players[0].name.split(" ");
      setImage("/images/players/" + lastname[lastname.length - 1] + ".jpg");
    }
  }, [players]);

  const closeDialog = () => {
    setSchdulingPlayers([]);
    setOpenDialog(false);
  };

  const open_Dialog = (index) => {
    setRownum(times.indexOf(index));
    setOpenDialog(true);
  };

  const onChangePlayer = (event, newValue) => {
    if (players.length !== 0) {
      if (newValue !== null) {
        setSelectedPlayer(players.find((player) => player.name === newValue));

        const lastname = newValue.split(" ");
        setImage("/images/players/" + lastname[lastname.length - 1] + ".jpg");

        if (newValue === "Juan Manuel Cerundolo") {
          setImage("/images/players/Juan-Manuel_Cerundolo.jpg");
        }
      }
    }
  };

  const bookingSuccess = () => {
    setIsBooking(false);
    setbookingCreated(true);
    closeDialog();

    setTimeout(() => {
      setbookingCreated(false);
    }, 2000);
  };

  const onSchedule = () => {
    const initialDate = new Date(props.booking_date);
    const newDate = new Date(
      initialDate.getTime() + rownum * 30 * 60 * 1000 + 480 * 60 * 1000
    ); // start time : calculated by row(time is increased 30mins row by row, and the first row is 8:00)

    if (schedulingPlayers.length === 0) {
      // if no any players are selected
      setOpen(false);
      setTimeout(() => {
        setOpen(true);
      }, 200);

      return;
      //
    }

    const { displayedCourtNames } = currentPageToCourts(props.currentPage);
    let balls = [];
    let reservation_type = "Practice";

    for (let index = 0; index < warmups.length; index++) {
      balls.push(false);
    }

    const warmupsTrueCount = warmups.filter((one) => one === true).length;

    if (warmupsTrueCount > 0) {
      reservation_type = "Warm Up";
    }

    const data = {
      court_name: name,
      booker: "Admin",
      start_time: newDate,
      time_slot: timeLength, // 30 mins * time length
      reservation_type: reservation_type,
      players: schedulingPlayers,
      court_names: displayedCourtNames,
      date: props.booking_date,
      warmups: warmups,
      balls: balls,
      option: selectedOption,
    };

    setIsBooking(true);
    props.createBook(data, bookingSuccess);
  };

  const addPlayer = () => {
    // + button
    if (schedulingPlayers.length === 0) {
      setSchdulingPlayers([...schedulingPlayers, selectedPlayer.name]);

      return;
    } else if (schedulingPlayers.length === 4) {
      setOpen1(false);

      setTimeout(() => {
        setOpen1(true);
      }, 200);

      return;
    }

    let bFound = schedulingPlayers.find(
      (element) => element === selectedPlayer.name
    );

    if (!bFound) {
      setSchdulingPlayers([...schedulingPlayers, selectedPlayer.name]);
      setWarmups([...warmups, false]);
    }
  };

  const onChangeTimeLength = (event) => {
    setTimeLength(event.target.value);
  };

  const handleDeleteChip = (chipToDelete) => {
    const chipIndex = schedulingPlayers.findIndex(
      (one) => one === chipToDelete
    );

    setWarmups((warmups) => {
      const newWarmups = [...warmups];
      newWarmups.splice(chipIndex, 1);

      return newWarmups;
    });

    setSchdulingPlayers((schedulingPlayers) =>
      schedulingPlayers.filter((chip) => chip !== chipToDelete)
    );
  };

  const onEdit = (index) => {
    setEditDialog(true);
    setDataofEditDialog(dat[index]);
  };

  const onEditDialogClose = () => {
    setEditDialog(false);
  };

  const deleteReservation = (index) => {
    setIndexToBeDeleted(index);
    setOpenConfirmDialog(true);
  };

  const deleteReservationSuccess = () => {
    setIsDeleting(false);
    setbookingDeleted(true);
    setOpenConfirmDialog(false);

    setTimeout(() => {
      setbookingDeleted(false);
    }, 2000);
  };

  const onCloseConfirm = () => {
    setOpenConfirmDialog(false);
  };

  const onConfirm = () => {
    const id = dat[indexToBeDeleted]._id;
    const { displayedCourtNames } = currentPageToCourts(props.currentPage);

    const data = {
      id: id,
      court_names: displayedCourtNames,
      date: props.booking_date,
    };

    setIsDeleting(true);
    props.deleteBooking(data, deleteReservationSuccess);
  };

  const onOptionChange = (event, option) => {
    setSelectedOption(option);
  };

  return (
    <>
      {isBooking && <LoadingOverlay text={"Booking..."} color="success" />}
      {isDeleting && <LoadingOverlay text={"Deleting..."} color="warning" />}
      <Box>
        <CustomAlert
          openState={open}
          text="You must select one player at least !"
          severity="warning"
        />
        <CustomAlert
          openState={open1}
          text="You can book 4 players at max !"
          severity="warning"
        />
        <CustomAlert
          openState={bookingCreated}
          text="A booking has been created successfully!"
          severity="success"
        />
        <CustomAlert
          openState={bookingDeleted}
          text="The reservation was removed successfully!"
          severity="success"
        />
        <ConfirmationDialog
          open={openConfirmDialog}
          onClose={onCloseConfirm}
          onConfirm={onConfirm}
        />
        <Box
          backgroundColor={theme.header.background}
          border={theme.palette.primary.light}
          padding={2}
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            border: `${theme.palette.primary.light} solid 1px`,
          }}
        >
          <StadiumIcon
            sx={{
              verticalAlign: "bottom",
            }}
          />
          <strong> &nbsp; {name}</strong>
        </Box>
        {timeTexts.map((time, index) => (
          <Box
            sx={{
              // backgroundColor: `${courtActiveBackground[index % 5]}`,
              backgroundColor: `${theme.header.background}`,
              // border: "solid 1px #a0a0a0",
              border: `solid 1px ${theme.palette.primary.light}`,
              color: "white",
              height: bookedTimeIndexes.includes(index)
                ? 280 * dat[index].time_slot
                : 280,
            }}
            key={index}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
          >
            <Typography variant="h5" textAlign="center">
              {bookedTimeIndexes.includes(index) ? (
                <>
                  {dat[index].reservation_type}{" "}
                  <IconButton
                    aria-label="edit"
                    size="small"
                    onClick={() => {
                      onEdit(index);
                    }}
                  >
                    <EditIcon
                      sx={{ verticalAlign: "text-bottom", color: "white" }}
                    />
                  </IconButton>{" "}
                  <Box my={3.5} textAlign="center">
                    {dat[index].players.map((player, index2) => (
                      <Box key={index2}>
                        {/* {dat[index].seeded[index2] ? (
                          <>
                            <Typography
                              variant="h6"
                              key={index}
                              color={playerColors[index]}
                              sx={{
                                backgroundColor: "black",
                              }}
                            >
                              {player}
                            </Typography>
                          </>
                        ) : ( */}
                        <>
                          <Typography
                            variant="h6"
                            key={index}
                            // color={playerColors[index]}
                            color="primary.main"
                          >
                            {player}

                            {dat[index].balls[index2] && <img src="/images/ball.png" width={15} alt="ball" style={{ marginLeft: 5 }}></img>}
                          </Typography>
                        </>
                        {/* )} */}
                      </Box>
                    ))}
                  </Box>
                  {dat[index].option && (
                    <Box sx={{ bgcolor: "#999" }}>
                      <Typography variant="h6" mb={3} py={1}>
                        {dat[index].option}
                      </Typography>
                    </Box>
                  )}
                </>
              ) : (
                <>
                  {court && !court.blocked && (
                    <>
                      Available
                      <Box my={3.5} textAlign="center">
                        <Button
                          fullWidth
                          variant="outlined"
                          onClick={() => {
                            open_Dialog(time);
                          }}
                          sx={{
                            color: "white",
                            backgroundColor: "primary.accent",
                            paddingTop: 2,
                            paddingBottom: 2,
                            width: "95%",
                            marginTop: 2,
                            borderWidth: 2,
                          }}
                        >
                          SCHEDULE
                        </Button>
                      </Box>
                    </>
                  )}
                  {court && court.blocked && (
                    <div
                      style={{
                        background:
                          "linear-gradient(360deg, #0e0d0d, transparent)",
                          padding: '20px 0px',
                          margin: '20px 0px'
                      }}
                    >
                      Not Available
                    </div>
                  )}
                </>
              )}
            </Typography>

            <Typography variant="h6" color="white">
              <Grid container alignItems="center" justifyContent="space-around">
                <Grid item>
                  {bookedTimeIndexes.includes(index) ? (
                    <span style={{ color: "white" }}>comments</span>
                  ) : (
                    <span style={{ color: "#a9a9a9" }}>comments</span>
                  )}
                </Grid>
                <Grid item>
                  <Grid container alignItems="center" gap={1}>
                    <FavoriteIcon />
                    <ShareIcon />
                    {bookedTimeIndexes.includes(index) ? (
                      <DeleteIcon
                        onClick={() => {
                          deleteReservation(index);
                        }}
                      />
                    ) : (
                      <></>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Create Reservation Dialog */}
      <Dialog
        open={openDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            // backgroundColor: "#f0f0f0",
            maxWidth: "800px",
          },
        }}
      >
        <DialogTitle
          fontWeight={600}
          variant="h6"
          marginTop={2}
          textAlign="center"
          // color="black"
        >
          <CalendarMonthIcon
            sx={{ verticalAlign: "text-bottom", marginRight: 1 }}
          />
          <span style={{ fontSize: 18 }}>SCHEDULE</span>
          <CalendarMonthIcon
            sx={{ verticalAlign: "text-bottom", marginLeft: 1 }}
          />
        </DialogTitle>
        <DialogContent>
          <Grid container color="primary.info">
            <Grid item xs={6}>
              <Stack spacing={1}>
                <Autocomplete
                  {...flatProps}
                  id="controlled-demo"
                  value={selectedPlayer.name}
                  onChange={onChangePlayer}
                  renderInput={(params) => (
                    <TextField {...params} label="Players" variant="standard" />
                  )}
                />
              </Stack>
              <Grid container>
                <Grid item xs={7}>
                  <Typography
                    marginTop={3}
                    variant="h6"
                    alignItems="center"
                    color={colorScale[0]}
                  >
                    <CheckCircleIcon
                      sx={{ marginRight: 1, verticalAlign: "text-bottom" }}
                    />
                    {selectedPlayer.name}
                  </Typography>
                  <Typography
                    marginTop={2}
                    marginBottom={2}
                    alignItems="center"
                    variant="h6"
                    color={colorScale[1]}
                  >
                    <CheckCircleWithStyle />
                    Seeded: {selectedPlayer.tournament_seed}
                  </Typography>

                  <Typography
                    component={"span"}
                    variant="h6"
                    style={{ marginRight: 30 }}
                    color={colorScale[2]}
                  >
                    <CheckCircleWithStyle />
                    {selectedPlayer.natl}
                  </Typography>

                  <WorldFlag
                    countryCode={alpha3ToAlph2[selectedPlayer.natl]}
                    svg
                    style={{ width: "3em", height: "3em" }}
                  />
                  <br />
                </Grid>
                <Grid item xs={5} textAlign="center">
                  <img
                    src={"/images/" + selectedPlayer.atp_wta + ".png"}
                    style={{ width: 100, marginTop: 30 }}
                    alt={selectedPlayer.atp_wta}
                  />
                </Grid>
              </Grid>
              <Typography variant="h6" marginTop={1} color={colorScale[3]}>
                <CheckCircleWithStyle />
                Handiness: {selectedPlayer.right_handed ? "Right" : "Left"}{" "}
                <br />
              </Typography>
              <Typography variant="h6" marginTop={2} color={colorScale[4]}>
                <CheckCircleWithStyle />
                Status: {selectedPlayer.status}
              </Typography>
              <Typography variant="h6" marginTop={2} color={colorScale[5]}>
                <CheckCircleWithStyle />
                {selectedPlayer.singles_in ? "Singles In" : "Singles Out"}
              </Typography>
              <Typography variant="h6" marginTop={2} color={colorScale[6]}>
                <CheckCircleWithStyle />
                {selectedPlayer.doubles_in ? "Doubles In" : "Doubles Out"}
              </Typography>
              <Typography variant="h6" marginTop={2} color={colorScale[7]}>
                <CheckCircleWithStyle />
                {props.name}
              </Typography>
              <FormControl
                variant="filled"
                sx={{ minWidth: 120, marginTop: 2 }}
              >
                <InputLabel id="demo-simple-select-filled-label">
                  Reservation Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={timeLength}
                  onChange={onChangeTimeLength}
                  label="timeLength"
                >
                  <MenuItem value={2}>1 hr</MenuItem>
                  <MenuItem value={1}>30 mins</MenuItem>
                  <MenuItem value={4}>2 hrs</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ marginTop: 8, marginRight: 2, borderRadius: 1.5 }}>
                <Typography variant="h6" textAlign="center">
                  Selected Players:
                </Typography>
                <ChipsWithCloseButton
                  chip={schedulingPlayers}
                  handleDeleteChip={handleDeleteChip}
                  ball={false}
                  setParentWarmups={setWarmups}
                  parentWarmups={warmups}
                />
              </Box>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={addPlayer}
                  sx={{ marginTop: 2, marginBottom: 2 }}
                >
                  <AddCircleOutlineIcon sx={{ marginRight: 1 }} />
                  Add Player
                </Button>
                <Stack spacing={1} sx={{ width: "50%" }}>
                  <Autocomplete
                    {...flatOptionProps}
                    id="controlled-demo"
                    value={selectedOption}
                    onChange={onOptionChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Options"
                        variant="standard"
                      />
                    )}
                  />
                </Stack>
              </div>
              <ImageCard image_Url={image} title={selectedPlayer.name} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ paddingRight: 5, paddingBottom: 3 }}>
          <Button onClick={closeDialog} variant="outlined">
            Close
          </Button>
          <Button onClick={onSchedule} variant="outlined">
            Schedule
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Reservation Dialog */}
      <EditDialog
        open={editDialog}
        close={onEditDialogClose}
        data={dataofEditDialog}
        players={props.players}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  createBook: (data, callback) => dispatch(createBook(data, callback)),
  deleteBooking: (data, callback) => dispatch(deleteBooking(data, callback)),
});

const mapStateToProps = (state) => ({
  booking_date: state.booking.booking_date,
  currentPage: state.page.currentPage,
});

export default connect(mapStateToProps, mapDispatchToProps)(Court);
