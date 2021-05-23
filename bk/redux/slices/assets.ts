import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchDetailByIp,
  fetchSummaryByIpRange,
  fetchListByRangeAndPort,
  fetchListByRangeAndProduct,
  fetchCveDetail,
  AssetDetailPayload,
  AssetsSummaryPayload,
  AssetListPayload,
  CveDetailPayload,
  fetchListByRangeAndCve,
} from "../../io/assets";

export const fetchAssetDetailByIp = createAsyncThunk(
  "assets/fetchDetailByIp",
  (ip: string) => fetchDetailByIp(ip)
);

export const fetchAssetsSummaryByIpRange = createAsyncThunk(
  "assets/fetchSummaryByIpRange",
  (range: string) => fetchSummaryByIpRange(range)
);

export const fetchAssetListByRangeAndPort = createAsyncThunk(
  "assets/fetchListByRangeAndPort",
  ({ range, port }: { range: string; port: number }) =>
    fetchListByRangeAndPort(range, port)
);

export const fetchAssetListByRangeAndProduct = createAsyncThunk(
  "assets/fetchListByRangeAndProduct",
  ({
    range,
    product,
    version,
  }: {
    range: string;
    product: string;
    version: string;
  }) => fetchListByRangeAndProduct(range, product, version)
);

export const fetchAssetListByRangeAndCve = createAsyncThunk(
  "assets/fetchListByRangeAndCve",
  ({ range, cve }: { range: string; cve: string }) => fetchListByRangeAndCve(range, cve)
);

export const fetchCveDetailByCveId = createAsyncThunk(
  "assets/fetchCveDetailByCveId",
  (cve: string) => fetchCveDetail(cve)
);

const assetsSlice = createSlice({
  name: "assets",
  initialState: {
    detail: {},
    summary: {},
    list: {},
    cve: {
      detail: {},
    },
  } as {
    detail: {
      data?: AssetDetailPayload;
      unavailable?: boolean;
    };
    summary: {
      data?: AssetsSummaryPayload;
      unavailable?: boolean;
    };
    list: {
      data?: AssetListPayload;
      unavailable?: boolean;
    };
    cve: {
      detail: {
        data?: CveDetailPayload;
        unavailable?: boolean;
      };
    };
  },
  reducers: {},
  extraReducers: {
    [fetchAssetDetailByIp.fulfilled.toString()]: (
      state,
      action: PayloadAction<AssetDetailPayload>
    ) => {
      state.detail = { data: action.payload };
    },
    [fetchAssetDetailByIp.pending.toString()]: (state) => {
      state.detail = {};
    },
    [fetchAssetsSummaryByIpRange.fulfilled.toString()]: (
      state,
      action: PayloadAction<AssetsSummaryPayload>
    ) => {
      state.summary = { data: action.payload };
    },
    [fetchAssetsSummaryByIpRange.pending.toString()]: (state) => {
      state.summary = {};
    },
    [fetchAssetListByRangeAndPort.fulfilled.toString()]: (
      state,
      action: PayloadAction<AssetListPayload>
    ) => {
      state.list = { data: action.payload };
    },
    [fetchAssetListByRangeAndPort.pending.toString()]: (state) => {
      state.list = {};
    },
    [fetchAssetListByRangeAndProduct.fulfilled.toString()]: (
      state,
      action: PayloadAction<AssetListPayload>
    ) => {
      state.list = { data: action.payload };
    },
    [fetchAssetListByRangeAndProduct.pending.toString()]: (state) => {
      state.list = {};
    },
    [fetchAssetListByRangeAndCve.fulfilled.toString()]: (
      state,
      action: PayloadAction<AssetListPayload>
    ) => {
      state.list = { data: action.payload };
    },
    [fetchAssetListByRangeAndCve.pending.toString()]: (state) => {
      state.list = {};
    },
    [fetchCveDetailByCveId.fulfilled.toString()]: (
      state,
      action: PayloadAction<CveDetailPayload>
    ) => {
      state.cve.detail = { data: action.payload };
    },
    [fetchCveDetailByCveId.pending.toString()]: (state) => {
      state.cve.detail = {};
    },
  },
});

export default assetsSlice.reducer;
