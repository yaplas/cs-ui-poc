import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const Layout = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element => (
  <Box>
    <Box p={2}>
      <Typography variant="h5" component="div">
        {title}
      </Typography>
    </Box>
    <Box>{children}</Box>
  </Box>
);

export default Layout;
