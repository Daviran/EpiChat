
# Epichat: Un projet IRC
Etudiant d'EPITECH, attention, le plagiat est sanctionné ! 
## Stack 
<img alt="Mern stack" src="https://raw.githubusercontent.com/Daviran/EpiChat/main/assets/MERN.jpeg" />
 La stack technique se compose donc de MongoDB ( via Atlas ), ExpressJs(framework node) , ReactJs (côté client) et Nodejs côté serveur
## But du projet
Dans ce projet, nous avons dû créer un serveur IRC en NodeJS et ExpressJS, et un client en ReactJS. Socket.io s'occupera de la gestion des messages. <br>

Le serveur devra accepter plusieurs connexions simultanées et implémenter la notion de canaux :
- il doit être possible de rejoindre plusieurs canaux simultanément,
- il doit être possible de créer, renommer et supprimer des canaux
- un message doit être affiché lorsqu'un utilisateur rejoint ou quitte un canal.
- les utilisateurs doivent, bien entendu, pouvoir s'exprimer dans les canaux qu'ils ont rejoints.

<br> 
Les canaux et les messages doivent être préservés de manière persistante.
<br><br>
Du côté client, chaque utilisateur doit pouvoir effectuer les actions suivantes (en utilisant la commande spécifiée en
chat, et en utilisant l'interface) : <br> 
- /nick pseudo : définir le pseudo de l'utilisateur sur le serveur. <br>
- /list [string] : liste les canaux disponibles sur le serveur. Si la chaîne est spécifiée, seuls ceux dont le
dont le nom contient la chaîne.<br>
- /create channel : crée un canal avec le nom spécifié.<br>
- /delete channel : supprime le canal avec le nom spécifié.<br>
- /join channel : joindre le canal spécifié.<br>
- /quit channel : quitte le canal spécifié.<br>
- /users : liste les utilisateurs actuellement dans le canal.<br>
- /msg nickname message : envoie un message privé au nickname spécifié.<br>
- message : envoie un message à tous les utilisateurs du canal.<br>
<br><br>

## Setup : on se place à la racine en terminal (! Nécessite docker et docker-compose) puis : 

Installer d'abord <a href= "https://docs.docker.com/get-docker/" > Docker </a>  et également <a href="https://docs.docker.com/compose/install/"> Docker-compose.</a>
  <br><br>
Puis, on clone le projet et à la racine de ce projet on exécute la commande suivante: 
  ``` docker-compose up --build ```
  <br><br>
  Le résultat sera disponible sur http://localhost:3000 <br>
  Le projet étant sous container docker, il n'est pas nécessaire d'installer la stack MERN pour pouvoir accéder à l'application. <br>
  La database est sous MongoDB Atlas qui est, pour faire simple, MongoDB dans le cloud. 
