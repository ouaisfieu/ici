/* Recherche plein texte côté client sur data/recherche.json. */
(function () {
  "use strict";
  var form = document.getElementById("search-form");
  var input = document.getElementById("search-q");
  var out = document.getElementById("search-results");
  var status = document.getElementById("search-status");
  if (!form || !input || !out) return;
  var base = form.getAttribute("data-base") || "../";
  var index = null;
  var norm = function (s) { return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };

  function load() {
    if (index) return Promise.resolve(index);
    return fetch(base + "data/recherche.json").then(function (r) { return r.json(); }).then(function (d) {
      index = d.map(function (p) { p._t = norm(p.title); p._d = norm(p.description + " " + p.keywords); p._b = norm(p.text); return p; });
      return index;
    });
  }
  function run(q) {
    var nq = norm(q.trim());
    if (nq.length < 2) { out.innerHTML = ""; status.textContent = "Tapez au moins deux caractères."; return; }
    var terms = nq.split(/\s+/).filter(Boolean);
    load().then(function (idx) {
      var res = idx.map(function (p) {
        var score = 0;
        terms.forEach(function (t) {
          if (p._t.indexOf(t) !== -1) score += 10;
          if (p._d.indexOf(t) !== -1) score += 4;
          var i = p._b.indexOf(t); if (i !== -1) { score += 1; p._hit = i; }
        });
        return { p: p, s: score };
      }).filter(function (r) { return r.s > 0; }).sort(function (a, b) { return b.s - a.s; });
      status.textContent = res.length ? res.length + " résultat" + (res.length > 1 ? "s" : "") + " pour « " + q + " »" : "Aucun résultat pour « " + q + " ». Même l'État n'a pas trouvé de responsable.";
      out.innerHTML = res.slice(0, 30).map(function (r) {
        var p = r.p, snip = p.description;
        if (typeof p._hit === "number") {
          var st = Math.max(0, p._hit - 80);
          snip = (st > 0 ? "… " : "") + p.text.substr(st, 220) + " …";
        }
        return '<li><a href="' + base + p.url + '"><span class="t">' + esc(p.title) + '</span><span class="d">' + esc(snip) + "</span></a></li>";
      }).join("");
    }).catch(function () { status.textContent = "L'index de recherche n'a pas pu être chargé."; });
  }
  form.addEventListener("submit", function (e) { e.preventDefault(); run(input.value); history.replaceState(null, "", "?q=" + encodeURIComponent(input.value)); });
  var t; input.addEventListener("input", function () { clearTimeout(t); t = setTimeout(function () { run(input.value); }, 160); });
  var q0 = new URLSearchParams(location.search).get("q");
  if (q0) { input.value = q0; run(q0); }
})();
