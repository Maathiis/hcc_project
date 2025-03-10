Auth -> Login : Les adhérents du club peuvent s’authentifier avec un email et un mot de passe. Il reçoit un token JWT pour accéder aux fonctionnalités réservées aux adhérents
   {
    "email" : "CoachBizot@gmail.com",
    "password" : "rootroot"
   }

Auth -> Register : Un utilisateur peut se créer un compte adhérent, son compte sera validé par le club, son compte aura soit le rôle « coach », soit « contributeur », soit « joueur »
   {
    "nom": "test1",
    "prenom": "test1",
    "email": "test1@gmail.com",
    "password": "rootroot"
   }

Match -> Create : • Seul un adhérent « coach » peut saisir des matchs
                  • Un match doit aussi contenir un adversaire et un score final
                  • Il ne peut pas y avoir un match le même jour
   {
      "intitule": "Match de préparation",
      "dateMatch": "2025-08-11",
      "adversaire": "Équipe A"
   }

Match -> Update : Seul un adhérent « coach » peut modifier les matchs (ex: scores)
   {
  "score": "3-2"
   }
OU
   {
  "scoreFinal": "3-2"
   }
OU
   {
   "score": "3-2",
   "scoreFinal": "3-2"
   }


Actualite -> Create : Seul les adhérents ayant le rôle « contributeur » peuvent publier des actualités.

   {
   "titre": "Blablabla",
   "data": "dygfoazzaandlifzbdhkzgkuebtgzfkhuzibgezvfskjdhfgfhvzgjfkhlhahvhdbbsn,jfhzvk"
   }

Adhérents -> user-match/inscrire : • Seuls les adhérents ayant le rôle « joueur » peuvent s’inscrire aux matchs
                                   • Les adhérents peuvent s’inscrire à plusieurs matchs

   {
   "matchId": 3
   }

Adhérents -> user-match/desinscrire : Les adhérents peuvent se désinscrire des matchs auxquels il se sont inscrits.

   {
   "matchId": 3
   }

Pas de Tokken requis pour l'API :
API -> Adhérent -> user-match/all : L’API doit être capable de retourner les infos de l’ensemble des adhérents (nom, prénom, date 
d’inscription, matchs auxquels ils participent)
API -> Adhérent -> user-match/5 : L’API doit être capable de retourner les infos d’un adhérent particulier (nom, prénom, date 
d’inscription, matchs auxquels il participe)

API -> Actualite -> actualite : L’API doit être capable de retourner l’ensembles des actualités (toutes les infos + auteur).
API -> Actualite -> actualite/1 : L’API doit être capable de retourner une actualité particulière (toutes les infos + auteur).

API -> Match -> match/allMatch : L'API doit être capable de retourner les infos de l’ensemble des matchs + liste des participants
API -> Match -> match/infoMatch/2 : L'API doit être capable de retourner les infos d’un match particulier + liste des participants

 




























 # 🏆 API du Club Sportif

## 🔐 Authentification

### Login
Les adhérents du club peuvent s'authentifier avec un email et un mot de passe. Ils reçoivent un token JWT pour accéder aux fonctionnalités réservées aux adhérents.
```
POST /auth/login
```
```json
{
  "email": "CoachBizot@gmail.com",
  "password": "rootroot"
}
```

### Register
Un utilisateur peut se créer un compte adhérent. Son compte sera validé par le club et aura soit le rôle « coach », soit « contributeur », soit « joueur ».
```
POST /auth/register
```
```json
{
  "nom": "test1",
  "prenom": "test1",
  "email": "test1@gmail.com",
  "password": "rootroot"
}
```

## ⚽ Gestion des Matchs

### Create
- **Restriction** : Seul un adhérent « coach » peut saisir des matchs
- Un match doit aussi contenir un adversaire et un score final
- Il ne peut pas y avoir un match le même jour
```
POST /match/create
```
```json
{
  "intitule": "Match de préparation",
  "dateMatch": "2025-08-11",
  "adversaire": "Équipe A"
}
```

### Update
- **Restriction** : Seul un adhérent « coach » peut modifier les matchs (ex: scores)
```
POST /match/{id}
```
```json
{
  "score": "3-2"
}
```
OU
```json
{
  "scoreFinal": "3-2"
}
```
OU
```json
{
  "score": "3-2",
  "scoreFinal": "3-2"
}
```

## 📰 Gestion des Actualités

### Create
- **Restriction** : Seul les adhérents ayant le rôle « contributeur » peuvent publier des actualités.
```
POST /actualite/create
```
```json
{
  "titre": "Blablabla",
  "data": "dygfoazzaandlifzbdhkzgkuebtgzfkhuzibgezvfskjdhfgfhvzgjfkhlhahvhdbbsn,jfhzvk"
}
```

## 👥 Gestion des Adhérents

### Inscription aux matchs
- **Restriction** : Seuls les adhérents ayant le rôle « joueur » peuvent s'inscrire aux matchs
- Les adhérents peuvent s'inscrire à plusieurs matchs
```
POST /user-match/inscrire
```
```json
{
  "matchId": 3
}
```

### Désinscription des matchs
Les adhérents peuvent se désinscrire des matchs auxquels ils se sont inscrits.
```
POST /user-match/desinscrire
```
```json
{
  "matchId": 3
}
```

## 🌐 Endpoints API publics (sans token requis)

### Adhérents

#### Liste complète
```
GET /user-match/all
```
L'API retourne les infos de l'ensemble des adhérents (nom, prénom, date d'inscription, matchs auxquels ils participent)

#### Adhérent spécifique
```
GET /user-match/{id}
```
L'API retourne les infos d'un adhérent particulier (nom, prénom, date d'inscription, matchs auxquels il participe)

### Actualités

#### Liste complète
```
GET /actualite
```
L'API retourne l'ensemble des actualités (toutes les infos + auteur).

#### Actualité spécifique
```
GET /actualite/{id}
```
L'API retourne une actualité particulière (toutes les infos + auteur).

### Matchs

#### Liste complète
```
GET /match/allMatch
```
L'API retourne les infos de l'ensemble des matchs + liste des participants

#### Match spécifique
```
GET /match/infoMatch/{id}
```
L'API retourne les infos d'un match particulier + liste des participants