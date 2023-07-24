import { createBrowserRouter } from "react-router-dom";
import AllProperties from "./components/AllProperties";
import HomeLayout from "./pages/Home";
import HostDashboard from "./pages/hostDashboard";
import HostLogin from "./pages/hostLogin";
import HostPropertyDetails from "./pages/hostPropertyDetails";
import HostRegister from "./pages/hostRegister";

export const router = createBrowserRouter([
  {
    path: "/host/register",
    element: <HostRegister userType={"HOST"} />,
  },
  {
    path: "/guest/register",
    element: <HostRegister userType={"GUEST"} />,
  },
  {
    path: "/host/login",
    element: <HostLogin userType={"HOST"} />,
  },
  {
    path: "/guest/login",
    element: <HostLogin userType={"GUEST"} />,
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
    path: "/all-properties",
    element: (
      <HomeLayout>
        <AllProperties />
      </HomeLayout>
    ),
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
