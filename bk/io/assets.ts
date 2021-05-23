import LRU from "lru-cache";

const URL = "http://localhost:8414";

const cache = new LRU({
  max: 500,
  maxAge: 1000 * 60 * 60,
});

const getFromCache = async (
  key: string,
  getter: (key: string) => Promise<any>
) => {
  if (cache.has(key)) {
    return cache.get(key);
  }
  const value = await getter(key);
  cache.set(key, value);
  return value;
};

const fetchJsonFromUrl = async (url: string) => (await fetch(url)).json();

const fetchJson = async (path: string) =>
  getFromCache(`${URL}/${path}`, fetchJsonFromUrl);

const fetchWhoIs = async (ip: string) =>
  getFromCache(`http://ip-api.com/json/${ip}`, fetchJsonFromUrl);

const fetchScore = async (domain: string) =>
  getFromCache(
    `https://platform-api.securityscorecard.io/companies/${domain}?access_token=5DB4f6hEROoQKQKsATNI0yRCULSF`,
    fetchJsonFromUrl
  );

export const fetchDetailByIp = async (
  ip: string
): Promise<AssetDetailPayload> => {
  const [scanInfo, whoIs] = await Promise.all([
    fetchJson(`assets/${ip}`),
    fetchWhoIs(ip),
  ]);

  return { ip, scanInfo, whoIs };
};

export const fetchSummaryByIpRange = async (
  range: string
): Promise<AssetsSummaryPayload> => {
  const [openPorts, products, cves] = await Promise.all([
    fetchJson(`assets/${range}/open-ports`),
    fetchJson(`assets/${range}/products`),
    fetchJson(`assets/${range}/cves`),
  ]);
  const score = /[a-zA-Z]/u.test(range)
    ? ((await fetchScore(range)) as { score: number; grade_url: string })
    : undefined;
  return {
    range,
    openPorts,
    products,
    cves,
    score: score && { value: score.score, gradeImg: score.grade_url },
  };
};

export const fetchListByRangeAndPort = (
  range: string,
  port: number
): Promise<AssetListPayload> => fetchJson(`assets/${range}/open-ports/${port}`);

export const fetchListByRangeAndCve = (
  range: string,
  cve: string
): Promise<AssetListPayload> => fetchJson(`assets/${range}/cves/${cve}`);

export const fetchListByRangeAndProduct = (
  range: string,
  product: string,
  version: string
): Promise<AssetListPayload> =>
  fetchJson(`assets/${range}/products/${product}/${version}`);

export const fetchCveDetail = async (
  cve: string
): Promise<CveDetailPayload> => {
  const { summary, events } = await fetchJson(`cves/${cve}`);

  return { cve, summary, events };
};

export type CveDetailPayload = {
  cve: string;
  summary: string;
  events: {
    id: string;
    timestamp: number;
    category: string;
    type: string;
    info: string;
  }[];
};

export type AssetsSummaryPayload = {
  range: string;
  openPorts: { entries: { port: number; count: number }[] };
  products: {
    entries: { product: string; version: string; count: number }[];
  };
  cves: {
    entries: { cve: string; count: number }[];
  };
  score?: {
    value: number;
    gradeImg: string;
  };
};

export type AssetDetailPayload = {
  ip: string;
  scanInfo: {
    domains: string[];
    ports: {
      id: string;
      protocol: string;
      service: {
        name: string;
        product?: { name: string; version: string };
      };
      vulnerabilities: string[];
    }[];
    reputation: {
      events: {
        id: string;
        timestamp: number;
        category: string;
        type: string;
        info: string;
      }[];
    };
  };
  whoIs: {
    country: string;
    countryCode: string;
    regionName: string;
    city: string;
    lat: number;
    lon: number;
    timezone: string;
    org: string;
  };
};

export type AssetListPayload = {
  entries: { ip: string }[];
};
