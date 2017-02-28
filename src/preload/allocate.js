const { ipcRenderer } = require('electron');

let loaded = false;

const hider = setInterval(() => {
  if (loaded) {
    clearInterval(hider);
  } else if (typeof document === 'object' && document.body && document.body.style) {
    document.body.style.opacity = 0;
    document.body.style.transition = 'opacity 0.5s linear';
    clearInterval(hider);
  }
}, 1);

window.addEventListener('load', () => {
  loaded = true;
  document.body.style.opacity = 1;
  window.ipcRenderer = ipcRenderer;
  if (window.data && window.data.student) {
    ipcRenderer.send('allocateData', window.data);
  }
});
