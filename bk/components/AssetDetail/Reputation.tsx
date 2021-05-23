import React from "react";
import Box from "@material-ui/core/Box";
import { DataGrid } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import { AssetDetailPayload } from "../../io/assets";

const Reputation = ({
  scanInfo: { reputation },
}: AssetDetailPayload): JSX.Element => (
  <Box p={2}>
    <Box p={2}>
      <Typography variant="h5">Malicious Reputation</Typography>
    </Box>
    {reputation.events.length ? (
      <DataGrid
        autoHeight
        hideFooter
        rows={reputation.events.map(({ timestamp, ...rest }) => ({
          date: new Date(timestamp * 1000).toISOString(),
          ...rest,
        }))}
        columns={[
          { field: "di", hide: true },
          { field: "date", headerName: "Date", width: 350 },
          { field: "category", headerName: "Category", width: 250 },
          { field: "type", headerName: "Type", width: 220 },
          { field: "info", headerName: "Info", width: 220 },
        ]}
      />
    ) : (
      <Box p={2}>
        <Typography variant="button">
          No malicious reputation events observed{" "}
        </Typography>{" "}
      </Box>
    )}
  </Box>
);

export default Reputation;
