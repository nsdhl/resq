this.addEventListener('activate', function(event) {
  console.log("Service Worker Activated");
})


self.addEventListener('push', async (event) => {
  const message = await event.data.json();
  const { title, description, location } = message;
  const options = {
    body: description,
    // data: {
    //   dateOfArrival: Date.now(),
    //   primaryKey: '2'
    // },
    actions: [
      {
        action: "See in Map", title: title,
      },
    ]
  };
  event.waitUntil(
    self.registration.showNotification(title, options)
  )
});

