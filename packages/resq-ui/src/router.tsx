import { useRoutes } from "react-router-dom"
import SignInPage from "./pages/SignInPage"
import Homepage from "./pages/Homepage"
import ReportIncidentPage from "./pages/ReportIncidentPage"
import SoSPage from "./pages/SoSPage"
import ReportPage from "./pages/ReportPage"


export default function Router() {
  return useRoutes([
    {
      path: "/signin",
      element: <SignInPage isSignUp={false} />
    },
    {
      path: "/signup",
      element: <SignInPage isSignUp={true} />
    },
    {
      path: "/sos",
      element: <SoSPage />
    },
    {
      path: "/generate-report",
      element: <ReportPage />
    },
    {
      path: "",
      element: <Homepage />
    },
    {
      path: "/report",
      element: <ReportIncidentPage />
    }
  ])
}
