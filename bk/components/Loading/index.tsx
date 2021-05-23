import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

const Loading = (): JSX.Element => (
  <Box display="flex" justifyContent="center">
    <CircularProgress />
  </Box>
);

export default Loading;
