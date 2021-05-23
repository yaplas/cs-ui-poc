import React from "react";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { DataGrid } from "@material-ui/data-grid";
import { uniq, trim } from "ramda";
import { AssetDetailPayload } from "../../io/assets";
import { Link, useParams } from "react-router-dom";

const OpenPorts = ({ scanInfo }: AssetDetailPayload): JSX.Element => {
  const params = useParams<{ ip: string }>();

  return (
    <Box p={2}>
      <Box p={2}>
        <Typography variant="h5">Open Ports, Products and CVE's</Typography>
      </Box>
      <DataGrid
        autoHeight
        hideFooter
        rows={scanInfo.ports.map((port) => ({
          ...port,
          serviceName: port.service.name,
          productName: port.service.product?.name,
          productVersion: port.service.product?.version,
          vulnerabilities: uniq(
            port.vulnerabilities.flatMap((vul) =>
              Array.from(vul.matchAll(/CVE-\d+-\d+/g))
                .map(([match]) => match)
                .map(trim)
            )
          ),
        }))}
        columns={[
          { field: "id", headerName: "Port" },
          { field: "serviceName", headerName: "Service", width: 120 },
          { field: "productName", headerName: "Product", width: 220 },
          { field: "productVersion", headerName: "Version", width: 220 },
          {
            field: "vulnerabilities",
            headerName: "Vulnerabilities",
            flex: 900,
            renderCell: ({ value, id }) => {
              const cves = value as string[];
              return (
                <Box>
                  {cves.slice(0, 5).map((cve) => (
                    <Link
                      key={cve}
                      to={`/cve-detail/${cve}`}
                      style={{ marginRight: "10px" }}
                    >
                      {cve}
                    </Link>
                  ))}
                  {cves.length > 5 && (
                    <Link
                      to={`/detail/${params.ip}/port/${id}/cve-list/${btoa(
                        `${cves.join(",")}`
                      )}`}
                    >
                      see more
                    </Link>
                  )}
                </Box>
              );
            },
          },
        ]}
      />
    </Box>
  );
};

export default OpenPorts;
