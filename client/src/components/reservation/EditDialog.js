import {
  Box,
  Button,
  Typography,
  Grid,
  MenuItem,
  TextField,
  Select,
} from "@mui/material";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { connect } from "react-redux";
import { FormControl, InputLabel } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import WorldFlag from "react-country-flag";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { alpha3ToAlph2 } from "../../utils/countryCode";
import { updateBook } from "../../actions/bookingAction";
import CustomAlert from "../CustomAlert";
import ChipsWithCloseButton from "../ChipsWithCloseButton";
import { currentPageToCourts } from "../../utils/currentPageToCourts";
import { colorScale } from "../../utils/gradientColor";
import ImageCard from "../ImageCard";
import LoadingOverlay from "../layout/LoadingOverlay";
import { bookingOptionTexts } from "../../utils/texts";

const EditDialog = ({
  open,
  close,
  data,
  updateBook,
  players,
  currentPage,
  booking_date,
}) => {
  const withCommonIconStyle = (WrappedComponent) => (props) =>
    (
      <WrappedComponent
        {...props}
        sx={{ marginRight: 1, verticalAlign: "text-bottom" }}
      />
    );

  const CheckCircleWithStyle = withCommonIconStyle(CheckCircleIcon);

  const [timeLength, setTimeLength] = useState(2);
  const [warmupCheckedCount, setWarmupCheckedCount] = useState(0);
  const [chip, setChip] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState("test");
  const [maxPlayersCountWarning, setMaxPlayersCountWarning] = useState(false);
  const [noSelectWarning, setNoSelectWarning] = useState(false);
  const [bExistingUser, setExistingUser] = useState(false);
  const [balls, setBalls] = useState([]);
  const [warmups, setWarmups] = useState([]);
  const [selectedPlayerData, setSelectedPlayerData] = useState({});
  const [image, setImage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const flatOptionProps = {
    options: bookingOptionTexts,
  };

  useEffect(() => {
    players.length > 0 && setSelectedPlayer(players[0].name);
    players.length > 0 && setSelectedPlayerData(players[0]);

    if (players.length > 0) {
      const lastname = players[0].name.split(" ");
      setImage("/images/players/" + lastname[lastname.length - 1] + ".jpg");
    }
    // eslint-disable-next-line
  }, [players]);

  const flatProps = {
    options: players.map((option) => option.name),
  };

  useEffect(() => {
    if (data.hasOwnProperty("players")) {
      setChip(data.players);
      setTimeLength(data.time_slot);
      setSelectedOption(data.option);
      setWarmups(data.warmups);
      setBalls(data.balls);
    }
  }, [data]);

  const onSave = () => {
    let reservation_type = "Practice";
    const warmupCount = warmups.filter((one) => one === true).length;

    if (warmupCount > 0) {
      reservation_type = "Warm Up";
    }

    const { displayedCourtNames } = currentPageToCourts(currentPage);
    const dat = {
      id: data._id,
      time_slot: timeLength,
      players: chip,
      reservation_type: reservation_type,
      court_names: displayedCourtNames,
      date: booking_date,
      balls: balls,
      warmups: warmups,
      option: selectedOption,
    };

    setIsSaving(true);
    updateBook(dat, updateSuccess);
  };

  const handleWarmupCheck = (value) => {
    if (value === true) {
      setWarmupCheckedCount(warmupCheckedCount + 1);
    } else {
      setWarmupCheckedCount(warmupCheckedCount - 1);
    }
  };

  const onChangeTimeLength = (event) => {
    setTimeLength(event.target.value);
  };

  const handleDeleteChip = (chipToDelete) => {
    const chipIndex = chip.findIndex((one) => one === chipToDelete);

    setChip(chip.filter((one) => one !== chipToDelete));

    setWarmups((warmups) => {
      const newWarmups = [...warmups];
      newWarmups.splice(chipIndex, 1);

      return newWarmups;
    });
  };

  const onClose = () => {
    setWarmups(data.warmups); // set warmups again as initail because the user might open edit_dialog again
    setChip(data.players);
    setAlertOpen(false);
    close();
  };

  const updateSuccess = () => {
    setIsSaving(false);
    setAlertOpen(true);

    setTimeout(() => {
      setAlertOpen(false);
      onClose();
    }, 2000);
  };

  const onChangePlayer = (event, newValue) => {
    setSelectedPlayer(newValue);
    const playerData = players.find((player) => player.name === newValue);

    setSelectedPlayerData(playerData);

    const lastname = playerData.name.split(" ");
    setImage("/images/players/" + lastname[lastname.length - 1] + ".jpg");
  };

  const addPlayer = () => {
    if (selectedPlayer === "") {
      setNoSelectWarning(true);

      setTimeout(() => {
        setNoSelectWarning(false);
      }, 2000);
      return;
    } else if (chip.length >= 4) {
      setMaxPlayersCountWarning(true);

      setTimeout(() => {
        setMaxPlayersCountWarning(false);
      }, 2000);
      return;
    }

    const bFound = chip.find((name) => name === selectedPlayer);

    if (!bFound) {
      setChip([...chip, selectedPlayer]);
      setWarmups([...warmups, false]);
    } else {
      setExistingUser(true);

      setTimeout(() => {
        setExistingUser(false);
      }, 2000);
    }
  };

  const onOptionChange = (event, value) => {
    setSelectedOption(value);
  };

  return (
    <Dialog
      open={open}
      maxWidth="md"
      fullWidth
      // PaperProps={{
      //   style: {
      //     backgroundColor: "#f0f0f0",
      //   },
      // }}
    >
      {isSaving && <LoadingOverlay text="Saving..." color="success" />}
      <CustomAlert
        openState={alertOpen}
        text="The reservation has been updated successfully !"
        severity="success"
      />
      <CustomAlert
        openState={maxPlayersCountWarning}
        text="You can book 4 players at max !"
        severity="warning"
      />
      <CustomAlert
        openState={noSelectWarning}
        text="You must select one player at least !"
        severity="warning"
      />
      <CustomAlert
        openState={bExistingUser}
        text="The player already exists !"
        severity="warning"
      />
      <DialogTitle
        fontWeight={600}
        variant="h6"
        marginTop={2}
        marginBottom={3}
        textAlign="center"
        // color="black"
      >
        <EditNoteIcon sx={{ verticalAlign: "text-bottom", marginRight: 1 }} />
        Edit reservation
        <EditNoteIcon sx={{ verticalAlign: "text-bottom", marginLeft: 1 }} />
      </DialogTitle>
      <DialogContent>
        <Grid container color="primary.info">
          <Grid item xs={5}>
            <Stack spacing={1}>
              <Autocomplete
                {...flatProps}
                id="controlled-demo"
                value={selectedPlayer}
                onChange={onChangePlayer}
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
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
                  {selectedPlayer}
                </Typography>
                <Typography
                  marginTop={2}
                  marginBottom={2}
                  alignItems="center"
                  variant="h6"
                  color={colorScale[1]}
                >
                  <CheckCircleWithStyle />
                  Seeded: {selectedPlayerData.tournament_seed}
                </Typography>

                <Typography
                  component={"span"}
                  variant="h6"
                  style={{ marginRight: 30 }}
                  color={colorScale[2]}
                >
                  <CheckCircleWithStyle />
                  {selectedPlayerData.natl}
                </Typography>

                <WorldFlag
                  countryCode={alpha3ToAlph2[selectedPlayerData.natl]}
                  svg
                  style={{ width: "3em", height: "3em" }}
                />
                <br />
              </Grid>
              <Grid item xs={5} textAlign="center">
                <img
                  src={"/images/" + selectedPlayerData.atp_wta + ".png"}
                  style={{ width: 100, marginTop: 30 }}
                  alt={selectedPlayerData.atp_wta}
                />
              </Grid>
            </Grid>
            <Typography variant="h6" marginTop={1} color={colorScale[3]}>
              <CheckCircleWithStyle />
              Handiness: {selectedPlayerData.right_handed
                ? "Right"
                : "Left"}{" "}
              <br />
            </Typography>
            <Typography variant="h6" marginTop={2} color={colorScale[4]}>
              <CheckCircleWithStyle />
              Status: {selectedPlayerData.status}
            </Typography>
            <Typography variant="h6" marginTop={2} color={colorScale[5]}>
              <CheckCircleWithStyle />
              {selectedPlayerData.singles_in ? "Singles In" : "Singles Out"}
            </Typography>
            <Typography variant="h6" marginTop={2} color={colorScale[6]}>
              <CheckCircleWithStyle />
              {selectedPlayerData.doubles_in ? "Doubles In" : "Doubles Out"}
            </Typography>
            <br></br>
            <FormControl variant="filled" sx={{ minWidth: 120, marginTop: 2 }}>
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
          <Grid item xs={7}>
            <Box
              sx={{
                marginRight: 2,
                borderRadius: 1.5,
                marginLeft: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                // color="black"
                variant="h6"
                textAlign="center"
                marginBottom={2}
              >
                Selected Players:
              </Typography>

              <ChipsWithCloseButton
                chip={chip}
                handleDeleteChip={handleDeleteChip}
                handleWarmupCheck={handleWarmupCheck}
                ball={true}
                setParentBalls={setBalls}
                setParentWarmups={setWarmups}
                parentWarmups={warmups}
                parentBalls={balls}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "85%",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={addPlayer}
                  sx={{ marginTop: 2, marginBottom: 2 }}
                >
                  <AddCircleOutlineIcon sx={{ marginRight: 1 }} />
                  Add Player
                </Button>
                <Stack spacing={1} sx={{ width: "55%" }}>
                  <Autocomplete
                    {...flatOptionProps}
                    id="controlled-options"
                    value={selectedOption}
                    onChange={onOptionChange}
                    isOptionEqualToValue={(option, value) => {return option.value === value.value}}
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
              <ImageCard
                image_Url={image}
                title={selectedPlayer}
                style={{ width: "20vw", marginTop: 1 }}
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ paddingRight: 3, paddingBottom: 3 }}>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
        <Button onClick={onSave} variant="outlined">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateBook: (data, callback) => dispatch(updateBook(data, callback)),
});

const mapStateToProps = (state) => ({
  currentPage: state.page.currentPage,
  booking_date: state.booking.booking_date,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDialog);
