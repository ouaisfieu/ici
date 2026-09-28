/* Jeu de la patate chaude : qui est compétent ? */
(function () {
  "use strict";
  var root = document.getElementById("patate");
  if (!root) return;
  var data = JSON.parse(document.getElementById("patate-data").textContent);
  var OPTIONS = ["Fédéral", "Régions", "Communautés", "Communes", "Plusieurs niveaux"];
  var qEl = root.querySelector(".q"), numEl = root.querySelector("[data-num]"), choices = root.querySelector(".choices"),
      ans = root.querySelector(".answer"), who = ans.querySelector(".who"), expl = ans.querySelector(".expl"),
      next = root.querySelector("[data-next]"), scoreEl = root.querySelector(".score");
  var order = data.map(function (_, i) { return i; }).sort(function () { return Math.random() - 0.5; });
  var i = 0, score = 0, answered = false;

  function show() {
    answered = false;
    var d = data[order[i]];
    numEl.textContent = "Question " + (i + 1) + " / " + data.length;
    qEl.textContent = d[0] + " : qui est compétent ?";
    choices.innerHTML = "";
    OPTIONS.forEach(function (o) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "choice"; b.textContent = o; b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", function () { pick(b, o, d); });
      choices.appendChild(b);
    });
    ans.hidden = true;
  }
  function pick(btn, o, d) {
    if (answered) return;
    answered = true;
    var ok = o === d[1];
    if (ok) score++;
    Array.prototype.forEach.call(choices.children, function (b) {
      b.disabled = true;
      if (b.textContent === d[1]) b.setAttribute("aria-pressed", "true");
    });
    if (!ok) btn.classList.add("wrong");
    who.textContent = (ok ? "Exact. " : "Raté. ") + "Réponse : " + d[1] + ".";
    expl.textContent = d[2];
    scoreEl.textContent = "Score : " + score + " / " + (i + 1);
    ans.hidden = false;
    next.textContent = i + 1 < data.length ? "Question suivante →" : "Voir le verdict";
    next.focus();
  }
  next.addEventListener("click", function () {
    i++;
    if (i < data.length) { show(); qEl.focus(); return; }
    var pct = score / data.length, msg;
    if (pct >= 0.8) msg = "Vous en savez plus que la plupart des ministres. C'est inquiétant — pour eux.";
    else if (pct >= 0.5) msg = "Honorable. Vous pourriez négocier une septième réforme de l'État.";
    else msg = "Rassurez-vous : en 2020, neuf ministres de la Santé n'ont pas fait mieux.";
    numEl.textContent = "Verdict";
    qEl.textContent = score + " / " + data.length + ". " + msg;
    choices.innerHTML = "";
    ans.hidden = true;
    var again = document.createElement("button");
    again.type = "button"; again.className = "btn primary"; again.textContent = "Rejouer";
    again.addEventListener("click", function () { i = 0; score = 0; scoreEl.textContent = ""; order.sort(function () { return Math.random() - 0.5; }); show(); });
    choices.appendChild(again);
  });
  qEl.setAttribute("tabindex", "-1");
  show();
})();
