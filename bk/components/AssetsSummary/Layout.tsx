import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const Layout = ({
  title,
  score,
  gradeImg,
  children: [ports, products, cves],
}: {
  title: string;
  score?: number;
  gradeImg?: string;
  children: JSX.Element[];
}): JSX.Element => (
  <Box>
    <Box p={3} display="flex" justifyContent="center">
      <Box p={2}>
        <Typography variant="h4" component="div">
          {title}
        </Typography>
      </Box>
      {score && (
        <Box
          p={2}
          border={1}
          borderColor="grey.500"
          display="flex"
          justifyContent="center"
        >
          <Box pr={3}>
            <Typography variant="h4" component="div">
              {score}
            </Typography>
          </Box>
          <Box>
            <img src={gradeImg} style={{ width: "40px", height: "40px" }} />
          </Box>
        </Box>
      )}
    </Box>
    <Grid container spacing={2}>
      <Grid container item xs={6} justify="center">
        <Typography variant="h5" component="div">
          Open Ports
        </Typography>
      </Grid>
      <Grid container item xs={6} justify="center">
        <Typography variant="h5" component="div">
          Products
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Box border={1} borderColor="grey.500" height={550}>
          {ports}
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box border={1} borderColor="grey.500" height={550}>
          {products}
        </Box>
      </Grid>
      <Grid container item xs={6} justify="center">
        <Typography variant="h5" component="div">
          CVE's
        </Typography>
      </Grid>
      <Grid item xs={6} />
      <Grid item xs={6}>
        <Box border={1} borderColor="grey.500" height={550}>
          {cves}
        </Box>
      </Grid>
    </Grid>
  </Box>
);

export default Layout;
