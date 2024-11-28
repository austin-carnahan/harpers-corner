/**
*This file contains class definitions, class methods, object instantiation
*and helper methods.
**/

//***********************Global variables*********************************
//************************************************************************

var CANVAS_HEIGHT = 606;
var CANVAS_WIDTH = 505;
//some arrays to help divide canvas into a grid based on game tiles
var STREET_TILES = [1, 2, 3];
var tileGridX = [0, 101, 202, 303, 404]
var tileGridY = [-2, 73, 156, 239, 322, 405]

//*********************Class Definitions & Methods ***********************
//************************************************************************

// Enemies our player must avoid
var Enemy = function() {

    this.sprite = 'images/enemy-bug.png';

    //set enemy initial location
    //enemies move from left to right and start in 1 of 3 random positions
    //random starting x helps stagger bugs
    this.x = -(Math.floor(Math.random() * 300) + 1);
    this.y = -20 + STREET_TILES[Math.floor(Math.random() * STREET_TILES.length)] * 82.5;

    //set enemy speed
    this.speed = Math.floor((Math.random() * 200 * player.level/3) + 50);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //set bug back to other side of page. random number delays bug start a bit
    if(this.x > CANVAS_WIDTH){
      this.x -= (CANVAS_WIDTH + Math.floor(Math.random() * 300) + 50);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    //this lets bugs "climb" over rocks
    if(rocksEnabled()){
        if(isTouching(this, rock1)){
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(-5*(Math.PI/180));
          ctx.drawImage(Resources.get(this.sprite), 0, -5);
          ctx.restore();
        }else if(isTouching(this, rock2)){
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(-5*(Math.PI/180));
          ctx.drawImage(Resources.get(this.sprite), 0, -5);
          ctx.restore();
        } else {
          //draw regular bug
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }
    }else{
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

//player class
var Player = function(){
  //set player image
  this.sprite = gamemenu.spriteSelected;
  //set points to zero
  this.points = 0;
  //set lives to 3
  this.lives = 3;
  //set current game level
  this.level = 1;
  //set start position
  this.x =tileGridX[2];
  this.y = tileGridY[5];
  //set vars for updating postition
  this.lastX = this.x;
  this.lastY = this.y;
};


//this is really just here to back out updates from handleInput if player
//tries to move out of bounds or to a disabled tile.
//set up this way so that "isTouching" will work with all objects.
//possibly need to find a better implmentation
Player.prototype.update = function() {
  //update x with bounds checking
  if(!(tileEnabled(this))){
    this.x = this.lastX;
    this.y = this.lastY;
  }

  //update points and lives. 100 points = +1 to Life
  if(this.points >=100){
    this.points = this.points % 100;
    this.lives++;
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//translates player key input to numerical values for position update
//this is actually doing the updating now.....not ideal - I know, but it allows the "isTouching"
//function to work universally for all objects (very convenient). it saves the previous position, so //you can back out changes in update method if player tries to move to a disabled tile
Player.prototype.handleInput = function(keyVal){
  if(!gameover){
    switch(keyVal){
      case 'up':
        this.lastY = this.y;
        this.lastX = this.x;
        this.y -= 83;
        break;
      case 'down':
        this.lastY = this.y;
        this.lastX = this.x;
        this.y += 83;
        break;
      case 'left':
        this.lastY = this.y;
        this.lastX = this.x;
        this.x -= 101;
        break;
      case 'right':
        this.lastY = this.y;
        this.lastX = this.x;
        this.x += 101;
        break;
    }
  }
};

//rock obstacles that appear as level increases. bugs can climb OVER
//but players can not. Accepts a parameter 1-4 that renders rock at diferent start pos
var RockObject = function(rockNum){
  //set image
  this.sprite = 'images/Rock.png';

  //set postition
  if(rockNum === 1){
    this.x = tileGridX[1];
    this.y = tileGridY[2]-16;
  }else if(rockNum === 2){
    this.x = tileGridX[3];
    this.y = tileGridY[2]-16;
  }else if(rockNum === 3){
    this.x = tileGridX[1];
    this.y = tileGridY[4]-16;
  }else if(rockNum === 4){
    this.x = tileGridX[3];
    this.y = tileGridY[4]-16;
  }
};

RockObject.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//creates the star object in a random position over water tiles.
var Star = function(){
  //set image
  this.sprite = "images/Star.png"
  var random = Math.floor(Math.random() * 4.9)
  this.x = tileGridX[random];
  this.y = tileGridY[0];
  //var for bouncing
  this.bounceVal = -1;
};

Star.prototype.update = function(dt){
  bounce(this, dt);
}

Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Base class for power up objects
var PowerUp = function(){
  //toggle powerup on or off
  this.on = true;
  //available powerup postions. this excludes rock spaces, grass and water
  var pos = [[0,1], [1,1],[2,1],[3,1],[4,1],
              [0,2],[2,2],[4,2],
                [0,3],[1,3],[2,3],[3,3],[4,3]];
  //select a random position from pos array and use for tileGrid lookup
  var random = Math.floor(Math.random() * (pos.length - .1))
  this.x = tileGridX[pos[random][0]];
  this.y = tileGridY[pos[random][1]];
  this.bounceVal = -1;
};

PowerUp.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x + 20, this.y + 25, 60, 107);
};

PowerUp.prototype.update = function(dt){
  bounce(this, dt);
}

//derived classes for individual power-up types
var Heart = function(){
  PowerUp.call(this);
  this.sprite = 'images/Heart.png';
}

inherit(Heart, PowerUp);

var BlueGem = function(){
  PowerUp.call(this);
  this.sprite = 'images/Gem Blue.png';
}

inherit(BlueGem, PowerUp);

var GreenGem = function(){
  PowerUp.call(this);
  this.sprite = 'images/Gem Green.png';
}

inherit(GreenGem, PowerUp);

var OrangeGem = function(){
  PowerUp.call(this);
  this.sprite = 'images/Gem Orange.png';
}

inherit(OrangeGem, PowerUp);

//used for putting text in the game for level up and power up messages
var GameText = function(){
  this.text = "";
  this.fade = true;
  this.fadeRate = .02;
  this.x = 100;
  this.y = CANVAS_HEIGHT/2;
  this.on = false;
  this.alpha = 0
  this.fontsize = "60px";
}

//if fade.on is true, text fades
GameText.prototype.update = function(){
  if(this.fade){
    this.alpha -= this.fadeRate;
    this.y -= .3;
    if(this.alpha <= 0){
      text.on = false;
      this.y = CANVAS_HEIGHT/2;
    }
  }
}

GameText.prototype.render = function(){
  ctx.fillStyle = "rgba(0, 0, 0, " + this.alpha +")";
  ctx.font = 'bold '+this.fontsize+' Courier New';
  ctx.fillText(this.text, this.x, this.y);
}

//method for displaying new in-game message. boolean fade toggles fade effect
GameText.prototype.newMessage = function(string, fade){
  this.text = string;
  this.fade = fade;
  this.alpha = 1;
  text.on = true;
}

//creates and tracks game stats at top of game
var StatsText = function(){
  this.lives = player.lives;
  this.points = player.points;
  this.level = player.level
  this.x = 150;
  this.y = 40;
}

StatsText.prototype.update = function(){
  this.lives = player.lives.toString();
  this.points = player.points.toString();
  this.level = player.level.toString();
}

StatsText.prototype.render = function(){
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.font = 'bold 20px Courier New';
  ctx.fillText("Level: " + this.level + " Points: " + this.points +
                  " Lives: " + this.lives, this.x, this.y);
}

//contains info for rendering menu at game start.
var GameMenu = function(){
  this.on = true;
  this.gameTitleText = "BUG RUN";
  this.gameDescText = "Avoid bugs, collect gems, and reach the star!";
  this.sprite1 = 'images/char-boy.png';
  this.sprite2 = 'images/char-horn-girl.png';
  this.spriteSelected = 'images/char-horn-girl.png';
  this.selector = 'images/Selector.png';
  this.selectorX = tileGridX[1];
  this.selectorY = tileGridY[4];

}

//used to let player select sprite and start/reset game
GameMenu.prototype.handleInput = function(keyVal){
  //at gameover screen, waiting for reset
  //user presses enter and this reboots the game
  if(gameover && !gamemenu.on && keyVal === 'enter'){
    reset();
  }else if(gamemenu.on){
    switch(keyVal){
      //choose player sprite
      case 'left':
        //select char-horn-girl
        this.spriteSelected = 'images/char-horn-girl.png';
        this.selectorX = tileGridX[1];
        this.selectorY = tileGridY[4];
        break;
      case 'right':
        this.spriteSelected = 'images/char-boy.png';
        this.selectorX = tileGridX[3];
        this.selectorY = tileGridY[4];
        break;
      //start playing
      case 'enter':
        player.sprite = this.spriteSelected;
        gamemenu.on = false;
        gameover = false;
        text.newMessage("Level:" + player.level.toString(), true);
        break;
    }
  }
}

GameMenu.prototype.render = function(){
  //draw background
  ctx.fillStyle = "#5F9EA0";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  //draw the title
  ctx.fillStyle = "rgba(0, 0, 0, 1 )";
  ctx.font = 'bold 100px Courier New';
  ctx.fillText(this.gameTitleText, 50, 100);
  //write description
  ctx.font = '18px Courier New';
  ctx.fillText(this.gameDescText, 10, 130);
  //char selection
  ctx.font = '12px Courier New';
  ctx.fillText("Select Character:", 180, 300);
  //draw sprite options & selector
  ctx.drawImage(Resources.get(this.selector), this.selectorX, this.selectorY);
  ctx.drawImage(Resources.get(this.sprite1), tileGridX[3], tileGridY[4]);
  ctx.drawImage(Resources.get(this.sprite2), tileGridX[1], tileGridY[4]);
  //press enter to begin
  //char selection
  ctx.font = '12px Courier New';
  ctx.fillText("PRESS ENTER TO BEGIN", 165, 550);
}

//bug for walking accross start screen. used this as an experiment to see if I could
// get the bug to walk randomly over the screen.
var RandomWalker = function(){
  this.x = tileGridX[(Math.floor(Math.random()*5))];
  this.y = tileGridY[(Math.floor(Math.random()*6))];
  this.sprite = "images/enemy-bug.png";
  this.theta = 0;
  this.count = 0;
  this.rand = 0.1;
  this.flip = 1; //for flipping sprite image
}

RandomWalker.prototype.render = function(){
  ctx.save();
  ctx.translate((this.x), this.y);
  ctx.scale(1, this.flip);
  ctx.rotate(this.flip*this.theta*(Math.PI/180));
  ctx.drawImage(Resources.get(this.sprite), -50, -105 );
  ctx.restore();
}

RandomWalker.prototype.update=function(dt){

  if(this.count === 0 || this.count % 70 === 0){
    this.rand = Math.random();
    }

  //increment counter
  this.count++;

  // this.theta++;
  //use rand to increment bugs angle
  if(this.rand < .30){
    this.theta++;
  }else if (this.theta > 0.70){
    this.theta--;
  }

  //convert theta/angle to 1-360 degree range
  if(this.theta < 0){
    this.theta += 360;
  }else if(this.theta >= 360){
    this.theta -= 360;
  }

  //flip/reflect bug sprite if we are pointed left
  if(this.theta > 90 && this.theta < 270){
    this.flip = -1
  }else{
    this.flip = 1;
  }

  //increment bug position based on angle
  this.x += Math.cos(this.theta *(Math.PI/180));
  this.y += Math.sin(this.theta *(Math.PI/180));

  //bounds checking and shifting accross canvas
  if(this.x > CANVAS_WIDTH){
    this.x -= CANVAS_WIDTH;
  }
  if(this.x < 0){
    this.x += CANVAS_WIDTH;
  }
  if (this.y > CANVAS_HEIGHT){
    this.y -= CANVAS_HEIGHT;
  }
  if(this.y < 0){
    this.y += CANVAS_HEIGHT;
  }

}

//******************* Game Helper Methods **********************************
//**************************************************************************

// This listens for key presses and sends the keys to your
// Player.handleInput() method, it will also be used to send input
//during gameover state and initial game menu.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };
//call player input handler
player.handleInput(allowedKeys[e.keyCode]);

//call game menu input handler
if(gameover || gamemenu.on){
  gamemenu.handleInput(allowedKeys[e.keyCode]);
}

});

//power-up generator
function renderRandomPowerup(){
  var random = Math.floor((Math.random() * 4) +1)

  switch(random){
    case 1:
      powerup = new Heart();
      //Heart.prototype.constructor = Heart;
      break;
    case 2:
      powerup = new GreenGem();
    //  powerup.prototype.constructor = GreenGem;
      break;
    case 3:
      powerup = new BlueGem();
  //    powerup.prototype.constructor = BlueGem;
      break;
    case 4:
      powerup = new OrangeGem();
    //  powerup.prototype.constructor = OrangeGem;
      break;
  }
}

//checks player level and returns true if rock objects should be enabled
function rocksEnabled(){
  if(player.level > 2){
    return true;
  }else{
    return false;
  }
}

//enables and disables individual tiles. rocks are disabled tiles, and water
//is only enabled if it has the star on it. All out of bounds tiles are disabled.
function tileEnabled(obj){

  if(rocksEnabled()){
      //check on rock objects
      //rock 1
      if (isTouching(obj, rock1)){
        return false;
      //rock 2
      }else if(isTouching(obj, rock2)){
        return false;
      }else if(player.level > 4){
        //rock3
        if (isTouching(obj, rock3)){
          return false;
        //rock 4
        }else if(isTouching(obj, rock4)){
          return false;
        }
      }
   }
  //check on star
  if(isTouching(obj, star)){
    return true;
  }else if(inBounds(obj)){
    return true;
  }else{
    return false;
  }
}

//returns true is one object is touching another.
function isTouching(thing, obj){
  if (thing.x > obj.x - 70 && thing.x < obj.x + 50 &&
        thing.y < obj.y + 70 && thing.y > obj.y -65){
    return true;
  }else{
    return false;
  }
}

//returs false if an object moves off the canvas
function inBounds(obj){
  if(obj.x < 505 && obj.x > -100 &&
      obj.y < 415 && obj.y > 50){
        return true;
      }else{
        return false;
      }
}

//this function lets game objects 'bounce' up and down. It requires that they
//have a bounceval attribute in their class definition.
function bounce(obj, dt){
  if(obj.bounceVal > -20 && obj.bounceVal < 0){
    obj.y += obj.bounceVal * dt;
    obj.bounceVal--;
  }else if(obj.bounceVal >= 0 && obj.bounceVal < 20) {
    obj.y += obj.bounceVal * dt;
    obj.bounceVal++;
  }else{
    obj.bounceVal /= -20;
  }

}

//pseudocassical inheritance
//subclass will inherit from superclass
function inherit(subClass, superClass){
  subClass.prototype = Object.create(superClass.prototype); //delegate to prototype
  subClass.prototype.constructor = subClass; //set constructor on prototype
}


//******************** Object Instantiation Calls ***************************
//***************************************************************************

var gamemenu = new GameMenu();
var allwalkers = [new RandomWalker(), new RandomWalker(), new RandomWalker()];
var player = new Player();
var text = new GameText();
var stats = new StatsText();

var allEnemies = [new Enemy(), new Enemy()];
//add new enemies based on game level
for (var i = 0; i < player.level && i < 6; i++){
  allEnemies.push(new Enemy());
}

if(rocksEnabled()){
  var rock1 = new RockObject(1);
  var rock2 = new RockObject(2);
  if(player.level > 4){
    var rock3 = new RockObject(3);
    var rock4 = new RockObject(4);
  }
}

var star = new Star();

renderRandomPowerup();
