(function () {
  "use strict";

  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  const navItems = document.querySelectorAll(".nav-item.has-mega");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navSectionMap = {
    "enterprise.html": "industries.html",
    "digital-markets.html": "industries.html",
    "service-detail.html": "services.html"
  };
  const activePage = navSectionMap[currentPage] || currentPage;

  document.querySelectorAll("[data-nav]").forEach((link) => {
    const target = link.getAttribute("href");
    if (target === activePage || (activePage === "" && target === "index.html")) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });

  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });
  }

  navItems.forEach((item) => {
    const trigger = item.querySelector(".nav-link-main");
    if (!trigger) return;
    trigger.addEventListener("click", (event) => {
      if (window.matchMedia("(max-width: 991px)").matches) {
        event.preventDefault();
        item.classList.toggle("is-expanded");
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (mainNav?.classList.contains("is-open")) {
        mainNav.classList.remove("is-open");
        menuToggle?.setAttribute("aria-expanded", "false");
        if (menuToggle) menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    });
  });

  document.querySelectorAll(".js-year").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  const serviceParam = new URLSearchParams(window.location.search).get("service");
  if (serviceParam) {
    const serviceName = serviceParam.trim();
    const serviceSelect = document.querySelector("#service");
    if (serviceSelect) {
      const hasOption = Array.from(serviceSelect.options).some((option) => option.value === serviceName);
      if (!hasOption) {
        const option = document.createElement("option");
        option.value = serviceName;
        option.textContent = serviceName;
        serviceSelect.appendChild(option);
      }
      serviceSelect.value = serviceName;
    }
  }

  document.querySelectorAll("form[data-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const message = form.querySelector(".form-message");
      if (message) {
        message.textContent = "Thank you. Our enterprise advisory team will contact you shortly.";
      }
      form.reset();
    });
  });
})();
