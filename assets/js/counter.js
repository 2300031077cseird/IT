(function () {
  "use strict";

  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;

  const animateCounter = (counter) => {
    const target = Number(counter.dataset.counter || 0);
    const suffix = counter.dataset.suffix || "";
    const duration = Number(counter.dataset.duration || 1600);
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries, io) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.35 }
  );

  counters.forEach((counter) => observer.observe(counter));
})();
