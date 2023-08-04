import { registerServiceWorker, subscribe } from "./helpers/registerSw";
import Router from "./router.tsx"
import Navbar from "./components/Navbar.tsx";
import "./axios.ts"

function App() {

  const notification = async () => {
    try {
      const serviceWorkerReg = await registerServiceWorker();
      await subscribe(serviceWorkerReg);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      {/* <h1>HELLO, RESQ!</h1> */}
      {/* <button onClick={notification}>Turn On Notification?</button> */}
      <Navbar />
      <Router />
    </>
  )
}

export default App
