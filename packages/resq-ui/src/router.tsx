import { useRoutes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import Homepage from "./pages/Homepage";
import ReportIncidentPage from "./pages/ReportIncidentPage";
import SoSPage from "./pages/SoSPage";
import ReportPage from "./pages/ReportPage";
import Incident from "./pages/admin/Incident";
import Sos from "./pages/admin/Sos";
import Report from "./pages/admin/Report";
import AdminSignin from "./pages/admin/AdminSignin"
import DashboardPage from "./pages/admin/DashboardPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import OverView from "./pages/admin/OverviewPage";
export default function Router() {
  return useRoutes([
    {
      path: "/signin",
      element: <SignInPage isSignUp={false} />,
    },
    {
      path: "/signup",
      element: <SignInPage isSignUp={true} />,
    },
    {
      path: "/sos",
      element: <SoSPage />,
    },
    {
      path: "/generate-report",
      element: <ReportPage />,
    },
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/report",
      element: <ReportIncidentPage />,
    },

    {
      path:"/signin-admin",
      element: <AdminSignin/>
    }, 
    {
      path: "/dashboard",
      element: <ProtectedRoutes><DashboardPage/></ProtectedRoutes>,
      children:[
        {
          path:'incident',
          element:<Incident/>
        },
        {
          path:"sos-admin",
          element:<Sos/>
        },

        {
          path:"report-admin",
          element: <Report/>
        },
        {
          path:"overview",
          element:<OverView/>
        }

       


      ]
    },
  ]);
}
