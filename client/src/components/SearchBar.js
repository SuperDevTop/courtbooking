import { Box, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { connect } from "react-redux";

import { updateSearchingPlayer } from "../actions/playerActions";
import GlobalSearchbarResultItem from "./searchBar/globalSearchbarResultItem";

const SearchBar = ({ updateSearchingPlayer, total_booking_data }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    // updateSearchingPlayer(value);
    setSearchTerm(value);
  };

  const [filteredData, setFilteredData] = useState(total_booking_data);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData([]);
    } else {
      const filteredArray = total_booking_data.filter((subData) =>
        subData.players.some((player) =>
          player.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredData(filteredArray);
    }
  }, [total_booking_data, searchTerm]);

  return (
    <Box>
      <TextField
        id="search"
        type="search"
        label="Search"
        value={searchTerm}
        sx={{
          marginTop: 1,
          width: "70%",
        }}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {filteredData.length > 0 && (
        <Box
          marginLeft="8.5%"
          width="41%"
          position={'absolute'}
          zIndex={10}
          borderRadius={1}
          color="black"
          border="solid 1px grey"
          maxHeight={400}
          overflow="auto"
          sx={
            {
              backgroundColor: "white",
            }
          }
        >
          {filteredData.map((item, index) => (
            <GlobalSearchbarResultItem data={item} index={index} key={index} />
          ))}
        </Box>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => ({
  total_booking_data: state.booking.total_booking_data,
});

const mapDispatchToProps = (dispatch) => ({
  updateSearchingPlayer: (name) => dispatch(updateSearchingPlayer(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
