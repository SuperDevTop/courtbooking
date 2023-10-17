import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/material";
import { connect } from "react-redux";

const ChipsWithCloseButton = ({
  chip,
  handleDeleteChip,
  handleWarmupCheck,
  players,
}) => {
  const [chips, setChips] = useState(chip);
  const [balls, setBalls] = useState([]);

  const handleChange = (event) => {
    if (event.target.checked) {
      handleWarmupCheck(true);
    } else {
      handleWarmupCheck(false);
    }
  };

  useEffect(() => {
    setChips(chip);
    setBalls([]);

    let temp = []

    chip.forEach((one) => {
      const player = players.find((player) => player.name === one);
      temp.push(player.ball)
      console.log(player.ball);
    });

    setBalls(temp)
    console.log(temp);
    // eslint-disable-next-line
  }, [chip, players]);

  const onDelete = (chipToDelete) => () => {
    console.log(balls);
    handleDeleteChip(chipToDelete);
  };

  return (
    <div>
      {chips.map((chip, index) => (
        <Box key={index}>
          <Chip
            label={chip}
            onDelete={onDelete(chip)}
            color="primary"
            variant="filled"
            style={{ margin: "7px" }}
          />
          <FormControlLabel
            control={<Checkbox onChange={handleChange} />}
            label="Warm Up"
          />
          {balls[index] === true ? (
            <FormControlLabel
              control={<Checkbox onChange={handleChange} checked />}
              label="Ball"
            />
          ) : (
            <FormControlLabel
              control={<Checkbox onChange={handleChange} />}
              label="Ball"
            />
          )}
        </Box>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  players: state.players.players,
});

export default connect(mapStateToProps)(ChipsWithCloseButton);
