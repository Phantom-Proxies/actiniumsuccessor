const defaultSettings = {
  pageTitle: 'Cosmic Proxy',
  pageFavicon: ''
};

// Main tab switching
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// Sub-tab switching for settings
document.querySelectorAll('.sub-tab').forEach(subTab => {
  subTab.addEventListener('click', () => {
    document.querySelectorAll('.sub-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.sub-tab-content').forEach(c => c.classList.remove('active'));
    subTab.classList.add('active');
    document.getElementById(subTab.dataset.subTab).classList.add('active');
  });
});

function updatePageMetadata() {
  const title = document.getElementById('page-title').value || defaultSettings.pageTitle;
  const favicon = document.getElementById('page-favicon').value || defaultSettings.pageFavicon;
  document.title = title;
  let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = favicon || '/favicon.ico';
  document.head.appendChild(link);
  localStorage.setItem('pageTitle', title);
  localStorage.setItem('pageFavicon', favicon);
}

function loadSettings() {
  const title = localStorage.getItem('pageTitle') || defaultSettings.pageTitle;
  const favicon = localStorage.getItem('pageF moving down to ensure proper initialization.
}

document.getElementById('page-title').addEventListener('input', updatePageMetadata);
document.getElementById('page-favicon').addEventListener('input', updatePageMetadata);

function createCloakHTML(title, favicon, url) {
  const faviconTag = favicon ? `<link rel="shortcut icon" href="${favicon}">` : '';
  return `
    <!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title>${faviconTag}
    <style>html,body{height:100%;margin:0;padding:0;overflow:hidden;background:#000;}iframe{width:100%;height:100%;border:none;}</style></head>
    <body><iframe src="${url}" sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation allow-popups-to-escape-sandbox allow-downloads"></iframe></body></html>`;
}

function openCloak(cloakType) {
  const title = document.getElementById('page-title').value || defaultSettings.pageTitle;
  const favicon = document.getElementById('page-favicon').value || '';
  const cloakHTML = createCloakHTML(title, favicon, window.location.href);
  let newWindow;
  if (cloakType === 'ab') {
    newWindow = window.open('about:blank', '_blank');
    if (newWindow) {
      newWindow.document.write(cloakHTML);
      newWindow.document.close();
    }
  } else if (cloakType === 'blob') {
    try {
      const blob = new Blob([cloakHTML], { type: 'text/html' });
      newWindow = window.open(URL.createObjectURL(blob), '_blank');
    } catch (e) {
      console.error("Blob cloak failed:", e);
      alert("Blob cloak failed. This browser might not support it.");
      return;
    }
  } else if (cloakType === 'iframe') {
    document.open();
    document.write(cloakHTML);
    document.close();
    return;
  }
  if (newWindow) {
    try {
      window.location.replace('https://www.google.com');
    } catch (e) {
      window.location.replace('https://www.google.com');
    }
  }
}

document.getElementById('ab-cloak').addEventListener('click', () => openCloak('ab'));
document.getElementById('blob-cloak').addEventListener('click', () => openCloak('blob'));
document.getElementById('iframe-cloak').addEventListener('click', () => openCloak('iframe'));

const appsData = [
  { name: 'Discord', url: 'https://discord.com/app' },
  { name: 'Spotify', url: 'https://open.spotify.com' },
  { name: 'VS Code Web', url: 'https://vscode.dev' },
  { name: 'Photopea', url: 'https://www.photopea.com/' },
  { name: 'Google Drive', url: 'https://drive.google.com/' },
];

const gamesData = [
  { name: '2048', url: 'https://play2048.co/' },
  { name: 'Slope', url: 'https://slopegame.io/' },
  { name: 'Cookie Clicker', url: 'https://orteil.dashnet.org/cookieclicker/' },
  { name: 'TETR.IO', url: 'https://tetr.io/' },
  { name: 'Chess.com', url: 'https://www.chess.com/play/computer' }
];

function populateLinkGrid(gridId, data) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = '';
  data.forEach(item => {
    const link = document.createElement('a');
    link.href = `/proxy?url=${encodeURIComponent(item.url)}`;
    link.classList.add('app-game-link');
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = item.name;
    grid.appendChild(link);
  });
}

populateLinkGrid('apps-grid', appsData);
populateLinkGrid('games-grid', gamesData);
loadSettings();