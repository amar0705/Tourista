import { createBrowserRouter } from "react-router-dom";
import HostDashboard from "./pages/hostDashboard";
import HostLogin from "./pages/hostLogin";
import HostPropertyDetails from "./pages/hostPropertyDetails";
import HostRegister from "./pages/hostRegister";

export const router = createBrowserRouter([
  {
    path: "/host/register",
    element: <HostRegister />,
  },
  {
    path: "/host/login",
    element: <HostLogin />,
  },
  {
    path: "/host/dashboard",
    element: <HostDashboard />,
  },
  {
    path: "/host/properties",
    element: <HostDashboard />,
  },
  {
    path: "/host/property-details",
    element: (
      <HostDashboard>
        <HostPropertyDetails />
      </HostDashboard>
    ),
  },
]);
