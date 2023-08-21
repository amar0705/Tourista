import { Alert } from "@mui/material";

export const alert = {
  error: (value) => {
    console.log(value);
    return <Alert severity="error">{value ?? "alert"}</Alert>;
  },
};
