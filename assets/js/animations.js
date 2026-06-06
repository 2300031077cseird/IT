(function () {
  "use strict";

  const revealSelector = [
    ".section-head",
    ".section-title",
    ".section-lead",
    ".category-title",
    ".content-panel",
    ".enterprise-card",
    ".service-card",
    ".mini-card",
    ".industry-card",
    ".solution-card",
    ".story-card",
    ".blog-card",
    ".job-card",
    ".why-card",
    ".feature-item",
    ".timeline-item",
    ".case-detail",
    ".case-column",
    ".contact-item",
    ".metric-chip",
    ".stat-card",
    ".value-card"
  ].join(",");

  const mediaSelector = [
    ".image-stack img",
    ".feature-visual",
    ".story-image",
    ".industry-card",
    ".blog-card img",
    ".service-thumb",
    ".service-detail-visual",
    ".solution-card",
    ".case-image"
  ].join(",");

  const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const all = (selector) => Array.from(document.querySelectorAll(selector));

  const unique = (items) => {
    const seen = new Set();
    return items.filter((item) => {
      if (!item || seen.has(item)) return false;
      seen.add(item);
      return true;
    });
  };

  const delayFor = (element, index) => {
    const aosDelay = Number(element.getAttribute("data-aos-delay"));
    if (Number.isFinite(aosDelay)) return Math.min(aosDelay, 360);
    return Math.min((index % 5) * 70, 280);
  };

  const ensureProgressBar = () => {
    let progress = document.querySelector(".scroll-progress");
    if (!progress) {
      progress = document.createElement("div");
      progress.className = "scroll-progress";
      document.body.appendChild(progress);
    }
    return progress;
  };

  const updateProgressBar = (progress) => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const value = scrollable > 0 ? window.scrollY / scrollable : 0;
    progress.style.transform = `scaleX(${Math.max(0, Math.min(value, 1))})`;
  };

  const revealElement = (element) => {
    element.classList.add("in-view", "aos-animate");
    if (element.matches(mediaSelector)) {
      element.classList.add("is-revealed");
    }
  };

  const releaseVisibleElements = () => {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    unique([...all("[data-aos]"), ...all(revealSelector)]).forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > viewportHeight * 0.96) return;

      if (window.gsap) {
        gsap.killTweensOf(element);
      }

      element.classList.add("aos-animate", "in-view");
      element.style.opacity = "1";
      element.style.visibility = "visible";
      element.style.removeProperty("transform");
      element.style.removeProperty("clip-path");
    });
  };

  const scheduleVisibleRelease = () => {
    window.setTimeout(releaseVisibleElements, 1600);
    window.setTimeout(releaseVisibleElements, 3200);

    let releaseTimer;
    window.addEventListener(
      "scroll",
      () => {
        window.clearTimeout(releaseTimer);
        releaseTimer = window.setTimeout(releaseVisibleElements, 900);
      },
      { passive: true }
    );
  };

  const revealImmediately = () => {
    document.body.classList.add("svt-reduced-motion");
    unique([...all("[data-aos]"), ...all(revealSelector), ...all(mediaSelector)]).forEach((element) => {
      revealElement(element);
      element.classList.remove("svt-reveal");
    });
  };

  const initAos = () => {
    if (!window.AOS) return;
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 80
    });
  };

  const initKineticButtons = () => {
    all(".btn-enterprise, .btn-ghost, .link-arrow").forEach((button) => {
      button.classList.add("kinetic-cta");
      button.addEventListener("pointermove", (event) => {
        const rect = button.getBoundingClientRect();
        button.style.setProperty("--cta-x", `${event.clientX - rect.left}px`);
        button.style.setProperty("--cta-y", `${event.clientY - rect.top}px`);
      });
    });
  };

  const initLocalScrollAnimations = () => {
    document.body.classList.add("svt-local-animations");

    const progress = ensureProgressBar();
    const handleProgress = () => updateProgressBar(progress);
    handleProgress();
    window.addEventListener("scroll", handleProgress, { passive: true });
    window.addEventListener("resize", handleProgress);

    all(".section, .stats-band, .cta-band").forEach((section) => {
      section.classList.add("section-animated");
    });

    const revealItems = unique([...all("[data-aos]"), ...all(revealSelector), ...all(mediaSelector)]);
    revealItems.forEach((element, index) => {
      element.classList.add("svt-reveal");
      element.style.setProperty("--reveal-delay", `${delayFor(element, index)}ms`);
      if (element.matches(mediaSelector)) {
        element.classList.add("svt-media-reveal");
      }
    });

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((element) => {
        revealElement(element);
        element.classList.remove("svt-reveal");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target;
          revealElement(element);
          if (element.matches(".section, .stats-band, .cta-band")) {
            element.classList.add("is-in-view");
          }
          observer.unobserve(element);

          const delay = Number.parseFloat(getComputedStyle(element).getPropertyValue("--reveal-delay")) || 0;
          window.setTimeout(() => {
            element.classList.remove("svt-reveal", "in-view");
          }, delay + 1050);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );

    unique([...revealItems, ...all(".section, .stats-band, .cta-band")]).forEach((element) => {
      observer.observe(element);
    });
  };

  const initGsapAnimations = () => {
    if (!window.gsap || !window.ScrollTrigger) return false;

    gsap.registerPlugin(ScrollTrigger);
    document.body.classList.add("svt-gsap-animations");

    all("[data-aos]").forEach((element) => {
      element.classList.add("aos-animate");
    });

    all(".section, .stats-band, .cta-band").forEach((section) => {
      section.classList.add("section-animated");
      ScrollTrigger.create({
        trigger: section,
        start: "top 78%",
        once: true,
        onEnter: () => section.classList.add("is-in-view")
      });
    });

    const progress = ensureProgressBar();
    gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
    gsap.to(progress, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2
      }
    });

    gsap.from(".site-header", {
      y: -22,
      autoAlpha: 0,
      duration: 0.7,
      ease: "power2.out",
      clearProps: "transform,opacity,visibility"
    });

    gsap.from(".hero .eyebrow, .hero h1, .hero p, .hero-actions, .page-hero .breadcrumb-line, .page-hero .eyebrow, .page-hero h1, .page-hero p", {
      y: 44,
      autoAlpha: 0,
      duration: 1,
      stagger: 0.12,
      ease: "power3.out",
      delay: 0.12,
      clearProps: "transform,opacity,visibility"
    });

    gsap.from(".hero-metric", {
      y: 32,
      autoAlpha: 0,
      duration: 0.85,
      stagger: 0.08,
      ease: "power3.out",
      delay: 0.4,
      clearProps: "transform,opacity,visibility"
    });

    gsap.utils.toArray(".section-title, .category-title h2, .content-panel h2").forEach((title) => {
      gsap.from(title, {
        y: 48,
        autoAlpha: 0,
        clipPath: "inset(0 0 100% 0)",
        duration: 0.95,
        ease: "power3.out",
        clearProps: "transform,opacity,visibility,clipPath",
        scrollTrigger: {
          trigger: title,
          start: "top 86%",
          once: true
        }
      });
    });

    gsap.utils.toArray(".section-lead, .feature-item, .timeline-item, .case-column, .contact-item, .metric-chip, .value-card").forEach((item, index) => {
      gsap.from(item, {
        y: 34,
        autoAlpha: 0,
        duration: 0.78,
        delay: (index % 3) * 0.04,
        ease: "power2.out",
        clearProps: "transform,opacity,visibility",
        scrollTrigger: {
          trigger: item,
          start: "top 88%",
          once: true
        }
      });
    });

    gsap.utils.toArray("[data-aos]").forEach((item, index) => {
      if (item.matches(".service-card, .mini-card, .enterprise-card, .solution-card, .story-card, .blog-card, .job-card, .why-card, .case-detail")) {
        return;
      }

      const aosType = item.getAttribute("data-aos") || "";
      const fromLeft = aosType.includes("right");
      const fromRight = aosType.includes("left");
      const isZoom = aosType.includes("zoom");

      gsap.from(item, {
        x: fromLeft ? -38 : fromRight ? 38 : 0,
        y: fromLeft || fromRight ? 0 : 34,
        scale: isZoom ? 0.96 : 1,
        autoAlpha: 0,
        duration: 0.88,
        delay: (index % 3) * 0.04,
        ease: "power3.out",
        clearProps: "transform,opacity,visibility",
        onStart: () => item.classList.add("aos-animate"),
        onComplete: () => item.classList.add("aos-animate"),
        scrollTrigger: {
          trigger: item,
          start: "top 88%",
          once: true
        }
      });
    });

    ScrollTrigger.batch(".service-card, .mini-card, .enterprise-card, .solution-card, .story-card, .blog-card, .job-card, .why-card, .case-detail", {
      interval: 0.08,
      batchMax: 4,
      start: "top 88%",
      once: true,
      onEnter: (batch) => {
        gsap.from(batch, {
          y: 58,
          autoAlpha: 0,
          rotateX: 5,
          duration: 0.95,
          stagger: 0.09,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility"
        });
      }
    });

    gsap.utils.toArray(mediaSelector).forEach((media) => {
      media.classList.add("svt-media-reveal");
      ScrollTrigger.create({
        trigger: media,
        start: "top 86%",
        once: true,
        onEnter: () => media.classList.add("is-revealed")
      });

      gsap.from(media, {
        y: 44,
        scale: 1.04,
        autoAlpha: 0,
        duration: 1.05,
        ease: "power3.out",
        clearProps: "transform,opacity,visibility",
        scrollTrigger: {
          trigger: media,
          start: "top 90%",
          once: true
        }
      });
    });

    gsap.utils.toArray(".parallax-layer, .feature-visual").forEach((layer) => {
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

    gsap.utils.toArray(".hero, .page-hero, .cta-band").forEach((section) => {
      gsap.to(section, {
        backgroundPosition: "50% 62%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    });

    window.setTimeout(() => ScrollTrigger.refresh(), 450);
    scheduleVisibleRelease();
    return true;
  };

  window.addEventListener("DOMContentLoaded", () => {
    initKineticButtons();

    if (prefersReducedMotion()) {
      revealImmediately();
      return;
    }

    initAos();

    if (!initGsapAnimations()) {
      initLocalScrollAnimations();
    }
  });
})();
