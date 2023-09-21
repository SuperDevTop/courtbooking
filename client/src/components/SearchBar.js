import { Box, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  }

  return (
    <Box>
      <TextField
        id="search"
        type="search"
        label="Search"
        value={searchTerm}
        sx={{
          marginTop: 1,
          width: '70%'
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
        
    </Box>
  );
}