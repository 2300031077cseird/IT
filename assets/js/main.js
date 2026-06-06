(function () {
  "use strict";

  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  const navItems = document.querySelectorAll(".nav-item.has-mega");
  const navBackdrop = document.createElement("div");
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

  const syncMenuPosition = () => {
    if (!header) return;
    const headerBottom = Math.max(0, Math.round(header.getBoundingClientRect().bottom));
    document.documentElement.style.setProperty("--nav-popover-top", `${headerBottom}px`);
  };

  const setMenuState = (isOpen) => {
    if (!menuToggle || !mainNav) return;
    syncMenuPosition();
    mainNav.classList.toggle("is-open", isOpen);
    navBackdrop.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("nav-popup-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    menuToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';

    if (!isOpen) {
      navItems.forEach((item) => {
        item.classList.remove("is-expanded");
        item.querySelector(".nav-link-main")?.setAttribute("aria-expanded", "false");
      });
    }
  };

  navBackdrop.className = "nav-backdrop";
  navBackdrop.setAttribute("aria-hidden", "true");
  document.body.appendChild(navBackdrop);

  if (menuToggle && mainNav) {
    syncMenuPosition();
    menuToggle.addEventListener("click", () => {
      setMenuState(!mainNav.classList.contains("is-open"));
    });

    navBackdrop.addEventListener("click", () => setMenuState(false));

    window.addEventListener("resize", syncMenuPosition);
    window.addEventListener("scroll", () => {
      if (mainNav.classList.contains("is-open")) syncMenuPosition();
    }, { passive: true });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && mainNav.classList.contains("is-open")) {
        setMenuState(false);
        menuToggle.focus();
      }
    });

    mainNav.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (!link) return;
      const parentMega = link.closest(".nav-item.has-mega");
      if (parentMega && link.classList.contains("nav-link-main")) return;
      setMenuState(false);
    });
  }

  navItems.forEach((item) => {
    const trigger = item.querySelector(".nav-link-main");
    if (!trigger) return;
    trigger.setAttribute("aria-haspopup", "true");
    trigger.setAttribute("aria-expanded", "false");
    trigger.addEventListener("click", (event) => {
      if (mainNav?.classList.contains("is-open")) {
        event.preventDefault();
        const shouldExpand = !item.classList.contains("is-expanded");
        navItems.forEach((otherItem) => {
          otherItem.classList.remove("is-expanded");
          otherItem.querySelector(".nav-link-main")?.setAttribute("aria-expanded", "false");
        });
        item.classList.toggle("is-expanded", shouldExpand);
        trigger.setAttribute("aria-expanded", String(shouldExpand));
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
        setMenuState(false);
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
