import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';

const ChipsWithCloseButton = ({ chip, handleDeleteChipe }) => {
  const [chips, setChips] = useState(chip);

  useEffect(() => {
    setChips(chip)
  }, [chip])

  const onDelete = (chipToDelete) => () => {
    handleDeleteChipe(chipToDelete)
  };

  return (
    <div>
      {
        chips.map((chip) => (
          <Chip
            key={chip}
            label={chip}
            onDelete={onDelete(chip)}
            color="primary"
            variant="filled"
            style={{ margin: '5px' }}
          />
        ))
      }
    </div>
  );
};

export default ChipsWithCloseButton;
