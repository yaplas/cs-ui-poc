import React from "react";
import Grid from "@material-ui/core/Grid";

const FormLayout = ({
  children: [searchInput, submitButton, submitStatus],
}: {
  children: JSX.Element[];
}): JSX.Element => (
  <Grid container spacing={1}>
    <Grid item xs={3}>
      {searchInput}
    </Grid>
    <Grid item xs={1} container alignItems="flex-end">
      {submitButton}
    </Grid>
    <Grid item xs={1} container alignItems="flex-end">
      {submitStatus}
    </Grid>
  </Grid>
);

export default FormLayout;
