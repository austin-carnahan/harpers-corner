frontend-nanodegree-arcade-game
===============================
          BUG RUN README
===============================


TABLE OF CONTENTS
===============================
1. Running the Game
2. Gameplay
3. File Glossary



1. RUNNING THE GAME
===============================

Bug run is an HTML & Javascript based web application. The game should open
 and run when the index.html file is opened in a web browser.



 2. GAMEPLAY
 =============================

 The game should open to a start screen where player can use the arrow keys
 to select a character. Once ready, press enter to begin the first level of the
 game.

 OBJECTIVE: Move across the screen while avoiding enemies and reach the "Star"
 floating on the water tiles. Once reached, the player proceeds to the next level.
 The number of bugs, the speed of the bugs, and the number of obstacles in the game
 increases as you progress through game levels.

 ENEMIES: If a player runs into a bug enemy, they lose 1 life and are moved back
 to the starting position. Once you lose all your lives, the game is over.

 OBSTACLES: Rocks appear in later game levels and block player movement. CAREFUL:
 bugs can 'climb' over the Rocks. Water tiles are also disabled - with the exception
 of the tile currently holding the 'star' object.

 POWER-UPS: Gem items increase player points. Once you have collected 100 points,
 you gain 1 additional life and your points are reset to 0.
 Gem values are based on color.
 Blue: +25 points
 Green: +50 points
 Orange: + 75 points

 Heart power-ups increase player life by 1.



 3. FILE GLOSSARY
 ================================

ROOT
-------------------------------------------------------------------------
 index.html   - html DOM and page framework. Opening this file in the browser
                will load the game.

JS FOLDER
--------------------------------------------------------------------------

 app.js       - Contains Class definitions and methods for game objects, as well as some
                helper functions.

 engine.js    - Contains the game engine. Based on requestAnimationFrame(). Calls
                render and update methods for game objects. Handles collisions.

 Resources.js - Contains helper functions for loading and caching game resources.

CSS FOLDER
-----------------------------------------------------------------------------
 style.css    - Contains some basic page styles. Sets background color behind
                HTML canvas

IMAGES FOLDER
-----------------------------------------------------------------------------
              - Contains game images and sprites.
