import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { createContext, useContext, useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";

const SnackbarContext = createContext();

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [alertProps, setAlertProps] = useState({ type: "info", message: "" });

  const closeSnackbar = () => {
    setOpen(false);
  };
  const showAlert = (type, message) => {
    setAlertProps({ type, message });
    setOpen(true);
  };

  return (
    <>
      <SnackbarContext.Provider value={{ showAlert, closeSnackbar }}>
        {children}
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={closeSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={closeSnackbar}
            severity={alertProps?.type ?? "success"}
            sx={{ width: "100%" }}
          >
            {alertProps?.message ?? "message"}
          </Alert>
        </Snackbar>
      </SnackbarContext.Provider>
    </>
  );
};

function App() {
  return (
    <>
      <SnackbarProvider>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </>
  );
}

export default App;
