import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { AssetDetailPayload } from "../../io/assets";
import LabelValue from "./LabelValue";

const WhoIs = ({ whoIs, scanInfo, ip }: AssetDetailPayload): JSX.Element => (
  <Box p={2}>
    <Grid container>
      <Grid item xs={6}>
        <LabelValue label="IP:">{ip}</LabelValue>
        <LabelValue label="Host:">{scanInfo.domains.join(", ")}</LabelValue>
        <LabelValue label="Country:">
          <Grid container>
            <Grid item xs={1}>
              <img
                src={`https://www.countryflags.io/${whoIs.countryCode}/flat/32.png`}
              />
            </Grid>
            <Grid item xs={11}>
              <span>{whoIs.country}</span>
            </Grid>
          </Grid>
        </LabelValue>
        <LabelValue label="Region:">{whoIs.regionName}</LabelValue>
        <LabelValue label="City:">{whoIs.city}</LabelValue>
        <LabelValue label="Timezone:">{whoIs.timezone}</LabelValue>
        <LabelValue label="Organization:">{whoIs.org || "-"}</LabelValue>
      </Grid>
      <Grid item container xs={6} justify="center">
        <img
          src={`https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyBWpkWkfxS1nX1JDqhKNuZb8ell4jHWjt4&center=${whoIs.lat},${whoIs.lon}&zoom=5&size=600x350&markers=color:red|${whoIs.lat},${whoIs.lon}&language=en`}
        />
      </Grid>
    </Grid>
  </Box>
);

export default WhoIs;
