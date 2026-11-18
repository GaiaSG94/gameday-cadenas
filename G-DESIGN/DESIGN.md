# DESIGN — Cadenas (journal)

> Versions datées, jamais écrasées. Tenu par Claude (rôle DA), d'après `PROMPT-DESIGN.md`.

## V1 — 2026-11-18 — Exploration page « Jeu » (étape B)

**Livré**
- `PAGES.md` : 4 pages proposées (Post, Jeu, Carte de fin, Séries & classement) + 6 questions produit ouvertes.
- `REFS.md` : Shutabug et Primal Instinct ouvertes et décodées (principes retenus / exclus).
- `planches/v1/01-laiton.html` — **Laiton** : la direction du brief. Tambours moletés sous lumière rasante, étiquette d'indices pendue à l'anse, fond `#14100c`, accent `#b08d57`, reflet `#f4d06f`.
- `planches/v1/02-cadran.html` — **Cadran** : 4 anneaux concentriques en pierre sombre, repère laiton à 12 h, le moyeu central est le bouton Open. Indices en monospace avec pictogramme d'anneaux.
- `planches/v1/03-vitrine.html` — **Vitrine** (écart au brief) : fond os, cadenas seul objet doré sous lumière de studio, indices sur un cartel papier, UI à l'encre noire.

Chaque planche : cadre desktop 1440 × 900 + cadre mobile 390 × 844 côte à côte, dans un post (en-tête neutre, sans marque), panneau « États » (molette, ouvrir, « Still locked », chargement, notes de mouvement). Données réelles du générateur pour le 2026-12-11 (joueur en cours sur 6 3 0 5, solution 6 3 0 3).

**Décisions**
- Indices rendus en symboles (`II + III = 3`, `IV ≠ 4`, `II > III`) plutôt qu'en phrases : plus rapide à lire et cohérent avec « zero text » d'`IDEE.md`. À valider (question 1 de `PAGES.md`).
- Une seule couleur d'accent par direction (laiton) ; serif pour les chiffres, sans ou mono pour le reste.
- Polices : piles système dans les planches (aucune requête réseau). Pour le build, embarquer des polices libres (OFL) à cause de la CSP Devvit.
- Pas de validation en direct des indices dessinée : absente d'`IDEE.md` (question 3).

**En attente** : choix de direction par Gaia, réponses aux questions de `PAGES.md`. Ensuite : `STYLE.md` puis planches Post, Carte de fin, Séries & classement.

## V2 — 2026-11-18 — Refonte page « Jeu » (refs du hub)

**Retour de Gaia sur V1** : aucune des 3 directions, « ça fait slop IA ». S'inspirer des refs du hub, catégories `narratif-jeu` et `3d-matiere`.

**Livré** (`planches/v2/`, V1 conservée dans `planches/v1/`)
- `04-encre.html` — **Encre** : cadenas dessiné à l'encre sur papier, ocre riso décalée, étiquette manuscrite, série en bâtons, bouton à ombre dure. Refs : Don't Look Up, Gapsy, Gemeos.
- `05-coffre.html` — **Coffre** : cadenas sur scène noire, contre-jour rouge, laser comme ligne de lecture, HUD mono, « Hold to open ». Refs : MemoryQuest, Yogi Suria, Igloo.
- `06-collection.html` — **Collection** : aplat outremer, pitch « Crack today's lock. » en Anton, cadenas laiton à facettes plates et ombre longue, étagère des cadenas ouverts (série). Refs : Matchball, Merci Studio, Gapsy.

**Décisions**
- Vraies polices embarquées (OFL, base64) : la typo porte la moitié de l'identité, les polices système faisaient générique.
- Cadenas dessiné en SVG (et plus en dégradés CSS) : trait, aplats ou lumière, selon la direction.
- Indices : molettes numérotées 1-4 (plus de chiffres romains), toujours en symboles.
- Correctif : le 11/12/2026 est un **vendredi** (titre du post corrigé, V1 comprise).

**En attente** : choix de direction, puis `STYLE.md` et les 3 autres pages.

## V3 — 2026-11-18 — Déclinaison « Coffre » (étape C)

**Retour de Gaia** : direction **05 Coffre** retenue, à décliner.

**Livré**
- `STYLE.md` : palette (accent unique laser `#ff3a1e`, lumière chaude `#ffc57a` réservée à l'état ouvert), typo Archivo + JetBrains Mono, grille, composants, mouvement, états.
- `planches/v2/07-post.html` — **Post** dans le feed : scène réduite, cadenas verrouillé + laser, « Crack today's brass lock. », ouvertures du jour, meilleur temps, bouton « Pick it ». État « déjà ouvert aujourd'hui » en lumière chaude.
- `planches/v2/08-fin.html` — **Carte de fin** : cadenas ouvert en lumière chaude, « Cracked. », temps / série +1 / « faster than », 14 derniers jours, bloc de résultat sans combinaison + « Comment » / « Copy result », compte à rebours du prochain cadenas.
- `planches/v2/09-series.html` — **Séries & classement** : onglets Today / Streaks (mobile), deux colonnes (desktop) ; répartition des temps avec la barre du joueur, top 8 + ligne du joueur, calendrier 30 jours, record, plus longues séries.

**Décisions**
- ~~Lumière chaude = signal « c'est ouvert »~~ (retirée en V3.1).
- Le partage ne contient jamais la combinaison (commentaires sans spoiler).
- Toutes les données communautaires sont des données de démo : elles dépendent des questions Q5 et Q7 de `PAGES.md`.

**En attente** : validation des 3 planches de déclinaison, puis `/lock`.

## V3.1 — 2026-11-18 — Noir profond, aura rouge, sans or

**Retours de Gaia** : « j'aime pas le style or à la place de rouge » ; « renforce l'identité avec le contraste noir profond et rouge aura ».

**Changements** (planches 05, 07, 08, 09 et `STYLE.md`)
- L'état ouvert ne passe plus à l'or : l'aura reste rouge, le laser s'éteint, l'anse se lève, l'aura flashe une fois. La couleur `#ffc57a` est supprimée.
- Fond `#060608` → `#000000`, panneaux `#050506`, filets `#18171b` ; vignettage noir sur les bords de la scène.
- Aura rouge renforcée : halo plus grand et plus dense en `screen`, liseré rouge autour du cadenas plus opaque et plus flou (9 px).
- Le jour en cours de la carte de fin passe au laser.
- Correctif (retour de Gaia : « le haut des cadenas est parfois coupé ») : le cadre SVG du cadenas laissait 12 px au-dessus de l'anse, donc son aura rouge était tranchée, et le Post recadrait l'anse elle-même. Cadre élargi vers le haut (`viewBox 0 -34 390 364`) et recadrages des états « ouvert » refaits sur 04, 05, 06, 07 et 08.

## V3.2 — 2026-11-18 — Validation

**Retour de Gaia** : « oui pour les planches noir rouge, pas celles bleu et jaune ».
- **Validées** : 05 Jeu, 07 Post, 08 Carte de fin, 09 Séries & classement (direction Coffre, noir profond + aura rouge).
- **Rejetées** : 04 Encre (jaune) et 06 Collection (bleu), conservées pour l'historique uniquement.
- Contrôle demandé (« pas coupé en haut, pas aplati ») : mesure dans le navigateur de chaque cadenas rendu, ratio 1,000 partout, anse dégagée. Règle de cadrage ajoutée à `STYLE.md` §5.

**Prochaine étape** : ~~`/lock`~~ fait (V4).

## V4 — 2026-11-18 — LOCK

Style **verrouillé** sur demande de Gaia (`/lock`). Fin des explorations.

**Référence figée**
- `STYLE.md` (direction Coffre : noir profond `#000`, aura rouge `#ff3a1e` comme seule couleur, Archivo + JetBrains Mono, règles de cadrage du cadenas).
- Planches : `planches/v2/05-coffre.html` (Jeu), `07-post.html` (Post), `08-fin.html` (Carte de fin), `09-series.html` (Séries & classement).
- Hors référence (historique) : `planches/v1/*`, `planches/v2/04-encre.html`, `planches/v2/06-collection.html`.

**Reste ouvert avant le code** : questions produit Q1-Q8 de `PAGES.md` (notamment Q5 métrique communautaire, Q7 historique de série, Q8 « Hold to open »).
