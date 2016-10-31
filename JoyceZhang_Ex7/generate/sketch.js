//based on the English translation of "The Little Prince" by Antoine de Saint-Exupery

var looping;  //for pause/unpause
var w=1500;   //screen dimension

var planet=1;   //keeps track of which planet you're on
var pmillis;

//variables for Asteroid B-325
var B325_images=new Array(4);
var B325_fonts=new Array(6);
var circle_font;
var B325_text;


function preload() {
  //load data for Asteroid B-325
	B325_text=loadStrings('data/B325/text.txt');
	for (var f=0; f<6; f++) {
		B325_fonts[f]=loadFont('data/B325/font_'+f+'.ttf');
	}
	circle_font=loadFont('data/B325/font_6.ttf');
	for (var i=0; i<B325_images.length; i++) {
	  B325_images[i]=[];
	}
	for (var c=0; c<9; c++) {
		B325_images[0][c]=loadImage('data/B325/crown_'+c+'.png');
	}
	for (var k=0; k<10; k++) {
		B325_images[1][k]=loadImage('data/B325/king_'+k+'.png');
	}
	for (var s=0; s<5; s++) {
		B325_images[2][s]=loadImage('data/B325/speech_'+s+'.png');
	}
	for (var t=0; t<4; t++) {
		B325_images[3][t]=loadImage('data/B325/throne_'+t+'.png');
	}
}

function setup() {
	createCanvas(w,w);
	background(255);
	noStroke();
	fill(0);
	textAlign(CENTER,CENTER);
	imageMode(CENTER);
	pmillis=millis();
	looping=true;
	frameRate(5);
}

function draw() {
	translate(w/2,w/2); //move origin to middle of screen
	
	if (planet==2) {
    // for (var i=0; i<B325_images.length; i++) {
    //   var picarclength=0;
    //   var pr=250+i*100;     //each category has a different radius
    //   tint(255,255-40*i);   //categories closer to the edge have higher transparency
    //   var curr=B325_images[i][int(random(0,B325_images[i].length))];
    //   picarclength+=random(30,PI*2*pr);           //finds random position at edge of circle
    //   var theta=picarclength/pr;                  //finds angle
    //   push();
    //   translate(pr*cos(theta),pr*sin(theta));     //moves origin to position at edge of circle
    //   rotate(theta+random(0,PI));                 //images will load at random angles
    //   image(curr,0,0,curr.width,curr.height,0,0,random(30,150),random(30,150));   //loads one image from every category
    //   pop();
    // }
    
    //asteroid that fades to white near the center
    for (var i=4; i>=0; i--) {
      fill(255-25*i,255-50*i);
      ellipse(0,0,400+10*i,400+10*i);
    }
    
    fill(0);
    var txtarclength=0;
    var tr=200;
    var m=map(mouseX,-w/2,w/2,2,25);    //maps font size to horizontal position of mouse
    textFont(circle_font,m);
    //spirals the asteroid inhabitant's name 10 times
    for (var i=0; i<B325_text[0].length*10; i++) {
      var curr=B325_text[0].charAt(i%B325_text[0].length);  //gets current character
      var tw=textWidth(curr);
      txtarclength+=tw/2;               //finds position on the edge of circle based on character width
      var theta=txtarclength/tr-PI/2;   //finds angle
      push();
      translate(tr*cos(theta),tr*sin(theta));   //moves origin to position on edge of circle
      rotate(theta+PI/2);                       //rotates text so it sits on the outside of circle
      text(str(curr),0,0);              //displays the character
      pop();
      txtarclength+=tw/2;         //adjusts position based on character width
      tr-=0.7;                    //slowly decreases the radius so that the text spirals in
    }
    
  	fill(100+sin(frameCount*0.8)*100, 0, 127+sin(frameCount*0.8)*127);    //text will fade back and forth between black and purple
    for (var i=1;i<B325_text.length;i++) {
      textFont(B325_fonts[i%B325_fonts.length],random(10,20));      //lines have diff text, random size
      text(B325_text[i],0,-110+20*i);       //display text
    }
    if (frameCount%5===0) {
      shuffle(B325_fonts,true);       //shuffles the fonts in the array based on size so that the text changes fonts
    }
	}
}

//switches between planets
function keyPressed() {
	switch (key) {
		case '1':
			planet=1;
			pmillis=millis();
			break;
		case '2':
			planet=2;
			pmillis=millis();
			break;
		case '3':
			planet=3;
			pmillis=millis();
			break;
		case '4':
			planet=4;
			pmillis=millis();
			break;
		case '5':
			planet=5;
			pmillis=millis();
			break;
		case '6':
			planet=6;
			pmillis=millis();
			break;
		case '7':
			planet=7;
			pmillis=millis();
			break;
		case '8':
			planet=8;
			pmillis=millis();
			break;
	}
}

//pause/unpause by clicking mouse
function mousePressed() {
  if (looping) {
    noLoop();
    looping=!looping;
  } else {
    loop();
    looping=!looping;
  }
}
