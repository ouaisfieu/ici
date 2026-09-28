/* Générateur de langue de bois institutionnelle belge. */
(function () {
  "use strict";
  var out = document.getElementById("bullshit");
  var btn = document.getElementById("bullshit-go");
  var copy = document.getElementById("bullshit-copy");
  if (!out || !btn) return;
  var A = ["Dans un esprit de responsabilité partagée,", "Conformément à l'accord de gouvernement,", "À l'issue d'un conclave constructif,", "Dans le strict respect de la loyauté fédérale,", "Sans préjudice des compétences des entités fédérées,", "Au terme d'une concertation approfondie avec les partenaires,", "Face à une situation héritée de la législature précédente,", "Dans le cadre de la trajectoire européenne,", "Après avoir pris acte de l'arrêt de la Cour,", "Tenant compte des équilibres communautaires,"];
  var B = ["le gouvernement prend ses responsabilités", "nous restons pleinement mobilisés", "nous avons décidé de responsabiliser les acteurs", "le dossier fera l'objet d'un groupe de travail", "nous privilégions une approche pragmatique", "nous examinons toutes les options sur la table", "la balle est désormais dans le camp des Régions", "nous refusons toute forme de tabou", "le fédéral a pleinement joué son rôle", "nous saluons le travail remarquable de l'administration"];
  var C = ["afin de préserver notre modèle social", "sans toucher au pouvoir d'achat", "dans l'intérêt de toutes les Belges et tous les Belges", "pour garantir la soutenabilité de nos finances publiques", "tout en respectant les lignes rouges de chacun", "avec un souci constant d'équilibre", "en veillant à ne pas alourdir la charge des communes", "dans le respect de l'autonomie de chacun", "sans ouvrir le débat institutionnel", "au service de l'efficacité de l'action publique"];
  var D = ["; le calendrier sera précisé ultérieurement.", ", et ce n'est pas le moment de polémiquer.", ", car il s'agit d'une faillite collective.", " — la question a été renvoyée au Comité de concertation.", ", conformément à ce qui a été convenu en conclave.", ", ce qui démontre que le système fonctionne.", ", mais le dossier est désormais au frigo.", " : nous attendons l'avis du Conseil d'État.", " ; nous en tirerons toutes les leçons.", ", en affaires courantes s'il le faut."];
  var who = ["— un ministre fédéral, n'importe lequel", "— un ministre-président, peu importe la Région", "— un président de parti, à la sortie d'un conclave", "— une secrétaire d'État, entre deux astreintes", "— un porte-parole, un vendredi à 18 h"];
  var sig = document.getElementById("bullshit-who");
  var pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };
  function gen() {
    var s = pick(A) + " " + pick(B) + " " + pick(C) + pick(D);
    out.textContent = s;
    if (sig) sig.textContent = pick(who);
  }
  btn.addEventListener("click", gen);
  if (copy) copy.addEventListener("click", function () {
    if (navigator.clipboard) navigator.clipboard.writeText("« " + out.textContent + " » " + (sig ? sig.textContent : "")).then(function () {
      copy.textContent = "Copié"; setTimeout(function () { copy.textContent = "Copier la citation"; }, 1500);
    });
  });
  gen();
})();
