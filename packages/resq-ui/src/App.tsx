import { registerServiceWorker, subscribe } from "./helpers/registerSw";
import "./axios/axios";

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
      <h1>HELLO, RESQ!</h1>
      <button onClick={notification}>Turn On Notification?</button>
    </>
  )
}

export default App
