# PAGES — Cadenas

> Statuts : à dessiner / en revue / validée. Les 4 pages sont **validées** (2026-11-18), direction Coffre. **Style verrouillé** (/lock, 2026-11-18).
> Chaque planche montre le cadre desktop 1440 × 900 et le cadre mobile 390 × 844 côte à côte.
> Données de démo : vraie grille générée par `generateCadenas('2026-12-11')` (solution 6 3 0 3, 7 indices).

| # | Page | Rôle | Contenu clé | Statut |
|---|------|------|-------------|--------|
| 1 | **Post** | Vue dans le feed (splash inline) : donner envie d'ouvrir le cadenas du jour | En-tête du post, cadenas fermé du jour (date), série du joueur, bouton « Pick it » (libellé actuel du code) | **validée** — `planches/v2/07-post.html` |
| 2 | **Jeu** | Écran principal, une seule règle : « Make every clue true — one combination opens it » | 4 molettes D1–D4 sous un laser, liste d'indices (parité, ordre, somme, « n'est pas »), chrono, série, « Hold to open », message « Still locked » | **validée** — direction 05 Coffre (`planches/v2/05-coffre.html`) |
| 3 | **Carte de fin** | Résultat + boucle quotidienne + accroche commentaire | Ouverture du cadenas (anse qui se lève), temps, série, invitation à commenter en un geste, prochain cadenas dans HH:MM | **validée** — `planches/v2/08-fin.html` |
| 4 | **Séries & classement** | Montrer la série et la communauté | Série perso, scores de la communauté du jour (temps d'ouverture) | **validée** — `planches/v2/09-series.html` |

États transverses (dessinés dans la planche Jeu, panneau « États ») : chargement « Oiling the locks… », erreur, déjà résolu aujourd'hui (`solvedToday` existe dans l'API).

## Questions produit ouvertes (non tranchées)

1. **« Zero text » vs indices en phrases.** `IDEE.md` annonce une différenciation « zero text », mais le code affiche `dial 2 + dial 3 = 3`. Les planches proposent des indices **symboliques** (chiffres romains de molette + opérateurs : `II + III = 3`, `II > III`, `IV ≠ 4`), seuls « odd / even » restent en mots. À confirmer.
2. **Le générateur produit des doublons et des indices redondants** (ex. 2026-12-10 : `dial 3 + dial 1 = 6` trois fois, 11 indices). Les planches supposent une étiquette de 5 à 7 indices distincts. Dédoublonnage à prévoir côté générateur ?
3. **Validation en direct des indices** (chaque ligne s'allume quand elle est vraie) : non prévue dans `IDEE.md`, donc **non dessinée**. Aujourd'hui l'échec dit seulement « At least one clue is broken ». On garde ce niveau de difficulté ?
4. **Essais illimités** (comportement actuel) ou nombre de tentatives compté dans le score ? Les planches montrent l'état « Still locked » sans compteur.
5. **« Scores communautaires »** (page 4) : le serveur ne stocke aujourd'hui que la série. Quelle métrique : temps d'ouverture, nombre de tentatives, % de joueurs qui ont ouvert ?
6. **Courbe de difficulté liée à la série** (`IDEE.md`) : contredit « seed identique pour tous ». Difficulté identique pour tous et seule la série varie ?
7. **Étagère de série** (direction 06) : montrer les cadenas des 6 derniers jours sous les indices. La série existe côté serveur, mais pas l'historique jour par jour (seulement `lastday`). À valider avant de la garder.
8. **« Maintenir pour ouvrir »** (direction 05) : variante d'interaction du bouton Open, à valider.
