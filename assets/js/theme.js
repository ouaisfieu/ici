/* Applique le thème avant le premier rendu (sombre par défaut). */
(function () {
  var t = null;
  try { t = localStorage.getItem("igb-theme"); } catch (e) {}
  if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
  else document.documentElement.setAttribute("data-theme", "dark");
})();
