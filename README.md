# Ici gît la Belgique

**Autopsie sans anesthésie d'un État qui se regarde mourir.**
Site statique, critique et sourcé sur les crises systémiques de l'État belge (septembre 2026).

→ https://ouaisfieu.github.io/ici/

## Contenu
- **Acte d'accusation** — 11 dossiers : mille-feuille institutionnel, particratie, dette, casse sociale, État hors-la-loi, chantiers éternels, Bruxelles, climat & PFAS, impunité, école & médias, liquidation confédérale. Chaque dossier : faits, chiffres, « ce qu'ils répondront », verdict, sources numérotées.
- **Registre des responsabilités** — 36 décisions datées et sourcées, filtrables (`data/registre.json`, `data/registre.csv`).
- **Le compteur mortuaire** — 58 chiffres clés sourcés (`data/chiffres.json`, `data/chiffres.csv`).
- **Chronologie** 1970-2026, **Lexique du déni**, **jeu « patate chaude »**, **générateur de langue de bois**, **recherche** plein texte.

## Technique
- **Aucun build.** HTML/CSS/JS vanilla. Poussez le dossier tel quel sur la branche publiée.
- SEO : balises title/description uniques, canonical, hreflang `fr-BE`, Open Graph + Twitter (une image 1200×630 par page), `sitemap.xml` avec images, flux Atom, `llms.txt`.
- Web sémantique : HTML5 sémantique (`main`, `article`, `nav`, `aside`, `time`, `data`, `dfn`, `cite`…), JSON-LD schema.org sur chaque page (`WebSite` + `SearchAction`, `Organization`, `Person`, `AnalysisNewsArticle` avec `citation`, `BreadcrumbList`, `FAQPage`, `ItemList`, `Dataset`, `DefinedTermSet`, `Quiz`, `WebApplication`…).
- Vie privée : aucun cookie, aucun traceur, polices auto-hébergées, CSP stricte.
- Accessibilité : lien d'évitement, contrastes AA, navigation clavier, `prefers-reduced-motion`, thème sombre par défaut + clair.

## Déploiement (GitHub Pages)
1. Poussez le contenu de ce dossier à la racine du dépôt `ouaisfieu/ici`.
2. *Settings → Pages* : source = branche `main`, dossier `/ (root)`.
3. Le site est servi sur `https://ouaisfieu.github.io/ici/`. Les URL canoniques, le sitemap et la page 404 sont déjà configurés pour ce chemin.
4. Optionnel : déclarez `https://ouaisfieu.github.io/ici/sitemap.xml` dans Google Search Console et Bing Webmaster Tools. (Sur un site de projet, le `robots.txt` pris en compte est celui de la racine `ouaisfieu.github.io`.)

## Droit de réponse
Ouvrez une *issue* en précisant la page et le passage concernés. Les corrections sont datées.

## Licences
Contenus CC BY-SA 4.0 · code MIT · polices SIL OFL. Textes rédigés par Claude (IA, Anthropic) ; éditeur anonyme.
