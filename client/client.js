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

if(registration.pushManager){
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
else{
  var button = document.getElementsByTagName("button");
button.onclick = function() {
    // Ensure that the user can receive Safari Push Notifications.
    if ('safari' in window && 'pushNotification' in window.safari) {
        var permissionData = window.safari.pushNotification.permission('web.com.herokuapp.push-noti-test');
        checkRemotePermission(permissionData);
    }
};

var checkRemotePermission = function (permissionData) {
    if (permissionData.permission === 'default') {
        // This is a new web service URL and its validity is unknown.
        window.safari.pushNotification.requestPermission(
          'https://push-noti-test.herokuapp.com/', // The web service URL.
          // 'https://domain.example.com', // The web service URL.
          'web.com.herokuapp.push-noti-test',     // The Website Push ID.
            {}, // Data that you choose to send to your server to help you identify the user.
            checkRemotePermission         // The callback function.
        );
    }
    else if (permissionData.permission === 'denied') {
        // The user said no.
    }
    else if (permissionData.permission === 'granted') {
        // The web service URL is a valid push provider, and the user said yes.
        // permissionData.deviceToken is now available to use.
    }
};


}
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
