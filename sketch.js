var player;
var enemy = [];

var player_image;
var enemy_image = [];
var background_image;
var playerBullet_image;

var bgm;
var damageSound;
var playerDamageSound;
var winSound;

var playerBullet;

var enemyGroup;
var playerBulletGroup;

var enemyNum = 0;
var killedEnemyTotal = 0;
var bgmON = false;

var GameMode = "GameStarting";
var enemySpawnInterval;
var shotInterval;
var spawndEnemyNum;



var PlayerSpeed = 5;
var BulletSpeed = 6;
var EnemySpeed = 4;

var maxKillCount = 10;

var spawnEnemyIntervalTimer = 1.5;
var shottingBulletIntervalTimer = 0.3;

function preload() {
  playerImage = loadImage("assets/images/player.png")
  playerBullet_image = loadImage("assets/images/Bullet.png");
  background_image = loadImage("assets/images/Background.jpg");

  enemy_image[0] = loadImage("assets/images/enemy1.png");
  enemy_image[1] = loadImage("assets/images/enemy2.png");

  playerDamageSound = loadSound("assets/sounds/PlayerDamage.mp3");
  damageSound = loadSound("assets/sounds/Pagh.mp3");
  bgm = loadSound("assets/sounds/BGM.mp3");
  winSound = loadSound("assets/sounds/WinSound.mp3");
}

function setup() {
  createCanvas(700, 700);

  player = createSprite(width / 2, 625);
  player.addImage(playerImage);
  player.setCollider();

  enemyGroup = new Group();

  playerBulletGroup = new Group();

  if(bgmON == true){
    bgm.play();
  }
}

function spawnEnemy () {
  if(spawndEnemyNum < enemyNum){
    GameMode == "GameClear"
  }
    var RondomNum = Math.random() * width - 20;
    var EnemyRondomNum = Math.round(Math.random() * 1);
    
    switch (EnemyRondomNum){
      case 0:
        enemy[0] = createSprite(RondomNum, 20);
        enemy[0].addImage(enemy_image[0]);
        enemy[0].velocity.y = EnemySpeed;
        enemy[0].setCollider();
        enemyGroup.add(enemy[0]);
        break;
      case 1:
        enemy[1] = createSprite(RondomNum, 20);
        enemy[1].addImage(enemy_image[1]);
        enemy[1].velocity.y = EnemySpeed;
        enemy[1].setCollider();
        enemyGroup.add(enemy[1]);
        break;
    }
    spawndEnemyNum++;  
}

function shottingBullet() {
  playerBullet = createSprite(player.position.x, player.position.y - 20);
  playerBullet.addImage(playerBullet_image);
  playerBullet.setCollider();
  playerBullet.velocity.y = -BulletSpeed;
  playerBulletGroup.add(playerBullet);
}

function GameStart(){
  fill(255,255,255);
  textAlign(CENTER);
  rect(0, 210, 699, height/3);

  fill(0,0,0);
  textSize(40);
  textAlign(CENTER);
  text("Push Return Key",width/2,height/2);

  if(keyIsDown(13) === true){
    GameMode = "GamePlaying"
    
    enemySpawnInterval = setInterval(spawnEnemy,spawnEnemyIntervalTimer * 1000);

    shotInterval = setInterval(shottingBullet,shottingBulletIntervalTimer * 1000);


  }
}

function GameOver(){
  clearInterval(enemySpawnInterval);
  clearInterval(shotInterval);

  fill(255,255,255);
  textAlign(CENTER);
  rect(0, 210, 699, height/3);

    
  fill(0,0,0);
  textSize(50);
  textAlign(CENTER);
  text('GameOver',width/2,height/2);

  textSize(25);
  text('Push Return Key',width/2,height/2 + 70);


  if(keyIsDown(13) === true){
    window.location.reload();
  }
}

function GameClear(){
  if(killedEnemyTotal >= maxKillCount){
    clearInterval(enemySpawnInterval);
    clearInterval(shotInterval);

    fill(255,255,255);
    rect(0, 210, 699, height/3);
    textAlign(CENTER);
  
    fill(0,0,0);
    textSize(40);
    textAlign(CENTER);
    text("GameClear!!",width/2,height/2 - 30);
    text("Push Return Key",width/2,height/2 + 40);
  
    if(keyIsDown(13) === true){
      window.location.reload();
    }
  }
}

function MovingLeft(){
  if (player.position.x >= 60) {
    player.position.x -= PlayerSpeed;
  }
}
function MovingRight(){
  if (player.position.x <= 600) {
    player.position.x += PlayerSpeed;
  }
}

function draw() {
  background(220);

  image(background_image, 0, 0);

  fill(255,255,255);
  textSize(25);
  text("Goal: " + maxKillCount,490,50);
  text("KilledEnemy: " + killedEnemyTotal,490,100);

  if(GameMode == "GameStarting"){
    GameStart();
  }

  if(GameMode == "GameOver"){
    GameOver();
  }

  if (keyIsDown(RIGHT_ARROW) === true) {
    MovingRight();
  }

  if (keyIsDown(LEFT_ARROW) === true) {
    MovingLeft();
  }

  playerBulletGroup.overlap(enemyGroup, function (bullet, enemy) {
    damageSound.play();
    enemy.remove();
    bullet.remove();
    killedEnemyTotal++;

  });

  enemyGroup.overlap(player, function (enemy, player) {
    playerDamageSound.play();
    player.remove();
    enemy.remove();
    GameMode = "GameOver"
  });

  GameClear();
  drawSprites();
}
