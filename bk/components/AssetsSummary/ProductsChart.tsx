import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import Box from "@material-ui/core/Box";
import { Link, useHistory, useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { Typography } from "@material-ui/core";

const ProductsChart = ({ limit }: { limit?: number }): JSX.Element => {
  const history = useHistory();
  const params = useParams<{ range: string }>();
  const products = useAppSelector(
    (state) => state.assets.summary.data?.products
  );
  const barClickHandler = ({
    product,
    version,
  }: {
    product: string;
    version: string;
  }) =>
    history.push(
      `/summary/${params.range}/products/${encodeURIComponent(product)}/${
        encodeURIComponent(version) || "-"
      }/assets`
    );

  if (!products || products.entries.length === 0) {
    return <div />;
  }

  return (
    <Box>
      <ResponsiveContainer
        width={"100%"}
        height={100 * (limit || products.entries.length)}
      >
        <BarChart
          data={products.entries
            .slice()
            .sort((a, b) => (a.count < b.count ? 1 : -1))
            .slice(0, limit)
            .map(({ product, version, count }) => ({
              productAndVersion: `${product} ${version}`,
              product,
              version,
              count,
            }))}
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
            dataKey="productAndVersion"
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

      {limit && products.entries.length > limit && (
        <Box p={2}>
          <Link to={`/summary/${params.range}/products`}>see more</Link>
        </Box>
      )}
    </Box>
  );
};

export default ProductsChart;
