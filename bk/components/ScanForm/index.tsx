import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Layout from "./Layout";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";

const noIp = /[a-zA-z]/u;

const ScanForm = (): JSX.Element => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: { search: "" },
    onSubmit: ({ search }, { setSubmitting }) => {
      setSubmitting(false);
      history.push(
        noIp.test(search) || search.includes("-")
          ? `/summary/${search}`
          : `/detail/${search}`
      );
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Layout>
        <TextField
          name="search"
          id="search"
          label="ip or ip range"
          onChange={formik.handleChange}
          value={formik.values.search}
          fullWidth
        />

        <Button
          variant="contained"
          type="submit"
          disabled={formik.isSubmitting}
        >
          Scan
        </Button>
      </Layout>
    </form>
  );
};

export default ScanForm;
