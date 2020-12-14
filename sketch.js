//Create variables here
var doghappy, dogsad, dog;
var db;
var foodS, foodStock;
function preload()
{
  //load images here
  dogsad = loadImage("images/dogImg.png")
  doghappy = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  db = firebase.database();

  dog = createSprite(250,300, 100,100);
  dog.addImage(dogsad);
  dog.scale =0.1;

  foodStock = db.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
background(46,139,87);
if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(doghappy);

}

  drawSprites();
  //add styles here
fill("red");
text("Food Remaining :" + foodS, 170,200);
textSize(13);
text("Press up arrow key to feed Drago milk", 130,10);
}


function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0
  }
  else{
    x = x-1
  }
  db.ref('/').update({
    Food:x
  })
}
