/* Ici gît la Belgique — comportements communs. Vanilla, sans dépendance. */
(function () {
  "use strict";
  var root = document.documentElement;

  /* ---- Thème ---- */
  var themeBtn = document.querySelector("[data-theme-toggle]");
  if (themeBtn) {
    var sync = function () {
      var dark = root.getAttribute("data-theme") !== "light";
      themeBtn.setAttribute("aria-pressed", String(!dark));
      themeBtn.setAttribute("aria-label", dark ? "Passer au thème clair" : "Passer au thème sombre");
    };
    sync();
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("igb-theme", next); } catch (e) {}
      sync();
    });
  }

  /* ---- Menu mobile ---- */
  var menuBtn = document.querySelector("[data-menu-toggle]");
  var nav = document.getElementById("nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.focus();
      }
    });
  }

  /* ---- Barre de lecture ---- */
  var bar = document.querySelector(".progress");
  var article = document.querySelector("[data-reading]");
  if (bar && article) {
    var onScroll = function () {
      var r = article.getBoundingClientRect();
      var total = r.height - window.innerHeight;
      var p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      bar.style.width = (p * 100).toFixed(2) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- Sommaire actif ---- */
  var tocLinks = document.querySelectorAll(".toc a[href^='#']");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var map = {};
    tocLinks.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          tocLinks.forEach(function (a) { a.classList.remove("active"); });
          var a = map[en.target.id];
          if (a) a.classList.add("active");
        }
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  /* ---- Compteurs en direct ----
     data-counter="rate"  : montant par seconde depuis l'ouverture de la page
     data-counter="since" : valeur de base + rythme depuis une date ISO      */
  var fmt = new Intl.NumberFormat("fr-BE", { maximumFractionDigits: 0 });
  var counters = document.querySelectorAll("[data-counter]");
  if (counters.length) {
    var t0 = Date.now();
    var tick = function () {
      var now = Date.now();
      counters.forEach(function (el) {
        var rate = parseFloat(el.getAttribute("data-rate")) || 0;
        var mode = el.getAttribute("data-counter");
        var val;
        if (mode === "since") {
          var base = parseFloat(el.getAttribute("data-base")) || 0;
          var from = Date.parse(el.getAttribute("data-from"));
          val = base + rate * ((now - from) / 1000);
        } else {
          val = rate * ((now - t0) / 1000);
        }
        el.textContent = fmt.format(val) + (el.getAttribute("data-suffix") || "");
      });
    };
    tick();
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setInterval(tick, reduce ? 5000 : 250);
  }

  /* ---- Jours écoulés depuis une date ---- */
  document.querySelectorAll("[data-days-since]").forEach(function (el) {
    var from = Date.parse(el.getAttribute("data-days-since"));
    if (!isNaN(from)) el.textContent = fmt.format(Math.floor((Date.now() - from) / 86400000));
  });

  /* ---- Copier le lien d'une section ---- */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var url = location.href.split("#")[0] + (btn.getAttribute("data-copy") || "");
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () {
        var o = btn.textContent; btn.textContent = "Lien copié"; setTimeout(function () { btn.textContent = o; }, 1600);
      });
    });
  });
})();
