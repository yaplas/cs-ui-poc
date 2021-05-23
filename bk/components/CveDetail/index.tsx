import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchCveDetailByCveId } from "../../redux/slices/assets";
import Loading from "../Loading";
import { DataGrid } from "@material-ui/data-grid";

const CveDetail = (): JSX.Element => {
  const params = useParams<{ cve: string }>();
  const detail = useAppSelector((state) => state.assets.cve.detail);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCveDetailByCveId(params.cve));
  }, [params.cve]);

  if (!detail.data) {
    return <Loading />;
  }

  return (
    <Box p={2}>
      <Box p={1}>
        <Typography variant="h5">{params.cve}</Typography>
      </Box>
      <Box p={1}>
        <Typography variant="h6">Summary</Typography>
      </Box>
      <Box pl={1}>
        <Typography variant="body1">{detail.data.summary}</Typography>
      </Box>
      <Box p={1} pt={3}>
        <Box p={1}>
          <Typography variant="h6">List of (???)</Typography>
        </Box>
        <DataGrid
          autoHeight
          hideFooter
          rows={detail.data.events.map(({ timestamp, ...rest }) => ({
            date: new Date(timestamp * 1000).toISOString(),
            ...rest,
          }))}
          columns={[
            { field: "di", hide: true },
            { field: "date", headerName: "Date", width: 350 },
            { field: "category", headerName: "Category", width: 250 },
            { field: "type", headerName: "Type", width: 220 },
            { field: "info", headerName: "Info", width: 300 },
          ]}
        />
      </Box>
    </Box>
  );
};

export default CveDetail;
