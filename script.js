// Reflect the current section in the small navigation, without changing the URL.
const navigation = [...document.querySelectorAll('nav a[href^="#"]')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navigation.forEach(link => {
        const active = link.getAttribute('href') === '#' + entry.target.id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-5% 0px -65% 0px', threshold: 0 });
  document.querySelectorAll('section[id], .news-window[id]').forEach(section => observer.observe(section));
}

// Draw the second notebook figure once, when Research comes into view.
const notebookGraph = document.querySelector('.graph-notebook');
if (notebookGraph && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const drawingObserver = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      notebookGraph.classList.add('is-drawing');
      drawingObserver.disconnect();
    }
  }, { threshold: 0 });
  drawingObserver.observe(document.getElementById('research-title'));
  drawingObserver.observe(notebookGraph);
}
