# REFS — Cadenas

> Ouvertes le 2026-11-18 dans le navigateur intégré. On prend des **principes**, jamais un layout, un texte, un asset ou une marque.

## Shutabug — shutabug.com

Observé : une galerie en 3D courbe sur fond os/ivoire très clair ; les œuvres sont les seuls éléments colorés, posées dans des niches arrondies, avec un sol qui s'incurve. L'interface est minuscule (capitales espacées, petits corps, boutons-pilules fins), reléguée aux bords. Une seule ligne d'instruction centrée en bas, discrète.

Ce qu'on retient :
- **L'objet d'abord** : un seul objet coloré sur un fond neutre, l'UI s'efface autour.
- **La matière avant l'ornement** : pas de cadre décoratif, l'objet suffit à porter l'identité.
- **Lumière de studio** douce, ombre portée au sol, profondeur par le sol incurvé plutôt que par des cartes.
- **Densité typo très basse** : une ligne d'aide, pas de paragraphe.

Utilisé surtout par la direction 03 « Vitrine ».

## Primal Instinct — primal-instinct.net

Observé : plein écran noir, un grand disque de pierre gravé d'anneaux concentriques de glyphes, éclairé en lumière rasante depuis le haut-gauche ; la matière (relief, fissures) est lisible uniquement par la lumière. Aucun texte décoratif sur l'image ; l'UI est en capitales monospaces minuscules, gris clair, aux quatre coins.

Ce qu'on retient :
- **Lumière rasante** sur matière sombre : le relief (gravure, anneaux) se lit par le contraste lumière / ombre, pas par la couleur.
- **Anneaux concentriques** comme motif structurant, objet coupé par le cadre pour donner l'échelle.
- **Pas de texte décoratif** ; texte fonctionnel en petites capitales monospaces.
- **Monochrome** : la couleur n'apparaît que comme accent rare.

Utilisé surtout par la direction 02 « Cadran » et, pour la lumière, par la 01 « Laiton ».

## Ce qu'on ne prend pas

Ni la galerie 3D navigable, ni le disque gravé de glyphes, ni les mises en page de navigation, ni aucun texte. Aucun asset ni police n'est repris.

---

# V2 — 2026-11-18 — Refs du hub (`REFERENCES-DESIGN.md`, catégories `narratif-jeu` et `3d-matiere`)

> Demande de Gaia après rejet de V1 (« ça fait slop IA »). Captures lues dans `REFERENCES-CAPTURES/` (origin/main du dépôt `hackatons-pipeline`), les 21 refs des deux catégories.

## Pourquoi V1 faisait slop

Dégradés « or sur brun » génériques pour simuler le métal, chiffres romains en pastilles, polices système, aucune voix : le cliché « luxe » de template. Les refs du hub ont toutes un **parti pris d'auteur** (un trait, une lumière, un aplat) et un ton.

## Principes retenus par ref (aucun layout, texte, asset ni police repris)

| Ref | Catégorie | Principe pris | Direction |
|---|---|---|---|
| Don't Look Up (game) | narratif-jeu | Trait d'encre noir sur papier, lettrage massif « fait main », boutons cernés à ombre dure, ton qui fait sourire | 04 Encre |
| Gapsy Studio | narratif-jeu | Annotations manuscrites posées sur l'objet ; lettrage en relief massif | 04 Encre, 06 Collection |
| Gemeos | narratif-jeu | Objets « stickers » cernés d'un trait épais | 04 Encre |
| MemoryQuest | narratif-jeu | L'objet est une scène : une borne seule dans le noir, un halo coloré derrière | 05 Coffre |
| Yogi Suria | 3d-matiere | Matière sombre + une ligne laser qui structure l'écran ; HUD minuscule aux coins | 05 Coffre |
| Igloo | 3d-matiere | Étiquettes techniques mono posées sur l'objet 3D | 05 Coffre |
| Matchball | narratif-jeu | Objets alignés qu'on collectionne ; titre en linéale condensée très grasse ; un seul bouton plein | 06 Collection |
| Merci Studio | narratif-jeu | Aplat saturé plein cadre + objet 3D à facettes plates | 06 Collection |

Écartées pour Cadenas : Noon, Giallo, Psychoactive, Framer (fluide/abstrait, rien à voir avec un objet mécanique), Dairy Food, Sponge, Funtech (3D lourde non reproductible à budget léger), Raben Rifaie (trop calme pour un jeu), Defy, Köm, Noddal (produit/tech).

## Polices (embarquées en base64 dans les planches, OFL, via npm `@fontsource/*`)

Bowlby One, Caveat (04) · Archivo, JetBrains Mono (05) · Anton, Inter (06). Toutes compatibles avec la CSP Devvit si on les embarque dans le build.
