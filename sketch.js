var player;
var enemy;

var player_image;
var enemy_image;
var background_image;
var playerBullet_image;

var bgm;
var damegeSound;
var playerDamegeSound;

var playerBullet;

var enemyGroup;
var playerBulletGroup;



//mission.1 プレイヤーが動くようにしよう！！
var PlayerSpeed = 5;


var BulletSpeed = 7;
var EnemySpeed = 5;

var spawnEnemyIntervalTimer = 1500;
var shottingBulletIntervalTimer = 300;


//mission.2 敵を作ろう！！
var enemyNum = 4;



//mission.5 BGMをつけよう
var bgmON = true;


var GameMode = "GameStarting";
var spawnInterval;
var shotInterval;



function preload() {
  player_image = loadImage("assets/images/EditedCat.png");
  playerBullet_image = loadImage("assets/images/Bullet.png");
  background_image = loadImage("assets/images/Background.jpg");
  enemy_image = loadImage("assets/images/enemy.png");


  //mission.4 なんかおかしい音を変えよう
  damegeSound = loadSound("assets/sound/Damege.mp3");


  bgm = loadSound("assets/sound/BGM.mp3");
  playerDamegeSound = loadSound("assets/sound/PlayerDamege.mp3")
}
function setup() {
  createCanvas(700, 700);

  player = createSprite(width / 2, 625);
  player.addImage(player_image);
  player.setCollider();

  enemyGroup = new Group();
  playerBulletGroup = new Group();

  if(bgmON == true){
    bgm.play();
  }

}

function spawnEnemy () {
  
    var RondomNum = Math.random() * (width -40) + 10;

    enemy = createSprite(RondomNum, 40);
    enemy.addImage(enemy_image);
    enemy.velocity.y = EnemySpeed;
    enemy.setCollider();
    enemyGroup.add(enemy);
    spawndEnemyNum++;

};

function shottingBullet() {
  playerBullet = createSprite(player.position.x, player.position.y - 20);
  playerBullet.addImage(playerBullet_image);
  playerBullet.setCollider();
  playerBullet.velocity.y = -BulletSpeed;
  playerBulletGroup.add(playerBullet);
};

function GameOver(){
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

    spawnInterval = setInterval(spawnEnemy,spawnEnemyIntervalTimer);
    shotInterval = setInterval(shottingBullet,shottingBulletIntervalTimer);
  }
}

function draw() {
  background(220);
  image(background_image, 0, 0);

  if(GameMode == "GameStarting"){
    return GameStart();
  }
  if(GameMode == "GameOver"){
    GameOver();
  }

  if (keyIsDown(RIGHT_ARROW) === true) {
    if (player.position.x <= 600) {
      player.position.x += PlayerSpeed;
    }
  }

  if (keyIsDown(LEFT_ARROW) === true) {
    if (player.position.x >= 60) {
      player.position.x -= PlayerSpeed;
    }
  }

  playerBulletGroup.overlap(enemyGroup, function (bullet, enemy) {
    enemy.remove();
    bullet.remove();

    //mission.3 敵が倒されたら音をなるようにしよう!!
    damegeSound.play();
  });

  enemyGroup.overlap(player, function (enemy, player) {
    playerDamegeSound.play();
    player.remove();
    enemy.remove();
    GameMode = "GameOver"
  });

  drawSprites();

}
