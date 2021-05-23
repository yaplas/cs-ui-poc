import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
import WhoIs from "./WhoIs";
import OpenPorts from "./OpenPorts";
import Reputation from "./Reputation";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useParams } from "react-router-dom";
import { fetchAssetDetailByIp } from "../../redux/slices/assets";
import Loading from "../Loading";

const Asset = (): JSX.Element => {
  const detail = useAppSelector((state) => state.assets.detail);
  const params = useParams<{ ip: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAssetDetailByIp(params.ip));
  }, [params.ip]);

  if (!detail.data) {
    return <Loading />;
  }

  return (
    <Box p={2}>
      <WhoIs {...detail.data} />
      <OpenPorts {...detail.data} />
      <Reputation {...detail.data} />
    </Box>
  );
};

export default Asset;
