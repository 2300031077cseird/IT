(function () {
  "use strict";

  const serviceImages = {
    "customer-support": ["Customer Experience", "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=900&q=80"],
    "technical-support": ["Technical Helpdesk", "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"],
    "voice-process": ["Voice Operations", "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80"],
    "non-voice-process": ["Digital Support", "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80"],
    "back-office-operations": ["Back Office", "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80"],
    "data-entry-processing": ["Data Operations", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80"],
    "web-development": ["Web Platforms", "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80"],
    "mobile-app-development": ["Mobile Apps", "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80"],
    "software-development": ["Custom Software", "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80"],
    "cloud-services": ["Cloud Operations", "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80"],
    "cyber-security": ["Secure Systems", "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=900&q=80"],
    "ai-solutions": ["AI Innovation", "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=900&q=80"],
    "devops": ["DevOps Delivery", "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80"],
    "enterprise-applications": ["Enterprise Apps", "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80"],
    "permanent-hiring": ["Permanent Hiring", "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"],
    "contract-staffing": ["Flexible Staffing", "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80"],
    "executive-search": ["Executive Search", "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80"],
    "recruitment-outsourcing": ["Recruitment Ops", "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80"],
    "full-stack-development": ["Full Stack", "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"],
    "java-training": ["Java Training", "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80"],
    "python-training": ["Python Training", "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80"],
    "react-training": ["React Training", "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=900&q=80"],
    "cloud-computing-training": ["Cloud Training", "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80"],
    "ai-machine-learning-training": ["AI and ML", "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=900&q=80"]
  };

  const getServiceSlug = (href) => {
    try {
      const url = new URL(href, window.location.href);
      return url.searchParams.get("service");
    } catch {
      return null;
    }
  };

  document.querySelectorAll('.mini-card a[href*="service-detail.html?service="]').forEach((link) => {
    const card = link.closest(".mini-card");
    const slug = getServiceSlug(link.href);
    const meta = slug ? serviceImages[slug] : null;
    if (!card || !meta) return;

    card.classList.add("service-visual-card", "card-shine");
    if (card.querySelector(".service-thumb")) return;

    const title = card.querySelector("h3")?.textContent?.trim() || meta[0];
    const thumb = document.createElement("div");
    thumb.className = "service-thumb";
    thumb.innerHTML = `
      <img src="${meta[1]}" alt="${title} service image" loading="lazy">
      <span class="service-thumb-label">${meta[0]} <i class="fa-solid fa-arrow-up-right-from-square"></i></span>
    `;
    card.insertBefore(thumb, card.firstElementChild);
  });

  const canAnimate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!canAnimate) return;

  const attachGesture = (element) => {
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 8;
      const rotateX = (0.5 - y) * 8;
      element.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
      element.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
      element.style.setProperty("--shine-x", `${(x * 100).toFixed(1)}%`);
      element.style.setProperty("--shine-y", `${(y * 100).toFixed(1)}%`);
    });

    element.addEventListener("pointerleave", () => {
      element.style.setProperty("--tilt-x", "0deg");
      element.style.setProperty("--tilt-y", "0deg");
      element.style.setProperty("--shine-x", "50%");
      element.style.setProperty("--shine-y", "50%");
    });
  };

  document.querySelectorAll(".service-visual-card, .service-detail-visual").forEach(attachGesture);
})();
