(function () {
  "use strict";

  window.addEventListener("DOMContentLoaded", () => {
    if (!window.Swiper) return;

    document.querySelectorAll(".testimonial-swiper").forEach((slider) => {
      new Swiper(slider, {
        loop: true,
        speed: 700,
        spaceBetween: 24,
        autoplay: {
          delay: 4500,
          disableOnInteraction: false
        },
        pagination: {
          el: slider.querySelector(".swiper-pagination"),
          clickable: true
        },
        breakpoints: {
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1100: { slidesPerView: 3 }
        }
      });
    });
  });
})();
