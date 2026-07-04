(function () {
  "use strict";

  /* Menu mobile */
  var navToggle = document.getElementById("navToggle");
  var siteNav = document.getElementById("siteNav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    siteNav.querySelectorAll(".site-nav__link, .site-nav__cta").forEach(function (link) {
      link.addEventListener("click", function () {
        siteNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Accordéon FAQ */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var button = item.querySelector(".faq-item__question");
    if (!button) return;
    button.addEventListener("click", function () {
      var wasOpen = item.classList.contains("is-open");
      item.classList.toggle("is-open");
      button.setAttribute("aria-expanded", wasOpen ? "false" : "true");
    });
  });

  /* Filtre de tutos par catégorie */
  var filterBar = document.querySelector("[data-tuto-filters]");
  var grid = document.querySelector("[data-tuto-grid]");

  if (filterBar && grid) {
    var buttons = filterBar.querySelectorAll(".tuto-filter");
    var cards = grid.querySelectorAll(".tuto-card");

    filterBar.addEventListener("click", function (event) {
      var button = event.target.closest(".tuto-filter");
      if (!button) return;

      buttons.forEach(function (b) { b.classList.remove("is-active"); });
      button.classList.add("is-active");

      var category = button.getAttribute("data-category");

      cards.forEach(function (card) {
        var matches = category === "all" || card.getAttribute("data-category") === category;
        card.classList.toggle("is-hidden", !matches);
      });
    });
  }
})();
