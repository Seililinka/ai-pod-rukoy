(() => {
  'use strict';

  const allowedPaths = new Set([
    '/ai-pod-rukoy',
    '/ai-pod-rukoy/',
    '/ai-pod-rukoy/index.html'
  ]);
  if (window.location.origin !== 'https://seililinka.github.io' ||
      !allowedPaths.has(window.location.pathname)) return;

  const container = document.getElementById('book-visits');
  const image = document.getElementById('book-visits-image');
  const link = document.getElementById('book-visits-link');
  const status = document.getElementById('book-visits-status');
  if (!container || !image || !link || !status || container.dataset.initialized) return;

  container.dataset.initialized = 'true';
  container.hidden = false;

  const unavailable = () => {
    status.textContent = 'Счётчик временно недоступен';
    status.hidden = false;
    link.hidden = true;
  };
  const timer = window.setTimeout(unavailable, 12000);
  image.addEventListener('load', () => {
    window.clearTimeout(timer);
    status.hidden = true;
    link.hidden = false;
  }, { once: true });
  image.addEventListener('error', () => {
    window.clearTimeout(timer);
    unavailable();
  }, { once: true });

  // One fixed request per page load. Searches and category changes reuse the image.
  // Page query parameters, prompt text and the referrer are not sent to Hits.sh.
  image.src = 'https://hits.sh/seililinka.github.io/ai-pod-rukoy.svg?' +
    new URLSearchParams({
      label: 'Просмотров',
      color: '315b50',
      labelColor: '53685e',
      style: 'flat'
    });
})();
