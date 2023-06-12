import { resqApi } from "../axios/axios";

async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    let url = "http://localhost:5173/serviceworker.js";
    const reg = await navigator.serviceWorker.register(url, { scope: '/' });
    console.log('service config is', reg);
    return reg;
  }

  throw Error('Service Worker not supported.')
}

async function subscribe(serviceWorkerReg: any) {
  try {
    let subscription = await serviceWorkerReg.pushManager.getSubscription();
    if (subscription) {
      return;
    }
    if (subscription === null) {
      subscription = await serviceWorkerReg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'BD1--5QyCFhvTd0ZrJZ-85zd17GniSNrzSo6rbgy0BTpEg_Dnel-2aqX4OF_aDlqAh4BuaB0DbG42g0xGyh77AU',
      });
    }
    await resqApi.post('/subscription', subscription);
  } catch (e) {
    console.log(e);
  }
}

export { registerServiceWorker, subscribe }; 
