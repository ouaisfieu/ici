/* Registre des responsabilités — filtre côté client, sans dépendance. */
(function () {
  "use strict";
  var list = document.getElementById("registre-list");
  if (!list) return;
  var q = document.getElementById("f-q");
  var th = document.getElementById("f-theme");
  var lv = document.getElementById("f-niveau");
  var pt = document.getElementById("f-parti");
  var count = document.getElementById("f-count");
  var items = Array.prototype.slice.call(list.querySelectorAll(".entry"));
  var norm = function (s) { return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); };
  items.forEach(function (el) { el._t = norm(el.textContent); });

  var params = new URLSearchParams(location.search);
  if (params.get("q")) q.value = params.get("q");
  if (params.get("theme")) th.value = params.get("theme");
  if (params.get("niveau")) lv.value = params.get("niveau");
  if (params.get("parti")) pt.value = params.get("parti");

  function apply() {
    var nq = norm(q.value.trim()), n = 0;
    items.forEach(function (el) {
      var ok = (!nq || el._t.indexOf(nq) !== -1) &&
        (!th.value || el.getAttribute("data-theme") === th.value) &&
        (!lv.value || el.getAttribute("data-niveau") === lv.value) &&
        (!pt.value || (el.getAttribute("data-parti") || "").split("|").indexOf(pt.value) !== -1);
      el.hidden = !ok; if (ok) n++;
    });
    count.textContent = n + " entrée" + (n > 1 ? "s" : "") + " sur " + items.length;
    var p = new URLSearchParams();
    if (q.value.trim()) p.set("q", q.value.trim());
    if (th.value) p.set("theme", th.value);
    if (lv.value) p.set("niveau", lv.value);
    if (pt.value) p.set("parti", pt.value);
    var s = p.toString();
    history.replaceState(null, "", location.pathname + (s ? "?" + s : ""));
  }
  [q, th, lv, pt].forEach(function (el) { el.addEventListener("input", apply); el.addEventListener("change", apply); });
  var reset = document.getElementById("f-reset");
  if (reset) reset.addEventListener("click", function () { q.value = ""; th.value = ""; lv.value = ""; pt.value = ""; apply(); q.focus(); });
  apply();
})();
