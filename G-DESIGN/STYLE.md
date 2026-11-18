# STYLE — Cadenas · direction « Coffre » (validée le 2026-11-18, révisée : noir profond + aura rouge, sans or)

> **VERROUILLÉ le 2026-11-18 (/lock)** : fin des explorations. Toute évolution passe par une nouvelle version datée dans `DESIGN.md`.
> Source : `planches/v2/05-coffre.html` (+ 07, 08, 09). Toute nouvelle planche suit ce fichier. Une seule couleur d'accent : le rouge laser.

## 1. Idée

Le cadenas est posé seul sur un **noir profond** (`#000`), entouré d'une **aura rouge** à contre-jour : c'est toute l'identité, et rien d'autre n'a de couleur. Un trait laser traverse les molettes : c'est la ligne de lecture. L'interface est un HUD minuscule. La récompense : le laser s'éteint, l'anse se lève et l'aura flashe une fois. La lumière reste rouge du début à la fin.

## 2. Palette

| Rôle | Hex | Usage |
|---|---|---|
| Vide (fond) | `#000000` | fond de toutes les vues du jeu ; coins assombris par un vignettage noir |
| Panneau | `#050506` | cartes, champs, encarts |
| Filet | `#18171b` / `#2c2a30` | séparateurs, contours d'anneau, bordures d'étiquettes |
| Os (texte principal) | `#ece7dc` | chiffres, valeurs, libellés actifs |
| HUD (texte secondaire) | `#6d6a63` | libellés, unités, métadonnées |
| **Laser (accent unique)** | `#ff3a1e` | ligne de lecture, halo, bouton principal, rang du joueur, alerte |
| Laiton sombre (matière) | `#4a3c27` → `#0a0806` | corps du cadenas (dégradé de matière, jamais d'UI) |

Aura : halo radial rouge (`#ff3a1e` à 67 % au centre → 0 à 76 % du rayon, flou 10 px, `screen`) derrière le cadenas + liseré rouge flou 9 px autour du corps et de l'anse.
Vignettage : noir pur sur les bords (radial, transparent jusqu'à 45 %).
Grain : bruit fractal blanc à 9 % en `screen` sur toute la scène.

## 3. Typographie (polices OFL embarquées en base64, aucune requête réseau)

| Rôle | Police | Taille / graisse | Casse |
|---|---|---|---|
| Titre d'écran (CRACKED., STREAK) | Archivo | 44 px mobile / 64 px desktop, 800, interlettrage −0,01 em | capitales |
| Chiffres des molettes | Archivo | 31 px (molette) | — |
| Valeurs (temps, rang, série) | Archivo | 28 px, 800 | — |
| Corps HUD, indices | JetBrains Mono | 13,5 px, 400 | normale |
| Libellés HUD | JetBrains Mono | 10 px, 400 / 600, interlettrage 0,14–0,24 em | capitales |
| Notes de planche (hors jeu) | Inter | 12–14 px | — |

Deux familles dans le jeu (Archivo + JetBrains Mono), pas une de plus.

## 4. Grille et mise en page

- Mobile 390 × 672 (zone de post ouvert) : marges 16 px, HUD en haut (2 lignes), objet centré, panneau en bas.
- Desktop 736 × 620 : objet à gauche (≈ 430 px), panneau à droite (≈ 232 px), marges 26 px.
- Feed (post fermé) : hauteur 420 px mobile / 460 px desktop, même scène en plus petit.
- Rythme vertical : multiples de 4 px ; séparateurs = filet 1 px `#18171b` sous un libellé HUD.

## 5. Composants

- **Cadenas** (SVG) : anse acier à contre-jour, corps laiton sombre moleté, liseré rouge sur les bords, fenêtre noire avec 4 cylindres ; molette active = cadre os 1,2 px. Ombre au sol en ellipse noire.
- **Laser** : trait 1,1 px `#ff6a44` + halo flou 5 px ; graduations tous les 20 px hors du cadenas ; libellé `READ`.
- **HUD** : coin haut-gauche = nom + numéro du cadenas (`LOCK 11.12.26`) ; coin haut-droit = chrono (`T+01:42`) + série (`STREAK 012`, toujours sur 3 chiffres).
- **Indice** : `01  D2 + D3 = 3` — numéro gris, référence de molette dans une étiquette 1 px, opérateur gris, valeur en Archivo.
- **Bouton principal « Hold to open »** : anneau 66 px, pastille laser au centre, progression en arc rouge ; libellé mono à droite.
- **Bouton secondaire** : pilule 46 px, contour 1 px `#34323a`, texte mono capitales.
- **Bouton plein** (une action par écran maximum) : pilule laser, texte `#160604`.
- **Ligne de classement** : rang, nom, temps ; ligne du joueur = texte os + filet laser à gauche.

### Cadrage du cadenas (obligatoire)

- **Jamais coupé en haut** : le cadre du SVG garde au moins 40 unités au-dessus de l'anse fermée (`viewBox 0 -34 390 364`) et 30 au-dessus de l'anse levée, pour que l'aura rouge ne soit jamais tranchée. Aucun conteneur à `overflow: hidden` ne doit passer à moins de 24 px au-dessus de l'anse.
- **Jamais aplati** : on ne fixe que la largeur du SVG, jamais sa hauteur ; le ratio vient du `viewBox` (`preserveAspectRatio` par défaut). Aucun `transform: scale` non uniforme, aucune hauteur imposée par flex/grid sur le conteneur.
- Vérifié dans les planches 05, 07, 08 : ratio rendu / ratio du viewBox = 1,000 ; anse à 22-69 px du haut du SVG.

## 6. Mouvement

| Événement | Mouvement | Durée |
|---|---|---|
| Cran de molette | défilement avec flou vertical, calage sur le laser avec léger dépassement + clic | 140 ms |
| Maintenir pour ouvrir | l'arc se remplit ; relâcher annule | 800 ms |
| Ouverture | le laser s'éteint molette par molette (D4 → D1), l'anse jaillit de 30 px, l'aura rouge flashe une fois | 80 ms par molette + 300 ms |
| Échec | le laser clignote 2 fois, message HUD rouge | 2 × 180 ms |
| Chargement | une ligne laser balaie la scène de haut en bas | 1,8 s en boucle |

Aucun rebond « cartoon », aucune rotation 3D décorative.

## 7. États

- **Chargement** : `OILING THE LOCKS` + balayage laser.
- **Erreur** : message HUD laser, bouton secondaire `RETRY`.
- **Échec d'ouverture** : `STILL LOCKED · A CLUE IS BROKEN` (règle actuelle : aucun indice désigné).
- **Déjà ouvert aujourd'hui** (`solvedToday`) : même aura rouge, cadenas anse levée, laser éteint, temps + série, compte à rebours du prochain cadenas.
- **Survol / focus** : contour os 1,2 px (molette), éclaircissement du contour (boutons). Focus clavier visible = même contour.

## 8. Interdits propres au style

Pas de deuxième couleur d'accent ; pas de dégradé décoratif hors matière et lumière ; pas d'emoji ; pas de texte décoratif sur la scène ; **pas d'or ni de lumière chaude** (rejeté par Gaia le 2026-11-18) ; pas de gris moyen en fond : noir pur ou rien.
