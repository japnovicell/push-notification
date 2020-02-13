const publicVapidKey =
'BNC7KAmWT-9bGW2Glx-0nf8_ELDt27IDYAR9GRul8pFsd387kvG1ce11q8R4cUUI87e9mJp1qcOKdXLbVVDKP98';

// Check for service worker
if('serviceWorker' in navigator){
    send().catch(err => console.error(err));
}

// Register Serviceworker, Register Push, Send Push
async function send (){
    // Register Service WOrker
console.log('Registering service worker...');
const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/'
});
console.log('Service Worker Registered...');

//Register Push
console.log('Registering Push...');
const subscription = await register.pushManager.subscribe({
userVisibleOnly: true,
applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
});
console.log('Push Registered...');

  // Send Push Notification
  console.log("Sending Push...");
  document.getElementById("button").addEventListener('click', function (e) {
      push(subscription);
  });

console.log('Push Sent...');

}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

async function push(subscription) {
    console.log('hello');
    await fetch("/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
          "content-type": "application/json"
        }
      });
}
