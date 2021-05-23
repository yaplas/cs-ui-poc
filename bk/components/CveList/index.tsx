import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { trim } from "ramda";

const CveList = (): JSX.Element => {
  const params = useParams<{ list: string; ip: string; port: string }>();
  const list = atob(params.list).split(",").map(trim);
  return (
    <Box p={2} display="flex" flexDirection="column">
      <Box p={1}>
        <Typography variant="h6">
          CVE's found for IP {params.ip} on port {params.port}{" "}
        </Typography>
      </Box>
      {list.map((cve) => (
        <Box p={1} key={cve}>
          <Link to={{ pathname: `/cve-detail/${cve}` }}>{cve}</Link>
        </Box>
      ))}
    </Box>
  );
};

export default CveList;
