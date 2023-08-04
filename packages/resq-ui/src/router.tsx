import { useRoutes } from "react-router-dom"
import SignInPage from "./pages/SignInPage"
import Homepage from "./pages/Homepage"
import ReportIncidentPage from "./pages/ReportIncidentPage"


export default function Router() {
  return useRoutes([
    {
      path: "/signin",
      element: <SignInPage />
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
