var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud_group, cloud_image; 
var obstacle_group, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score = 0;
var gamestate, PLAY = 1, END = 0;
var gameOver, Restart, gameOver_Image, Restart_Image;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  
  cloud_image = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  gameOver_Image = loadImage("gameOver.png")

  Restart_Image = loadImage("restart.png")
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width/2;
  ground.velocityX = -(6+3*score/100);
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  gameOver = createSprite(300, 100);
  gameOver.addImage(gameOver_Image);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  Restart = createSprite(300,140);
  Restart.addImage(Restart_Image);
  Restart.scale = 0.5;
  Restart.visible = false;

  textSize(18);
textFont("Georgia");
  
  cloud_group = new Group();
  
  obstacle_group = new Group(); 
}

function draw() {
  background(255);
  
  

  text("Score: "+ score, 500, 50);
  
  if(gamestate === PLAY){
  	 if(keyDown("space") && trex.y >= 159) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8;

  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    score = score + Math.round(getFrameRate()/60);
  
  spawnObstacles();
  spawnClouds();

  if(obstacle_group.isTouching(trex)){
  	gamestate = END;

  }

  
  }
  else if(gamestate === END){
  	ground.velocityX = 0;
  	trex.velocityY = 0;
  	gameOver.visible = true;
  	Restart.visible = true;
  	cloud_group.setVelocityXEach(0);
  	obstacle_group.setVelocityXEach(0);
  	trex.changeAnimation("collided", trex_collided);
  	obstacle_group.setLifetimeEach(-1);
  	cloud_group.setLifetimeEach(-1);

  	if(mousePressedOver(Restart)){
  		Reset();
  	}
  }

  trex.collide(invisibleGround);
 
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6+3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
      break;
      case 2: obstacle.addImage(obstacle2);
      break;
      case 3: obstacle.addImage(obstacle3);
      break;
      case 4: obstacle.addImage(obstacle4);
      break;
      case 5: obstacle.addImage(obstacle5);
      break;
      case 6: obstacle.addImage(obstacle6);
      break;
      default: break;
    }
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstacle_group.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloud_image);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloud_group.add(cloud);
  }
  
}

function Reset() {
	gamestate = PLAY;
	gameOver.visible = false;
	Restart.visible = false;
	obstacle_group.destroyEach()
	cloud_group.destroyEach()
	trex.changeAnimation("running", trex_running);
	score = 0;
}
