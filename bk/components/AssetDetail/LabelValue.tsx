import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const LabelValue = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}): JSX.Element => (
  <Box>
    <Grid container item xs={12} spacing={3}>
      <Grid item xs={3}>
        <Typography variant="h6" component="span">
          {label}
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography variant="h6" component="span">
          {children}
        </Typography>
      </Grid>
    </Grid>
  </Box>
);

export default LabelValue;
