import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Link, useHistory, useParams } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { useAppSelector } from "../../redux/hooks";

const OpenPortsChart = ({ limit }: { limit?: number }): JSX.Element => {
  const history = useHistory();
  const params = useParams<{ range: string }>();
  const openPorts = useAppSelector(
    (state) => state.assets.summary.data?.openPorts
  );
  const barClickHandler = ({ port }: { port: number }) =>
    history.push(`/summary/${params.range}/open-ports/${port}/assets`);

  if (!openPorts || openPorts.entries.length === 0) {
    return <div />;
  }

  return (
    <Box>
      <ResponsiveContainer
        width={"100%"}
        height={100 * (limit || openPorts.entries.length)}
      >
        <BarChart
          data={openPorts.entries
            .slice()
            .sort((a, b) => (a.count < b.count ? 1 : -1))
            .slice(0, limit)}
          margin={{
            top: 20,
            right: 80,
            left: 80,
            bottom: 5,
          }}
          layout="vertical"
        >
          <XAxis hide axisLine={false} type="number" />
          <YAxis
            yAxisId={0}
            dataKey="port"
            orientation="left"
            type="category"
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            yAxisId={1}
            dataKey="count"
            orientation="right"
            mirror
            type="category"
            axisLine={false}
            tickLine={false}
            tick={{
              transform: `translate(${50}, 0)`,
            }}
          />
          <Bar
            dataKey="count"
            name="Assets"
            fill="#8884d8"
            cursor="pointer"
            onClick={barClickHandler}
          />
        </BarChart>
      </ResponsiveContainer>
      {limit && openPorts.entries.length > limit && (
        <Box p={2}>
          <Link to={`/summary/${params.range}/open-ports`}>see more</Link>
        </Box>
      )}
    </Box>
  );
};

export default OpenPortsChart;
