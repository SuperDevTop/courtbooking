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
  ball,
  setParentBalls,
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

  const handleBallChange = (event, index) => {
    let value;

    if (event.target.checked) {
      value = true;
    } else {
      value = false;
    }

    const newBalls = [...balls]
    newBalls[index] = value

    setBalls(newBalls)
    setParentBalls(newBalls)
    console.log(newBalls);

  };

  useEffect(() => {
    setChips(chip);
    setBalls([]);
    setParentBalls([])

    let temp = [];

    chip.forEach((one) => {
      const player = players.find((player) => player.name === one);
      temp.push(player.ball);
    });

    setBalls(temp);
    setParentBalls(temp);
    // eslint-disable-next-line
  }, [chip, players]);

  const onDelete = (chipToDelete) => () => {
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
          {ball ? (
            balls[index] === true ? (
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(event) => {
                      handleBallChange(event, index);
                    }}
                    checked={true}
                  />
                }
                label="Ball"
              />
            ) : (
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(event) => {
                      handleBallChange(event, index);
                    }}
                    checked={false}
                  />
                }
                label="Ball"
              />
            )
          ) : (
            <></>
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
