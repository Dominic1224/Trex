var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, clouds, cloudImage
var score = 0
var PLAY = 1
var END = 0
var gameState = PLAY
var msg = ("This is a message")
var restart
var gameOver
function preload() {

    trex_running =  loadAnimation("trex1.png", "trex3.png", "trex4.png");
    trex_collided = loadImage("trex_collided.png");
    groundImage =   loadImage("ground2.png");
    cloudImage =    loadImage("cloud.png");
    obstacle1 =     loadImage("obstacle1.png")
    obstacle2 =     loadImage("obstacle2.png")
    obstacle3 =     loadImage("obstacle3.png")
    obstacle4 =     loadImage("obstacle4.png")
    obstacle5 =     loadImage("obstacle5.png")
    obstacle6 = loadImage("obstacle6.png")
    restartImage =  loadImage("restart.png")
    gameOverImage = loadImage("gameOver.png")
    die_sound = loadSound("die.mp3")
    checkPoint_sound = loadSound("checkPoint.mp3")
    jump_sound = loadSound("jump.mp3")
}

function setup() {
    createCanvas(600, 200);


//create a trex sprite
    trex = createSprite(50,160,20,50);
    trex.addAnimation("running", trex_running);
    trex.addAnimation("collided", trex_collided);
    trex.changeAnimation("running")
    trex.scale = 0.5;
    
trex.setCollider("circle",0,0,60)

//create a ground sprite
    ground = createSprite(200,180,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    ground.velocityX = -(6 +score/100);
    
    invisibleGround = createSprite(200,200,400,20)

    restart = createSprite(300,100)
    restart.addImage("restart",restartImage)
    restart.scale = 0.5
    gameOver = createSprite(300,140)
    gameOver.addImage("gameOver",gameOverImage)
    gameOver.scale = 0.5

    //creating groups
    obstacles_Group = new Group();
    clouds_Group = new Group();

   
   
}

function draw() {

    background(160);
   
    textSize(16)
    stroke("black")
    text ("Score:" +score,500,20)

    
   
    if(gameState === PLAY){
        score = score+Math.round(getFrameRate()/60)
        restart.visible = false
        gameOver.visible = false
        if (keyDown("space") && trex.y >=140) {
            trex.velocityY = -10;
            jump_sound.play()
        }

        trex.velocityY = trex.velocityY + 0.8
        if (ground.x < 0) {
            ground.x = ground.width / 2;
        }
        invisibleGround.visible = false
        spawnClouds()
        spawnObstacles()

        if(obstacles_Group.isTouching(trex)){
            gameState =END;
            die_sound.play()
        }
        if(score%100==0 && score>0){
            checkPoint_sound.play()
        }

    
    }

    else if(gameState === END){
        ground.velocityX = 0
        trex.velocityY = 0
        clouds_Group.setVelocityXEach(0)
        obstacles_Group.setVelocityXEach(0)

        trex.changeAnimation("collided")
        clouds_Group.setLifetimeEach(-1)
        obstacles_Group.setLifetimeEach(-1)
        restart.visible = true
        gameOver.visible = true
        
        if(mousePressedOver(restart)){
            reset()
        }

        invisibleGround.visible = false
    }
    trex.collide(invisibleGround);
    
    drawSprites();
}

function spawnClouds(){
    var num2 = Math.round(random(30,70))
    if(frameCount%60==0){
    cloud = createSprite(600,num2,40,10);
    cloud.addImage(cloudImage);
    cloud.velocityX = -4;
    cloud.lifetime = 200;
    cloud.scale = 0.1;
    clouds_Group.add(cloud);
    trex.depth = cloud.depth+1;
    }
    
}
function spawnObstacles(){
    var num3 = Math.round(random(1,6))
    if(frameCount%80==0){
        obstacle = createSprite(600,170,10,30)
        obstacle.velocityX = -(6+score/100)
       
        obstacle.scale= 0.08
        obstacle.lifetime = 100
        obstacles_Group.add(obstacle);
        switch(num3){
            case 1:obstacle.addImage(obstacle1);
            break;
            case 2:obstacle.addImage(obstacle2);
            break;
            case 3:obstacle.addImage(obstacle3);
            break;
            case 4:obstacle.addImage(obstacle4);
            break;
            case 5:obstacle.addImage(obstacle5);
            break;
            case 6:obstacle.addImage(obstacle6);
            break;
            default:break;
        }

    }
}

function reset(){
    score = 0
    gameState = PLAY
    trex.changeAnimation("running")
    obstacles_Group.destroyEach()
    clouds_Group.destroyEach()
    ground.velocityX = -(6 +score/100)
    
}
