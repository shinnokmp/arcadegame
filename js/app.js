document.body.onload = startTimer();
let playerName = prompt("Input player name");
let times = prompt("Set Timer \n How many minutes do you wish to play? \n For unlimted timer, clear input", "1");
var timerValue = parseInt(times, 10);
document.body.onload = playerName;
document.body.onload = times;

// Enemies our player must avoid
var Enemy = function(row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    
    this.x = -100;
    this.y = 60 + (row - 1) * 80;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 500) this.x = -100;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {

    this.x = 200;
    this.y = 380;
    this.score = 0;

    this.sprite = ['images/char-boy.png'];

};

Player.prototype.update = function() {
    this.x = 200;
    this.y = 380;
    this.score = this.score + 1;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) { 

    if ( key === 'left' ) {
        if ( this.x > 0 ) {
            this.x = this.x - 100;
        }
    } else if ( key === 'right' ) {
        if ( this.x < 400 ) {
            this.x = this.x + 100;
        }
    } else if ( key === 'up' ) {
        if ( this.y > 0 ) {
            this.y = this.y - 80;
        }
    } else if ( key === 'down') {
        if ( this.y < 380 ) {
            this.y = this.y + 80;
        } 
    }
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
    this.score = this.score - 1;    
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

for (var i = 0; i < 7; i++) {
    var random_speed = getRandomNumber(10, 31) * 10;
    var random_row = getRandomNumber(1, 4);
    allEnemies[i] = new Enemy(random_row, random_speed);
};

var player = new Player();

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Integrating a manual timer into my arcade app
    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";

var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
        interval = setInterval(function(){
        timer.innerHTML = `${minute} mins ${second} secs`;
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
        if (minute == timerValue){
            alert(`Time Elapsed! \n Your Score is ${player.score}. \n Congratulations!!!`);
            document.location.reload(true);  
        }
    },1000);
};

//Displaying Player name on the page
let playingName = document.querySelector("#name");
playingName.innerHTML = "Warrior " + playerName;