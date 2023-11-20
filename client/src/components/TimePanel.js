import React from "react";
import { Box, Typography } from "@mui/material";
import { TimeIcon } from "@mui/x-date-pickers";
import TimeBox from "./layout/TimeBox";
import { timeTexts } from "../utils/texts";
import { useTheme } from "@emotion/react";

const TimePanel = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box
        backgroundColor={theme.header.background}
        sx={{
          // backgroundColor: '#c278dc',
          position: "sticky",
          top: 0,
          zIndex: 1,
          border: `${theme.palette.primary.light} solid 1px`,
        }}
        padding={2}
      >
        <TimeIcon sx={{ verticalAlign: "bottom" }} />
        <strong>&nbsp;Time </strong>
      </Box>
      <Box
        sx={{
          // backgroundColor: "#100852   ",
          // backgroundColor: `${theme.palette.primary.main}`,
          color: "secondary",
          // color: `${theme.palette.secondary.main}`,
          // border: "1px solid #a0a0a0",
          border: `1px solid ${theme.palette.primary.light}`
        }}
      >
        <Box
          sx={{
            // borderBottom: "1px solid #a0a0a0",
            borderBottom: `1px solid ${theme.palette.primary.light}`,
            height: 278,
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography textAlign="center" variant="h5">
            8:00 AM
          </Typography>
        </Box>
        {timeTexts.map((text, index) => (
          <TimeBox text={text} key={index} />
        ))}
      </Box>
    </Box>
  );
};

export default TimePanel;
