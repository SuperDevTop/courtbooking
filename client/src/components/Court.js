import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useTheme } from "@emotion/react";
import StadiumIcon from "@mui/icons-material/Stadium";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  Box,
  Button,
  Typography,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import WorldFlag from "react-country-flag";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import ImageCard from "./imageCard";
import CustomAlert from "./customAlert";
import ChipsWithCloseButton from "./chipsWithCloseButton";
import EditDialog from "./dialog/editDialog";
import LoadingOverlay from "./dialog/loadingOverlay";
import ConfirmationDialog from "./dialog/confirmDialog";
import CommentsDialog from "./dialog/commentsDialog";
import Scrollbars from "react-custom-scrollbars-2";
import imageUrlFromPlayerName from "../utils/usefulFuncs";
import MyBookingDataDialog from "./dialog/myBookingData";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { createBook, deleteBooking } from "../actions/bookingAction";
import { alpha3ToAlph2 } from "../utils/countryCode";
import { colorScale } from "../utils/gradientColor";
import { currentPageToCourts } from "../utils/currentPageToCourts";
import { bookingOptionTexts } from "../utils/texts";
import { getComment } from "../actions/bookingAction";

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
  const [openMaxPlayerWarning, setOpenMaxPlayerWarning] = useState(false);
  const [bookingCreated, setbookingCreated] = useState(false);
  const [bookingDeleted, setbookingDeleted] = useState(false);
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
  const [openMyBookingDataDialog, setOpenMyBookingDataDialog] = useState(false);
  const [indexToBeDeleted, setIndexToBeDeleted] = useState(0);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const [commentPlayers, setCommentPlayers] = useState([]);
  const bookedTimeIndexes = [];
  const [selectedOption, setSelectedOption] = useState("");
  const [bookingId, setBookingId] = useState(null);
  const [bookingDataOfSelectedPlayer, setBookingDataOfSelectedPlayer] =
    useState([]);
  const [outofdate, setOutofdate] = useState(false);

  const {
    court,
    total_booking_data,
    name,
    players,
    booking_data,
    currentPage,
    booking_date,
    getComment,
    createBook,
    deleteBooking,
  } = props;

  const theme = useTheme();

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
      setImage(imageUrlFromPlayerName(players[0].name));
    }
  }, [players]);

  useEffect(() => {
    if (Object.keys(selectedPlayer).length === 0) {
      setBookingDataOfSelectedPlayer([]);
    } else {
      const filteredArray = total_booking_data.filter((subData) =>
        subData.players.some((player) =>
          player.toLowerCase().includes(selectedPlayer.name.toLowerCase())
        )
      );
      setBookingDataOfSelectedPlayer(filteredArray.reverse());
    }
  }, [selectedPlayer, total_booking_data]);

  useEffect(() => {
    const currentDate = new Date();
    const aimDate = new Date(booking_date);

    const currentOnlyDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const providedOnlyDate = new Date(aimDate.getFullYear(), aimDate.getMonth(), aimDate.getDate());

    if (currentOnlyDate > providedOnlyDate) {
      setOutofdate(true);
    } else {
      setOutofdate(false)
    }
  }, [booking_date]);

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
        setImage(imageUrlFromPlayerName(newValue));
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
    const initialDate = new Date(booking_date);
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

    const { displayedCourtNames } = currentPageToCourts(currentPage);
    let balls = [];
    let reservation_type = "Practice";
    const warmupsTrueCount = warmups.filter((one) => one === true).length;

    for (let index = 0; index < warmups.length; index++) {
      balls.push(false);
    }

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
      date: booking_date,
      warmups: warmups,
      balls: balls,
      option: selectedOption,
    };

    setIsBooking(true);
    createBook(data, bookingSuccess);
  };

  const addPlayer = () => {
    // + button
    if (schedulingPlayers.length === 0) {
      setSchdulingPlayers([...schedulingPlayers, selectedPlayer.name]);

      return;
    } else if (schedulingPlayers.length === 4) {
      setOpenMaxPlayerWarning(false);

      setTimeout(() => {
        setOpenMaxPlayerWarning(true);
      }, 200);

      return;
    }

    const bFound = schedulingPlayers.find(
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

  const handleComments = async (commentIds, players, id) => {
    setOpenCommentDialog(true);
    setCommentPlayers(players);
    setBookingId(id);

    const data = {
      commentIds: commentIds,
    };

    await getComment(data);
  };

  const onCommentDialogClose = () => {
    setOpenCommentDialog(false);
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
    const { displayedCourtNames } = currentPageToCourts(currentPage);

    const data = {
      id: id,
      court_names: displayedCourtNames,
      date: booking_date,
    };

    setIsDeleting(true);
    deleteBooking(data, deleteReservationSuccess);
  };

  const onOptionChange = (event, option) => {
    setSelectedOption(option);
  };

  return (
    <>
      {isBooking && <LoadingOverlay text="Booking..." color="success" />}
      {isDeleting && <LoadingOverlay text="Deleting..." color="warning" />}
      <Box sx={{ borderBottom: `1px solid ${theme.palette.primary.light}` }}>
        <CustomAlert
          openState={open}
          text="You must select one player at least !"
          severity="warning"
        />
        <CustomAlert
          openState={openMaxPlayerWarning}
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
          text="The reservation has been removed successfully!"
          severity="success"
        />
        <ConfirmationDialog
          open={openConfirmDialog}
          onClose={onCloseConfirm}
          onConfirm={onConfirm}
          text="Are you sure you want to delete this reservation?"
          title="Delete reservation"
        />
        <CommentsDialog
          open={openCommentDialog}
          onClose={onCommentDialogClose}
          players={commentPlayers}
          bookingId={bookingId}
          text="Are you sure you want to delete this reservation?"
          title="Delete reservation"
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
              backgroundColor: `${theme.header.background}`,
              border: `solid 1px ${theme.palette.primary.light}`,
              color: "white",
              height: bookedTimeIndexes.includes(index)
                ? 280 * dat[index].time_slot
                : 280,
            }}
            key={index}
            display="flex"
            flexDirection="column"
            justifyContent="center"
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
                  <Box my={1.5} textAlign="center">
                    {dat[index].players.map((player, index2) => (
                      <Box
                        key={index2}
                        display="flex"
                        justifyContent="center"
                        py={0.5}
                      >
                        <Typography
                          variant="h6"
                          key={index}
                          color="primary.main"
                        >
                          {player}
                        </Typography>
                        {dat[index].balls[index2] && (
                          <img
                            src="/images/ball.png"
                            width={30}
                            height={30}
                            alt="ball"
                            style={{ marginLeft: 5, marginRight: 5 }}
                          />
                        )}
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
                  {court && !court.blocked && !outofdate && (
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
                  {court && (court.blocked || outofdate) && (
                    <div
                      style={{
                        background:
                          "linear-gradient(360deg, #0e0d0d, transparent)",
                        padding: "20px 0px",
                        margin: "20px 0px",
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
                <Grid
                  item
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  {bookedTimeIndexes.includes(index) ? (
                    <span
                      style={{
                        color: "white",
                      }}
                      onClick={() =>
                        handleComments(
                          dat[index].comments,
                          dat[index].players,
                          dat[index]._id
                        )
                      }
                    >
                      comments
                    </span>
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
      <Dialog open={openDialog} maxWidth="lg" fullWidth>
        <DialogTitle
          fontWeight={600}
          variant="h6"
          marginTop={2}
          textAlign="center"
        >
          <CalendarMonthIcon
            sx={{ verticalAlign: "text-bottom", marginRight: 1 }}
          />
          <span style={{ fontSize: 18 }}>SCHEDULE</span>
          <CalendarMonthIcon
            sx={{ verticalAlign: "text-bottom", marginLeft: 1 }}
          />
        </DialogTitle>
        <Scrollbars autoHeight autoHeightMax={500}>
          <DialogContent>
            <Grid container color="primary.info" spacing={3}>
              <Grid item xs={8}>
                <Stack spacing={1}>
                  <Autocomplete
                    {...flatProps}
                    value={selectedPlayer.name}
                    onChange={onChangePlayer}
                    isOptionEqualToValue={(option, value) => {
                      return option.value === value.value;
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Players"
                        variant="standard"
                      />
                    )}
                  />
                </Stack>
                <Grid container spacing={1}>
                  <Grid item xs={3}>
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
                    <Typography
                      variant="h6"
                      marginTop={1}
                      color={colorScale[3]}
                    >
                      <CheckCircleWithStyle />
                      Handiness:{" "}
                      {selectedPlayer.right_handed ? "Right" : "Left"} <br />
                    </Typography>
                    <Typography
                      variant="h6"
                      marginTop={2}
                      color={colorScale[4]}
                    >
                      <CheckCircleWithStyle />
                      Status: {selectedPlayer.status}
                    </Typography>
                    <Typography
                      variant="h6"
                      marginTop={2}
                      color={colorScale[5]}
                    >
                      <CheckCircleWithStyle />
                      {selectedPlayer.singles_in ? "Singles In" : "Singles Out"}
                    </Typography>
                    <Typography
                      variant="h6"
                      marginTop={2}
                      color={colorScale[6]}
                    >
                      <CheckCircleWithStyle />
                      {selectedPlayer.doubles_in ? "Doubles In" : "Doubles Out"}
                    </Typography>
                    <Typography
                      variant="h6"
                      marginTop={2}
                      color={colorScale[7]}
                    >
                      <CheckCircleWithStyle />
                      {name}
                    </Typography>
                    <br />
                  </Grid>
                  <Grid item xs={5} marginTop={3}>
                    <ImageCard image_Url={image} title={selectedPlayer.name} />
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    marginTop={4}
                    paddingRight={3}
                    sx={{ paddingLeft: "53px !important" }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={addPlayer}
                      sx={{
                        marginBottom: 2,
                        paddingTop: 1.8,
                        paddingBottom: 1.8,
                      }}
                      fullWidth
                    >
                      <AddCircleOutlineIcon sx={{ marginRight: 1 }} />
                      Add Player
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setOpenMyBookingDataDialog(true);
                      }}
                      sx={{
                        marginTop: 2,
                        marginBottom: 2,
                        paddingTop: 1.8,
                        paddingBottom: 1.8,
                      }}
                      fullWidth
                    >
                      <VisibilityIcon sx={{ marginRight: 1 }} />
                      View Books
                    </Button>
                    {/* <img
                      src={"/images/" + selectedPlayer.atp_wta + ".png"}
                      style={{ width: 100, minWidth: "100%" }}
                      alt={selectedPlayer.atp_wta}
                    /> */}

                    <MyBookingDataDialog
                      open={openMyBookingDataDialog}
                      title="Booking Plans"
                      onClose={() => {
                        setOpenMyBookingDataDialog(false);
                      }}
                      bookingDataOfSelectedPlayer={bookingDataOfSelectedPlayer}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} paddingTop={5}>
                <Box sx={{ marginRight: 2, borderRadius: 1.5 }} marginTop={2}>
                  <fieldset
                    style={{
                      border: " 1px solid grey",
                      borderRadius: "10px",
                    }}
                  >
                    <legend>Settings</legend>
                    <Box
                      display="flex"
                      alignItems="flex-end"
                      justifyContent="space-around"
                    >
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
                      <Stack spacing={1} sx={{ width: "50%" }}>
                        <Autocomplete
                          {...flatOptionProps}
                          value={selectedOption}
                          onChange={onOptionChange}
                          isOptionEqualToValue={(option, value) => {
                            return option.value === value.value;
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Options"
                              variant="standard"
                            />
                          )}
                        />
                      </Stack>
                    </Box>
                  </fieldset>

                  {/* <Typography
                    variant="h5"
                    textAlign="center"
                    marginTop={4}
                    marginBottom={2}
                  >
                    Selected Players:
                  </Typography> */}
                  <fieldset
                    style={{
                      minHeight: 300,
                      borderRadius: "10px",
                      marginTop: "20px",
                      border: "solid 1px grey",
                    }}
                  >
                    <legend>Selected Players</legend>
                    <ChipsWithCloseButton
                      chip={schedulingPlayers}
                      handleDeleteChip={handleDeleteChip}
                      ball={false}
                      setParentWarmups={setWarmups}
                      parentWarmups={warmups}
                    />
                  </fieldset>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
        </Scrollbars>
        <DialogActions sx={{ paddingRight: 4.6, paddingBottom: 4 }}>
          <Button
            onClick={closeDialog}
            variant="outlined"
            sx={{ marginRight: 1.2 }}
          >
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
  getComment: (data) => dispatch(getComment(data)),
});

const mapStateToProps = (state) => ({
  booking_date: state.booking.booking_date,
  currentPage: state.page.currentPage,
  total_booking_data: state.booking.total_booking_data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Court);
