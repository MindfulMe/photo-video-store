console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: "Welcome!",
    icon: "https://img.grouponcdn.com/deal/3BtdLujqL5HXX716XdTGx9W16t9y/3B-2048x1229/v1/c700x420.jpg"
  });
});
