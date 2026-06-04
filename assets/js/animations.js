(function () {
  "use strict";

  window.addEventListener("DOMContentLoaded", () => {
    if (window.AOS) {
      AOS.init({
        duration: 850,
        easing: "ease-out-cubic",
        once: true,
        offset: 80
      });
    }

    if (window.gsap) {
      if (window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
      }

      gsap.from(".site-header", { y: -18, opacity: 0, duration: 0.65, ease: "power2.out" });
      gsap.from(".hero .eyebrow, .hero h1, .hero p, .hero-actions", {
        y: 36,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.15
      });

      gsap.utils.toArray(".parallax-layer").forEach((layer) => {
        if (!window.ScrollTrigger) return;
        gsap.to(layer, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: layer,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }
  });
})();
