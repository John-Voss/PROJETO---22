const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine;
var world;

var fairy, fairy_image;
var starBody, star, star_image;
var space;
var som;

function preload() {
    space = loadImage('starNight.png');
    fairy_image = loadImage('fairyImage1.png');
    star_image = loadImage('star.png');
    som = loadSound('JoyMusic.mp3');
}

function setup() {
    var canvas = createCanvas(600, 600);
    engine = Engine.create();
    world = engine.world;

    fairy = createSprite(300, 450, 100, 200);
    fairy.scale = 0.2;
    fairy.addImage('fairy_img', fairy_image);
    World.add(world, fairy);

    star = createSprite(500, 80, 20, 20);
    star.scale = 0.2;
    star.addImage('star_img', star_image);

    var options = {
        restitution: 1.0, 
        isStatic: true
    };
    starBody = Bodies.rectangle(500, 80, 5, 5, options);
    World.add(world, starBody);
}
function draw() {
    background(space);
    Engine.update(engine);

    //som.play();

    star.x = starBody.position.x;
    star.y = starBody.position.y;

    if(keyDown('left')) {
        fairy.x += -20;
    }
    if(keyDown('right')) {
        fairy.x += 20;
    }
    if(keyDown('down')) {
        Matter.Body.setStatic(starBody, false);
        fairy.x = 380;
    }
    if(starBody.position.y === 430 || starBody.position.y > 430){
        Matter.Body.setStatic(starBody, true);
    }
    rectMode(CENTER);
    rect(starBody.position.x, starBody.position.y, 5, 5);
    drawSprites();
}
