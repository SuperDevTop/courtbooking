import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/material';

const ChipsWithCloseButton = ({ chip, handleDeleteChip, handleWarmupCheck }) => {
  const [chips, setChips] = useState(chip);

  const handleChange = (event) => {

    if (event.target.checked) {
      handleWarmupCheck(true)
    } else {
      handleWarmupCheck(false)
    }
  }

  useEffect(() => {
    setChips(chip)
  }, [chip])

  const onDelete = (chipToDelete) => () => {
    handleDeleteChip(chipToDelete)
  };

  return (
    <div>
      {
        chips.map((chip, index) => (
          <Box key={index}>
            <Chip
              label={chip}
              onDelete={onDelete(chip)}
              color="primary"
              variant="filled"
              style={{ margin: '7px' }}
            />
            <FormControlLabel control={<Checkbox onChange={handleChange} />} label="Warm Up" />
          </Box>
        ))
      }
    </div>
  );
};

export default ChipsWithCloseButton;
