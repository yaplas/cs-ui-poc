import React from "react";
import Typography from "@material-ui/core/Typography";
import ScanForm from "./components/ScanForm";
import ScanResult from "./components/ScanResult";
import Box from "@material-ui/core/Box";

const App = (): JSX.Element => (
  <Box>
    <Box p={2}>
      <Typography variant="h4">CloudScan POC</Typography>
    </Box>
    <Box p={2}>
      <ScanForm />
    </Box>
    <Box p={2}>
      <ScanResult />
    </Box>
  </Box>
);

export default App;
