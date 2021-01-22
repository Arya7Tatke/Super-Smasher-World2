var ground, groundImg;
var smasher, smasherImg;
var dwarf, dwarfImage;
var coin, coinImg;
var clouds, cloudImg;
var cloudsGroup, dwarfGroup;
var gameState=0, PLAY=1, END=2, START=0;
var score=0;
var count, coinCount=0;
var invisGround, bullet, bulletImg;
var bulletGroup, coinGroup, blocksGroup;
var gameOver, gameOverImg, restart, restartImg, play, playImg, bg, bgImg, marioRunImg;
var pipe, pipeGroup, pipe1, pipe2, blocks, blocksImage;
var form;


function preload(){

    smasherImg= loadAnimation("images/mario1.png", "images/mario2.png");
    dwarfImage= loadImage("img/spiny dwarf+.png");
    pipe1= loadImage("images/pipes.png");
    pipe2= loadImage("img/pipe2.png");
    coinImg= loadImage("img/sboy coin.png");
    cloudImg= loadImage("img/cloud.png");
    groundImg= loadImage("img/sboy background.jpg");
    playImg=loadImage("img/sboy play.JPG");
    bgImg=loadImage("images/sprite_0.png")
    marioRunImg=loadImage("img/Sboy runner.gif");
    restartImg=loadImage("img/rstart.png");
    gameOverImg=loadImage("images/gameOver.png");
    blocksImage= loadImage("img/block break.jpg");
    bulletImg=loadImage("images/bullet.png");
}





function setup(){
    
    createCanvas(1200, 400);
    
    ground=createSprite(600,270, 1200, 10);
    ground.addImage(groundImg)
  
    invisGround=createSprite(600, 395, 1200, 10);
    bg=createSprite(600, 100, 1200, 10);
    bg.addImage(bgImg);
    bg.scale=1.5;
    
    bg.visible=false;
    smasher=createSprite(200, 380, 10, 25);
    smasher.addAnimation("running", smasherImg)
    smasher.scale=0.30;
    smasher.visible=false;
    
    //bullet=createSprite(200, 200);
    

    gameOver=createSprite(600, 150);
    gameOver.addImage(gameOverImg);
    gameOver.scale=0.5;
    gameOver.visible=false;
    restart=createSprite(600, 300);
    restart.addImage(restartImg);
    restart.scale=0.5;
    restart.visible=false;

    play=createSprite(600, 300);
    play.addImage(playImg);
  // play.visible=false;

    pipesGroup= new Group();
    coinGroup= new Group();
    bulletGroup= new Group();
    dwarfGroup= new Group();
    cloudsGroup= new Group();
    blocksGroup= new Group();
    //form= new Form();

    
}



function draw(){
if(gameState===START){
 //   background(groundImg);
    
    //form.display();

    if(mousePressedOver(play)){
        gameState=PLAY;
            }
}
//clouds.depth=smasher.depth;
//coins.depth=smasher.depth+1;
//smasher.depth+=2;

console.log(coinCount);
background("skyblue");
if(gameState===PLAY){
   
   ground.visible=false; 
   smasher.visible=true;
   bg.visible=true;
  play.visible=false;
    bg.velocityX=-5
    
if(bg.x<0){
   bg.x=bg.width/2;
}

if(keyDown("RIGHT_ARROW")){

 
    smasher.x=smasher.x+15;

}

if(keyDown("LEFT_ARROW")){

 
    smasher.x=smasher.x-15;

}



if(keyDown("SPACE")&& smasher.y>280){
    smasher.velocityY=-20;

}
smasher.velocityY+=1;

spawnPipes();
spawnClouds();
spawnCoins();
spawnDwarves();
spawnBlocks();
spawnBullets();
smasher.collide(blocksGroup);
//if(dwarfGroup.isTouching(pipeGroup)){
  //  dwarfGroup.destroyEach();
//}
if(pipesGroup.isTouching(smasher)){
    score=score-1;
    count=count-5;
    gameState=END;
}
if(dwarfGroup.isTouching(smasher)){
    score=score-1;
    count=count-5;
    gameState=END;
}
if(bulletGroup.isTouching(dwarfGroup)){
    score=score+1;
    bulletGroup.destroyEach();
    dwarfGroup.destroyEach();
}


for(var j=0; j<coinGroup.length; j++){
    if(coinGroup.isTouching(smasher)){
        coinGroup.get(j).destroy()
        coinCount=coinCount+1;
    
    }
    
}
}
 else if(gameState===END){

    ground.velocityX=0;
    
    cloudsGroup.setVelocityXEach(0);
    pipesGroup.setVelocityXEach(0);
    dwarfGroup.setVelocityXEach(0);    
    cloudsGroup.setLifetimeEach(-1);
    pipesGroup.setLifetimeEach(-1);
    dwarfGroup.setLifetimeEach(-1);
    coinGroup.setVelocityXEach(0);
    coinGroup.setLifetimeEach(-1);
    blocksGroup.setVelocityXEach(0);
    smasher.velocityX=0;
    smasher.velocityY=0;
   // gameOver.visible=true;
   restart.visible=true;
   gameOver.visible=true;
 }

 if(mousePressedOver(restart)){
     reset();
    
    }


smasher.collide(invisGround);

drawSprites()
textSize(30);
strokeWeight(4);
stroke("red");
text("Coins: "+ coinCount, 1070, 50);
text("Press Space To Jump", 50, 50)
text("Press 'b' to throw bomb", 50, 100)
}

function spawnClouds(){

    if(frameCount% 160===0){
        clouds=createSprite(1200, random(30, 100), 10, 10);
        clouds.addImage(cloudImg);
        clouds.scale=0.2;
        clouds.velocityX=-2;
        clouds.lifetime=600;
        cloudsGroup.add(clouds)
    }

}

function spawnDwarves(){
    if(frameCount% 320===0){
        var rand= Math.round(random(1,2,3));
        if (rand===1){
            dwarf=createSprite(1200, 355, 40, 10);
            dwarf.addImage(dwarfImage);
            dwarf.scale=0.03;
            dwarf.velocityX=-2;
            dwarf.lifetime=600;
            dwarfGroup.add(dwarf)
        }
        else if(rand===2){
            for(var a=0; a<2; a++){
                dwarf=createSprite(1200+a*77, 355, 40, 10);
                 dwarf.addImage(dwarfImage);
                  dwarf.scale=0.03;
             dwarf.velocityX=-2;
        dwarf.lifetime=600;
        dwarfGroup.add(dwarf)
            }
            }  
            else if(rand===3){
                for(var a=0; a<3; a++){
                    dwarf=createSprite(1200+a*77, 355, 40, 10);
                     dwarf.addImage(dwarfImage);
                      dwarf.scale=0.03;
                 dwarf.velocityX=-2;
            dwarf.lifetime=600;
            dwarfGroup.add(dwarf)
            }
        }
    
    }
}

function spawnPipes(){
    if(frameCount% 237===0){
        pipes=createSprite(1200, 340, 10, 50);
        var rad=Math.round(random(1,2));
        if(rad===1){
            pipes.addImage(pipe1)
            pipes.scale=0.4
        }
        else if(rad===2){
            pipes.addImage(pipe2)
            pipes.scale=0.3;
        }
      //  pipes.scale=0.3
        pipes.velocityX=-2;
        pipes.lifetime=600;
        pipesGroup.add(pipes)
    }
}

function spawnCoins(){
    if(frameCount% 200===0){
        var ra=Math.round(random(1,3));
        console.log(ra);
        if(ra===1){

        
        for(var i=0; i<5; i++){
        coins=createSprite(1200+i*40,random(120, 150), 15, 20);
        coins.addImage(coinImg)
        coins.scale=0.07;
        coins.velocityX=-2;
        coins.lifetime=600;
        coinGroup.add(coins);
        clouds.depth=coins.depth;
        coins.depth+=1;
        }
    }
   else if(ra===2){

        
        for(var i=0; i<3; i++){
        coins=createSprite(1200+i*40,random(120, 150), 15, 20);
        coins.addImage(coinImg)
        coins.scale=0.07;
        coins.velocityX=-2;
        coins.lifetime=600;
        coinGroup.add(coins)
        clouds.depth=coins.depth;
        coins.depth+=1;
        }
    }

   else if(ra===3) {

        
        for(var i=0; i<2; i++){
        coins=createSprite(1200+i*40,random(120 ,150), 15, 20);
        coins.addImage(coinImg)
        coins.scale=0.07;
        coins.velocityX=-2;
        coins.lifetime=600
        coinGroup.add(coins)
        clouds.depth=coins.depth;
        coins.depth+=1;
        }
    }
    }
    }


function reset(){
    restart.visible=false;
    gameState=PLAY;
    coinCount=0;
    gameOver.visible=false;
    pipesGroup.destroyEach()
    coinGroup.destroyEach()
    cloudsGroup.destroyEach()
    dwarfGroup.destroyEach()
    blocksGroup.destroyEach();
    bulletGroup.destroyEach();
}

function spawnBlocks(){
    if(frameCount% 195===0){
        blocks=createSprite(1200, 250, 10, 50);
        var rad=Math.round(random(1,2));
        if(rad===1){-
            blocks.addImage(blocksImage)
        }
        else if(rad===2){
            blocks.addImage(blocksImage)
        }
        blocks.scale=0.6
        blocks.velocityX=-2;
        blocks.lifetime=600;
        blocksGroup.add(blocks)
    }
}


function spawnBullets(){
    if(keyWentDown("b")){
        bullet=createSprite(100, 100, 10, 10);
        bullet.addImage(bulletImg);
        bullet.x=smasher.x;
        bullet.y=smasher.y+15;
        bullet.lifetime=80;
        bullet.velocityX=5;
        bulletGroup.add(bullet);

    }

}




