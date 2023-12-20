import React, { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import StadiumIcon from "@mui/icons-material/Stadium";
import { connect } from "react-redux";

import EditDialog from "../dialog/editDialog";

const GlobalSearchbarResultItem = ({ data, index, players, clickable }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  const [courtData, setCourtData] = useState({});

  const handleClick = (data) => {
    if (openDialog) {
      return;
    }
    setOpenDialog(true);
    setCourtData(data);
  };

  return (
    <>
      <Box
        onClick={() => clickable && handleClick(data)}
        fontSize={18}
        sx={{
          "&:hover": {
            cursor: "pointer",
            background: "grey",
          },
        }}
      >
        <Grid
          container
          p={0.5}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid item xs={1}>
            {index + 1}
          </Grid>
          <Grid item xs={3}>
            {data.start_time.substring(11, 16)} (GMT)
            <br />
            {data.start_time.substring(0, 10)}
          </Grid>
          <Grid item xs={4} textAlign={"start"} pl={2}>
            {data.players.map((one, index2) => (
              <Typography key={index2}>{one}</Typography>
            ))}
          </Grid>
          <Grid
            item
            xs={4}
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
          >
            <StadiumIcon
              sx={{
                marginRight: 0.5,
              }}
            />
            {data.court_name}
          </Grid>
        </Grid>
      </Box>
      <EditDialog
        open={openDialog}
        close={onCloseDialog}
        players={players}
        data={courtData}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  players: state.players.players,
});

export default connect(mapStateToProps)(GlobalSearchbarResultItem);
