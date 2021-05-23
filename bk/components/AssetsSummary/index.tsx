import React, { useEffect } from "react";
import Layout from "./Layout";
import OpenPortsChart from "./OpenPortsChart";
import ProductsChart from "./ProductsChart";
import { Switch, Route, useParams } from "react-router-dom";
import FullChartLayout from "./FullChartLayout";
import AssetList from "./AssetList";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchAssetsSummaryByIpRange } from "../../redux/slices/assets";
import Loading from "../Loading";
import CvesChart from "./CvesChart";

const AssetsSummary = (): JSX.Element => {
  const params = useParams<{ range: string }>();
  const dispatch = useAppDispatch();
  const summary = useAppSelector((state) => state.assets.summary);
  useEffect(() => {
    dispatch(fetchAssetsSummaryByIpRange(params.range));
  }, [params.range]);

  if (!summary.data) {
    return <Loading />;
  }

  return (
    <Switch>
      <Route path="/summary/:range/open-ports/:port/assets">
        <AssetList />
      </Route>
      <Route path="/summary/:range/products/:product/:version/assets">
        <AssetList />
      </Route>
      <Route path="/summary/:range/cves/:cve/assets">
        <AssetList />
      </Route>
      <Route path="/summary/:range/open-ports">
        <FullChartLayout title="Open Ports">
          <OpenPortsChart />
        </FullChartLayout>
      </Route>
      <Route path="/summary/:range/products">
        <FullChartLayout title="Products">
          <ProductsChart />
        </FullChartLayout>
      </Route>
      <Route path="/summary/:range/cves">
        <FullChartLayout title="CVE's">
          <CvesChart />
        </FullChartLayout>
      </Route>
      <Route path="/summary/:range">
        <Layout
          title={params.range}
          score={summary.data?.score?.value}
          gradeImg={summary.data?.score?.gradeImg}
        >
          <OpenPortsChart limit={5} />
          <ProductsChart limit={5} />
          <CvesChart limit={5} />
        </Layout>
      </Route>
    </Switch>
  );
};

export default AssetsSummary;
