const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint = Matter.Constraint;
var paperObject1,paperObject2,paperObject3, paperObject4,paperObject5,topObject
var rope1,rope2,rope3, rope4,rope5;
var world;


function setup() {
	createCanvas(1600, 700);
	rectMode(CENTER);


	engine = Engine.create();
	world = engine.world;

	topObject= new top(width/2,height/4,width/7,20);

	paperDiameter=40;

	startpaperPositionX=width/2;
	startpaperPositionY=height/4+500;
	paperObject1=new paper(startpaperPositionX-paperDiameter*2,startpaperPositionY,paperDiameter);
	paperObject2=new paper(startpaperPositionX-paperDiameter,startpaperPositionY,paperDiameter);
	paperObject3=new paper(startpaperPositionX,startpaperPositionY,paperDiameter);
	paperObject4=new paper(startpaperPositionX+paperDiameter,startpaperPositionY,paperDiameter);
	paperObject5=new paper(startpaperPositionX+paperDiameter*2,startpaperPositionY,paperDiameter);
	
	
	//Create a Ground
	

	var render = Render.create({
	  element: document.body,
	  engine: engine,
	  options: {
	    width: 1200,
	    height: 700,
	    wireframes: false
	  }
	});


	rope1=new rope(paperObject1.body,topObject.body,-paperDiameter*2, 0)

	rope2=new rope(paperObject2.body,topObject.body,-paperDiameter*1, 0)
	rope3=new rope(paperObject3.body,topObject.body,0, 0)
	rope4=new rope(paperObject4.body,topObject.body,paperDiameter*1, 0)
	rope5=new rope(paperObject5.body,topObject.body,paperDiameter*2, 0)

	constraint1={
		bodyA:paperObject1.body,
		bodyB:topObject.body,
		pointB: {x:-paperDiameter*2, y:0}
	}
	constraint2={
		bodyA:paperObject2.body,
		bodyB:topObject.body,		
		pointB: {x:-paperDiameter, y:0}
	}
	constraint3={
		bodyA:paperObject3.body,
		bodyB:topObject.body,		
		pointB: {x:0, y:0}
	}
	constraint4={
		bodyA:paperObject4.body,
		bodyB:topObject.body,		
		pointB: {x:paperDiameter, y:0}	
	}
	constraint5={
		bodyA:paperObject5.body,
		bodyB:topObject.body,		
		pointB: {x:paperDiameter*2, y:0}
	}
	var pendulum1=Constraint.create(constraint1)
	var pendulum2=Constraint.create(constraint2)
	var pendulum3=Constraint.create(constraint3)
	var pendulum4=Constraint.create(constraint4)
	var pendulum5=Constraint.create(constraint5)
	World.add(world, pendulum1);
	World.add(world, pendulum2);
	World.add(world, pendulum3);
	World.add(world, pendulum4);
	World.add(world, pendulum5);
	
	Engine.run(engine);
	//Render.run(render);
  
}


function draw() {
  rectMode(CENTER);
  background(230);
  topObject.display();

  rope1.display()
  rope2.display()
  rope3.display()
  rope4.display()
  rope5.display()	
  paperObject1.display();
  paperObject2.display();
  paperObject3.display();
  paperObject4.display();
  paperObject5.display();
 
  
  
	
  
 
  
  
 
}

function keyPressed() {
  	if (keyCode === UP_ARROW) {

    	Matter.Body.applyForce(paperObject1.body,paperObject1.body.position,{x:-50,y:-45});

  	}
}


function drawLine(constraint)
{
	paperBodyPosition=constraint.bodyA.position
	topBodyPosition=constraint.bodyB.position

	topBodyOffset=constraint.pointB;
	
	topBodyX=topBodyPosition.x+topBodyOffset.x
	topBodyY=topBodyPosition.y+topBodyOffset.y
	line(paperBodyPosition.x, paperBodyPosition.y, topBodyX,topBodyY);
}