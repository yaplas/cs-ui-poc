import React from "react";
import AssetDetail from "../AssetDetail";
import AssetsSummary from "../AssetsSummary";
import { Switch, Route } from "react-router-dom";
import CveList from "../CveList";
import CveDetail from "../CveDetail";

const ScanResult = (): JSX.Element => (
  <Switch>
    <Route path="/detail/:ip/port/:port/cve-list/:list">
      <CveList />
    </Route>
    <Route path="/detail/:ip">
      <AssetDetail />
    </Route>
    <Route path="/summary/:range">
      <AssetsSummary />
    </Route>
    <Route path="/cve-detail/:cve">
      <CveDetail />
    </Route>
  </Switch>
);

export default ScanResult;
