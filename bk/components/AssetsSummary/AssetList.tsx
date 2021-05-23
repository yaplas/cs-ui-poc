import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchAssetListByRangeAndPort,
  fetchAssetListByRangeAndProduct,
  fetchAssetListByRangeAndCve,
} from "../../redux/slices/assets";
import Loading from "../Loading";
import Typography from "@material-ui/core/Typography";

const AssetList = (): JSX.Element => {
  const list = useAppSelector((state) => state.assets.list.data);
  const params = useParams<{
    range: string;
    port: string;
    product: string;
    version: string;
    cve: string;
  }>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (params.product) {
      dispatch(
        fetchAssetListByRangeAndProduct({
          range: params.range,
          product: params.product,
          version: params.version,
        })
      );
    } else if (params.cve) {
      dispatch(
        fetchAssetListByRangeAndCve({ range: params.range, cve: params.cve })
      );
    } else {
      dispatch(
        fetchAssetListByRangeAndPort({
          range: params.range,
          port: Number(params.port),
        })
      );
    }
  }, [params.range, params.port, params.product, params.version]);

  if (!list) {
    return <Loading />;
  }

  return (
    <Box p={2} display="flex" flexDirection="column">
      <Box p={1}>
        {params.port && !params.cve && (
          <Typography variant="h6">
            Assets from {params.range} with port {params.port} open
          </Typography>
        )}
        {params.product && (
          <Typography variant="h6">
            Assets from {params.range} with product {params.product}{" "}
            {params.version === "-" ? "" : `(${params.version})`}
          </Typography>
        )}
        {params.cve && (
          <Typography variant="h6">
            Assets from {params.range} with {params.cve} detected
          </Typography>
        )}
      </Box>
      {list.entries.map(({ ip }) => (
        <Box p={1} key={ip}>
          <Link to={{ pathname: `/detail/${ip}` }}>{ip}</Link>
        </Box>
      ))}
    </Box>
  );
};

export default AssetList;
