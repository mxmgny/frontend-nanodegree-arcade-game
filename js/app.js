const enemyPositionX = 0,
      enemyPositinY = 63, 
      enemyRangeMax = 505;
      enemyLoopStartPosition = -90;
      enemyQuantity = 3;
      heroPositionX = 202,
      heroPositionY = 400,
      heroMoveX = 101,
      heroMoveY = 83,
      heroMoveRange =[[-20,-20],
                      [505,450]];
    

const getRandomSpeed = function() {
    return (Math.random()*250)+80;
};
const createEnemies = function(num){
    let enems = [];
    for(let i = 0; i < num;i++){
        enems.push(new Enemy(enemyPositionX,enemyPositinY+81*i, getRandomSpeed()));    
    }
    console.log(enems);
    return enems;
}

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    this.x  = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    if(this.x>enemyRangeMax){
        this.x = enemyLoopStartPosition;
    };
    this.x += this.speed * dt;
};
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = heroPositionX;
    this.y = heroPositionY;
    this.sprite = 'images/char-cat-girl.png';
};
Player.prototype.update = function(){
    this.x = this.x;
    this.y= this.y;
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(input){
    switch (input) {
        case 'left':
            if( this.x - heroMoveX > heroMoveRange[0][0] ){
                this.x -= heroMoveX;   
            }
            break;
        case 'up':
        if( this.y - heroMoveY > heroMoveRange[0][1] ){
            this.y -= heroMoveY;
        }
            break;
            case 'right':
            if( this.x + heroMoveX < heroMoveRange[1][0] ){
                this.x += heroMoveX;
            }
            break;
            case 'down':
            if( this.y + heroMoveY <= heroMoveRange[1][1] ){
                this.y += heroMoveY;
            }
                break;
        default:
            break;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = createEnemies(enemyQuantity);

var player = new Player();

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