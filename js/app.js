const enemyPositionX = 0,
      enemyPositinY = 63, 
      enemyRangeMax = 505,
      enemyWidth = 101,
      enemyHeight = 171,
      enemyLoopStartPosition = -90,
      enemyQuantity = 3,
      enemySpriteOffsetY = 81,
      enemyCollisionHeight = 60,
      heroSize = 81,
      heroPositionX = 202,
      heroPositionY = 400,
      heroSpriteOffsetX = 11,
      heroSpriteOffsetY = 60,
      heroMoveX = 101,
      heroMoveY = 83,
      heroWidth = 101,
      heroHeight = 171,
      heroMoveRange =[[-20,-20],
                      [505,450]];
      var score=0;


    


const getRandomSpeed = function() {
    return (Math.random()*250)+80;
};
const createEnemies = function(num){
    let enems = [];
    for(let i = 0; i < num;i++){
        enems.push(new Enemy(enemyPositionX,enemyPositinY+81*i, getRandomSpeed()));    
    }
    return enems;
}

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    this.x  = x;
    this.y = y;
    this.speed = speed;
    this.collisionY = this.y + enemySpriteOffsetY;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    if(this.x>enemyRangeMax){
        this.x = enemyLoopStartPosition;
        this.speed = getRandomSpeed();
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
    this.collisionX = this.x + heroSpriteOffsetX;
    this.collisionY = this.y + heroSpriteOffsetY;
    this.sprite = 'images/char-cat-girl.png';
};
Player.prototype.update = function(){
    this.x = this.x;
    this.y= this.y;
    this.collisionX = this.x + heroSpriteOffsetX;
    this.collisionY = this.y + heroSpriteOffsetY;
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

var checkCollisions = function(){
    var collides = false; 
    if(player.y <68){
        player.x = heroPositionX;
        player.y = heroPositionY;
        score +=1;
        console.log( 'Your score: ' + score );
    } 
    
    allEnemies.forEach(enemy => {
        if(player.collisionX <= enemy.x + enemyWidth &&
           player.collisionX + heroSize >= enemy.x &&
           player.collisionY <= enemy.collisionY + enemyCollisionHeight &&
           player.collisionY + heroSize >= enemy.collisionY) {
           collides = true;
        };
    });
    if(collides == true) {
        score = 0;
        player.x = heroPositionX;
        player.y = heroPositionY;
        console.log('You loose:c... Your score: ' + score);
    }     
}