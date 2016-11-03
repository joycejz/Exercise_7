//based on the English translation of "The Little Prince" by Antoine de Saint-Exupery

var looping;  //for pause/unpause
var w=1500;   //screen dimension

var planet=0;   //keeps track of which planet you're on
var main_font;

//variables for Asteroid B-325
var B325_images=[];
var B325_fonts=[];
var B325_name;
var B325_text;

//variables for Asteroid B-326
var B326_images=[];
var B326_fonts=[];
var B326_name;
var B326_text;

//variables for Asteroid B-327
var B327_images=[];
var B327_fonts=[];
var B327_name;
var B327_text;
var B327_sizes=[];
var B327_angle=0.0;

//variables for Asteroid B-328
var B328_images=[];
var B328_fonts=[];
var B328_name;
var B328_text;
var B328_num=0;

//variables for Asteroid B-329
var B329_images=[];
var B329_fonts=[];
var B329_name;
var B329_text;

//variables for Asteroid B-330
var B330_images=[];
var B330_fonts=[];
var B330_name;
var B330_text;

//variables for Asteroid B-612
var B612_images=[];
var B612_fonts=[];
var B612_name;
var B612_text;
var B612_words=[];
var B612_textPos=[];
var B612_speed=[];

function preload() {
  main_font=loadFont('data/main.ttf');
  
  //load data for Asteroid B-612
  B612_images=loadImage('data/B612/rose.png');
  B612_text=loadStrings('data/B612/text.txt');
  B612_fonts=loadFont('data/B612/font_0.ttf');
  B612_name=loadFont('data/B612/font_1.ttf');

  //load data for Asteroid B-325
	B325_text=loadStrings('data/B325/text.txt');
	for (var f=0; f<6; f++) {
		B325_fonts[f]=loadFont('data/B325/font_'+f+'.ttf');
	}
	B325_name=loadFont('data/B325/font_6.ttf');
	for (var i=0; i<7; i++) {
    B325_images[i]=loadImage('data/B325/img_'+i+'.png');
  }

  //load data for Asteroid B-326
  B326_text=loadStrings('data/B326/text.txt');
  B326_fonts=loadFont('data/B326/font_0.ttf');
  B326_name=loadFont('data/B326/font_1.ttf');
  for (var i=0; i<5; i++) {
    B326_images[i]=loadImage('data/B326/img_'+i+'.png');
  }

  //load data for Asteroid B-327
  B327_text=loadStrings('data/B327/text.txt');
  B327_fonts=loadFont('data/B327/font_0.ttf');
  B327_name=loadFont('data/B327/font_1.ttf');
  for (var i=0; i<3; i++) {
    B327_images[i]=loadImage('data/B327/img_'+i+'.png');
  }

  //load data for Asteroid B-328
  B328_text=loadStrings('data/B328/text.txt');
  B328_fonts=loadFont('data/B328/font_0.ttf');
  B328_name=loadFont('data/B328/font_1.ttf');
  for (var i=0; i<2; i++) {
    B328_images[i]=loadImage('data/B328/img_'+i+'.png');
  }


  //load data for Asteroid B-329
  B329_text=loadStrings('data/B329/text.txt');
  B329_fonts=loadFont('data/B329/font_0.ttf');
  B329_name=loadFont('data/B329/font_1.ttf');
  B329_images=loadImage('data/B329/img_0.png');

  //load data for Asteroid B-330
  B330_text=loadStrings('data/B330/text.txt');
  B330_fonts=loadFont('data/B330/font_0.ttf');
  B330_name=loadFont('data/B330/font_1.ttf');
  for (var i=0; i<5; i++) {
    B330_images[i]=loadImage('data/B330/img_'+i+'.png');
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
	
	for (var i=0; i<B327_text[1].length; i++) {
    B327_sizes[i]=random(0.0,TWO_PI);
  }

  for (var i=0; i<30; i++) {
    B328_starPos[i]=createVector(random(-w/2,w/2),random(-w/2,w/2));
  }

  B329_images.loadPixels();

  B612_words=B612_text[1].split(" ");
  for (var i=0; i<B612_words.length; i++) {
    B612_textPos[i]=int(random(-100,100));
    B612_speed[i]=random(3,10);
  }
	
	//MAIN MENU
	textFont(main_font,20);
	text("The Little Prince",750,600);
	text("by Antoine de Saint-Exupery",750,630)
	textFont(main_font,15);
	text("Press a number:",750,670);
	text("1: Asteroid B-612",750,700);
	text("2: Asteroid B-325",750,730);
	text("3: Asteroid B-326",750,760);
	text("4: Asteroid B-327",750,790);
	text("5: Asteroid B-328",750,820);
	text("6: Asteroid B-329",750,850);
	text("7: Asteroid B-330",750,880);
}

function draw() {
	translate(w/2,w/2); //move origin to middle of screen
  
  if (planet==1) {                        //ASTEROID-B612: THE LITTLE PRINCE
    imageMode(CENTER);
    
    //rose pic in background
    image(B612_images,0,0);     

    //draws asteroid
    for (var i=4; i>=0; i--) {
      fill(255-25*i,255-50*i);
      ellipse(0,0,400+10*i,400+10*i);
    }
    
    //spirals the inhabitant's name
    fill(0);
    var txtarclength=0;
    var tr=200;
    var m=map(mouseX,-w/2,w/2,2,25);    //maps font size to horizontal position of mouse
    textFont(B612_name,m);
    for (var i=0; i<B612_text[0].length*6; i++) {
      var curr=B612_text[0].charAt(i%B612_text[0].length);  //gets current character
      var tw=textWidth(curr);
      txtarclength+=tw/2;               //finds position on the edge of circle based on character width
      var theta=txtarclength/tr-PI/2;   //finds angle
      push();
      translate(tr*cos(theta),tr*sin(theta));   //moves origin to position on edge of circle
      rotate(theta+PI/2);                       //rotates text so it sits on the outside of circle
      text(str(curr),0,0);              //displays the character
      pop();
      txtarclength+=tw/2;         //adjusts position based on character width
      tr-=0.5;                    //slowly decreases the radius so that the text spirals in
    }
    
    //inside words
    textFont(B612_fonts,30);
    var x=-100;
    for (var i=0; i<B612_words.length; i++) {
      var charx=x;            //finds position of each character
      fill(255-20*i,0,0);
      for (var j=0; j<B612_words[i].length; j++) {
        var curr=B612_words[i].charAt(j);                     //gets each character
        text(str(curr),charx,B612_textPos[i]+random(-2,2));     //display characters, they will jiggle up and down
        charx+=textWidth(curr);       //adjusts position based on character width
      }
      x+=textWidth(B612_words[i]+" ");      //adjusts position based on word width
      if (x>100) {        //keeps words on the asteroid
        x=-100;
      }
    }
    
    //makes the words fall
    for (var k=0; k<B612_textPos.length; k++) {
      B612_textPos[k]+=B612_speed[k];     
      if (B612_textPos[k]>100) {
        B612_textPos[k]=-100;
      }
    }
  } else if (planet==2) {                   //ASTEROID B-325: THE KING
    imageMode(CENTER);
    
    //makes a collage of images around the asteroid
    for (var i=0; i<B325_images.length; i++) {
      var picarclength=0;
      var pr=250+i*100;     //each category has a different radius
      tint(255,255-40*i);   //categories closer to the edge have higher transparency
      var curr=B325_images[i];
      picarclength+=random(30,PI*2*pr);           //finds random position at edge of circle
      var theta=picarclength/pr;                  //finds angle
      push();
      translate(pr*cos(theta),pr*sin(theta));     //moves origin to position at edge of circle
      rotate(theta+random(0,PI));                 //images will load at random angles
      image(curr,0,0,curr.width,curr.height,0,0,random(30,150),random(30,150));   //loads one image from every category
      pop();
    }
    
    //draws asteroid
    for (var i=4; i>=0; i--) {
      fill(255-25*i,255-50*i);
      ellipse(0,0,400+10*i,400+10*i);
    }
    
    //spirals the inhabitant's name
    fill(0);
    var txtarclength=0;
    var tr=200;
    var m=map(mouseX,-w/2,w/2,2,25);    //maps font size to horizontal position of mouse
    textFont(B325_name,m);
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
      tr-=0.5;                    //slowly decreases the radius so that the text spirals in
    } 
    
    //inside text
  	fill(150,0,200);
    for (var i=1;i<B325_text.length;i++) {
      textFont(B325_fonts[i%B325_fonts.length],random(10,20));      //lines have diff text, random size
      text(B325_text[i],0,-110+20*i);       //display text
    }
    if (frameCount%5===0) {
      shuffle(B325_fonts,true);       //shuffles the fonts in the array based on size so that the text changes fonts
    }
	} else if (planet==3) {                        //ASTEROID B-326: THE CONCEITED MAN
    imageMode(CENTER);
    
    //makes a collage of images around the asteroid
    for (var i=0; i<B326_images.length; i++) {
      var picarclength=0;
      var pr=250+i*100;     //each category has a different radius
      tint(255,255-40*i);   //categories closer to the edge have higher transparency
      var curr=B326_images[i];
      picarclength+=random(30,PI*2*pr);           //finds random position at edge of circle
      var theta=picarclength/pr;                  //finds angle
      push();
      translate(pr*cos(theta),pr*sin(theta));     //moves origin to position at edge of circle
      rotate(theta+random(0,PI));                 //images will load at random angles
      image(curr,0,0,curr.width,curr.height,0,0,random(30,150),random(30,150));   //loads one image from every category
      pop();
    }

    //draws asteroid
    for (var i=4; i>=0; i--) {
      fill(255-25*i,255-50*i);
      ellipse(0,0,400+10*i,400+10*i);
    }
    
    //spirals the inhabitant's name
    fill(0);
    var txtarclength=0;
    var tr=200;
    var m=map(mouseX,-w/2,w/2,2,25);    //maps font size to horizontal position of mouse
    textFont(B326_name,m);
    for (var i=0; i<B326_text[0].length*7; i++) {
      var curr=B326_text[0].charAt(i%B326_text[0].length);  //gets current character
      var tw=textWidth(curr);
      txtarclength+=tw/2;               //finds position on the edge of circle based on character width
      var theta=txtarclength/tr-PI/2;   //finds angle
      push();
      translate(tr*cos(theta),tr*sin(theta));   //moves origin to position on edge of circle
      rotate(theta+PI/2);                       //rotates text so it sits on the outside of circle
      text(str(curr),0,0);              //displays the character
      pop();
      txtarclength+=tw/2;         //adjusts position based on character width
      tr-=0.5;                    //slowly decreases the radius so that the text spirals in
    }
    
    //inside text
    fill(255,115,0);
    var s=sin(frameCount*0.1);
    s=map(s,-1,1,10,30);    //maps font size to sin values
    textFont(B326_fonts, s);
    //text travels in circles in opposite directions
    for (var i=1; i<B326_text.length; i++) {
      if (i%2===0) {
        text(B326_text[i],cos(frameCount*0.1)*100-i*10,sin(frameCount*0.1)*100-i*15);
      } else {
        text(B326_text[i],sin(frameCount*0.1)*50+i*5,cos(frameCount*0.1)*50-i*10);
      }
    }
  } else if (planet==4) {                       //ASTEROID B-327: THE DRUNKARD
    imageMode(CENTER);
    
    tint(255,150);    //makes images semi-transparent
    var img=B327_images[floor(random(1,3))]
    image(img,random(-w/2,w/2),random(-w/2,w/2));    //randomly displays images in background
    
    //displays spinning bottles
    noTint();
    for (var x=-750; x<w/2; x+=500) {
      for (var y=-750; y<w/2; y+=500) {
        push();
        translate(x,y);
        rotate(radians(B327_angle));
        image(B327_images[0],0,0);
        pop();
      }
    }
    B327_angle+=10;     //adjusts the angle so that the images spins
  
    //draws asteroid
    for (var i=4; i>=0; i--) {
      fill(255-25*i,255-50*i);
      ellipse(0,0,400+10*i,400+10*i);
    }
    
    //spirals the inhabitant's name
    fill(0);
    var txtarclength=0;
    var tr=200;
    var m=map(mouseX,-w/2,w/2,2,25);    //maps font size to horizontal position of mouse
    textFont(B327_name,m);
    for (var i=0; i<B327_text[0].length*10; i++) {
      var curr=B327_text[0].charAt(i%B327_text[0].length);  //gets current character
      var tw=textWidth(curr);
      txtarclength+=tw/2;               //finds position on the edge of circle based on character width
      var theta=txtarclength/tr-PI/2;   //finds angle
      push();
      translate(tr*cos(theta),tr*sin(theta));   //moves origin to position on edge of circle
      rotate(theta+PI/2);                       //rotates text so it sits on the outside of circle
      text(str(curr),0,0);              //displays the character
      pop();
      txtarclength+=tw/2;         //adjusts position based on character width
      tr-=0.5;                    //slowly decreases the radius so that the text spirals in
    }
    
    //inside text
    fill(20,65,90);
    var x=-100;
    var y=-60
    for (var i=0; i<B327_text[1].length; i++) {
      var curr=B327_text[1].charAt(i%B327_text[1].length);
      var s=map(B327_sizes[i],-1.0,1.0,10,25);    //maps font size to sin values (assigned in setup())
      textFont(B327_fonts,s);
      text(str(curr),x,y);
      x+=textWidth(curr);       //adjusts position based on character width
      if(x>100) {             //goes to next line if the words get near edge of asteroid
        x=-100;
        y+=30;
      }
      B327_sizes[i]=(B327_sizes[i]+1)%TWO_PI;   //goes through all font sizes
    }
  } else if (planet==5) {                         //ASTEROID B-328: THE BUSINESSMAN
    imageMode(CENTER);
    
    background(20,40,95);       //dark blue sky
    tint(255,127+sin(frameCount*0.1)*127);      //images will fade in and out
    for (var i=0; i<B328_starPos.length; i++) {
      image(B328_images[0],B328_starPos[i].x,B328_starPos[i].y);      //stars
      image(B328_images[1],B328_starPos[i].x,B328_starPos[i].y,20,20);      //money symbol
    }
    
    //draws asteroid
    for (var i=4; i>=0; i--) {
      fill(255-25*i,255-50*i);
      ellipse(0,0,400+10*i,400+10*i);
    }
    
    //spirals the inhabitant's name 
    fill(0);
    var txtarclength=0;
    var tr=200;
    var m=map(mouseX,-w/2,w/2,2,25);    //maps font size to horizontal position of mouse
    textFont(B328_name,m);
    for (var i=0; i<B328_text[0].length*7; i++) {
      var curr=B328_text[0].charAt(i%B328_text[0].length);  //gets current character
      var tw=textWidth(curr);
      txtarclength+=tw/2;               //finds position on the edge of circle based on character width
      var theta=txtarclength/tr-PI/2;   //finds angle
      push();
      translate(tr*cos(theta),tr*sin(theta));   //moves origin to position on edge of circle
      rotate(theta+PI/2);                       //rotates text so it sits on the outside of circle
      text(str(curr),0,0);              //displays the character
      pop();
      txtarclength+=tw/2;         //adjusts position based on character width
      tr-=0.5;                    //slowly decreases the radius so that the text spirals in
    }
    
    fill(150);
    textFont(B328_name,40);
    text(B328_text[1],0,0);
    
    //block of changing numbers ("counters")
    fill(45,133,0);
    textFont(B328_fonts,20);
    var num=B328_num;
    for (var x=-130; x<=130; x+=20) {
      for (var y=-130; y<=130; y+=20) {
        text(str(num),x,y);
        num=(num+1)%10;
      }
    }
    B328_num=(B328_num+1)%10;
  } else if (planet==6) {                           //ASTEROID B-329: THE LAMPLIGHTER
    imageMode(CENTER);
    
    //allows the user to "paint" a sunset
    fill(B329_images.get(mouseX,mouseY),127);   //gets colors from the sunset image
    var mx=map(mouseX,0,1500,-w/2,w/2);     //maps mouse position to the new coordinate system
    var my=map(mouseY,0,1500,-w/2,w/2);
    ellipse(mx,my,100,100,50);        //draws circles that make up a rough version of the sunset image
    //console.log(mouseX)
    
    //draws asteroid that fades back and forth between yellow and black
    var c=cos(frameCount*0.1);
    c=map(c,-1,1,0,255);
    fill(c, c, 0);
    ellipse(0,0,450,450);
    
    //spirals the inhabitant's name
    fill(127-cos(frameCount*0.1)*127);    //text fades back and forth between white and black
      var txtarclength=0;
      var tr=200;
      var m=map(mouseX,-w/2,w/2,2,25);    //maps font size to horizontal position of mouse
      textFont(B329_name,m);
      for (var i=0; i<B329_text[0].length*7; i++) {
        var curr=B329_text[0].charAt(i%B329_text[0].length);  //gets current character
        var tw=textWidth(curr);
        txtarclength+=tw/2;               //finds position on the edge of circle based on character width
        var theta=txtarclength/tr-PI/2;   //finds angle
        push();
        translate(tr*cos(theta),tr*sin(theta));   //moves origin to position on edge of circle
        rotate(theta+PI/2);                       //rotates text so it sits on the outside of circle
        text(str(curr),0,0);              //displays the character
        pop();
        txtarclength+=tw/2;         //adjusts position based on character width
        tr-=0.5;                    //slowly decreases the radius so that the text spirals in
      }
    
    //inside text
    textFont(B329_fonts,30);
    for (var i=1; i<B329_text.length; i++) {
      if (i%2===0) {
        fill(255,255,0);    //yellow
      } else {
        fill(0);    //black
      }
      text(B329_text[i],0,-110+30*i);
    }
  } else if (planet==7) {                     //ASTEROID B-330: THE GEOGRAPHER
    imageMode(CORNER);
    
    //makes a background of maps
    for (var y=-750; y<w/2; y+=100) {
      var x=-750;
      var i=0;
      while(x<w/2) {
        var img=B330_images[i];
        image(img,x,y);
        x+=img.width;       //adjusts position based on image width
        i=(i+1)%B330_images.length;
        shuffle(B330_images,true);      //shuffles images in the array
      }
    }
  
    //draws the asteroid
    for (var i=4; i>=0; i--) {
      fill(255-25*i,255-50*i);
      ellipse(0,0,400+10*i,400+10*i);
    }
    
    //draws "paper"
    fill(240,230,210);
    rect(-110,-150,220,300);
    
    //spirals the inhabitant's name
    fill(0);
    var txtarclength=0;
    var tr=200;
    var m=map(mouseX,-w/2,w/2,2,25);    //maps font size to horizontal position of mouse
    textFont(B330_name,m);
    for (var i=0; i<B330_text[0].length*10; i++) {
      var curr=B330_text[0].charAt(i%B330_text[0].length);  //gets current character
      var tw=textWidth(curr);
      txtarclength+=tw/2;               //finds position on the edge of circle based on character width
      var theta=txtarclength/tr-PI/2;   //finds angle
      push();
      translate(tr*cos(theta),tr*sin(theta));   //moves origin to position on edge of circle
      rotate(theta+PI/2);                       //rotates text so it sits on the outside of circle
      text(str(curr),0,0);              //displays the character
      pop();
      txtarclength+=tw/2;         //adjusts position based on character width
      tr-=0.5;                    //slowly decreases the radius so that the text spirals in
    }
    
    //inside text
    fill(0);
    textFont(B330_fonts,20);
    // displays text if mouse is pressed
    if (mouseIsPressed) {
      for (var i=1; i<B330_text.length; i++) {
        text(B330_text[i],0,-140+30*i);
      }
    } else {      //the text acts as a map
      var y=-100;
      for (var i=1; i<B330_text.length; i++) {
        var x=0-textWidth(B330_text[i])/2;
        var y=-140+30*i;
        if (i%2===0) {
          noStroke();
          fill(175,235,245);
          var words=B330_text[i].split(" ");
          for (var j=0; j<words.length; j++) {
            rect(x,y-5,textWidth(words[j]),20,5);     //draws a "lake" in place of the word
            x+=textWidth(words[j]+" ");
          }
        } else {
          for (var j=0; j<B330_text[i].length; j++) {
            var curr=B330_text[i].charAt(j);
            if (curr<109) {
              noStroke();
              fill(60,135,45);
              triangle(x+1,y-5,x-3,y+4,x+5,y+4);    //draws a "mountain" in place of the character
            } else {
              strokeWeight(2);
              stroke(110,70,50);
              line(x,y,x+textWidth(curr),y);      //draws a "road" in place of the character
            } 
            x=x+textWidth(curr);
          }
        }
      }
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
    case ' ':           //pauses program when space is pressed
      if (looping) {
        noLoop();
        looping=!looping;
      } else {
        loop();
        looping=!looping;
      }
	}
}
