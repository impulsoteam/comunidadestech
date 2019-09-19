if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/static/service-worker.js')
    .then(function(reg) {
      console.log('Service worker Registered');
    })
    .catch(function(err) {
      console.log('erro', err);
    });
}
