//based on the English translation of "The Little Prince" by Antoine de Saint-Exupery

var looping;  //for pause/unpause
var w=1500;   //screen dimension

var planet=1;   //keeps track of which planet you're on
var pmillis;

//variables for Asteroid B-325
var B325_images=new Array(4);
var B325_fonts=new Array(6);
var B325_name;
var B325_text;

var B326_images;
var B326_fonts;
var B326_name;
var B326_text;

var B327_images;
var B327_fonts;
var B327_name;
var B327_text;
var B327_sizes=[];

var B328_images;
var B328_fonts;
var B328_name;
var B328_text;
var B328_num=0;

var B329_images;
var B329_fonts;
var B329_name;
var B329_text;

var B330_images;
var B330_fonts;
var B330_name;
var B330_text;

var B612_images;
var B612_fonts;
var B612_name;
var B612_text;
var B612_words=[];
var B612_textPos=[];
var B612_speed=[];

function preload() {
  //load data for Asteroid B-612
  B612_text=loadStrings('data/B612/text.txt');
  B612_fonts=loadFont('data/B612/font_0.ttf');
  B612_name=loadFont('data/B612/font_1.ttf');

  //load data for Asteroid B-325
	B325_text=loadStrings('data/B325/text.txt');
	for (var f=0; f<6; f++) {
		B325_fonts[f]=loadFont('data/B325/font_'+f+'.ttf');
	}
	B325_name=loadFont('data/B325/font_6.ttf');
// 	for (var i=0; i<B325_images.length; i++) {
// 	  B325_images[i]=[];
// 	}
// 	for (var c=0; c<9; c++) {
// 		B325_images[0][c]=loadImage('data/B325/crown_'+c+'.png');
// 	}
// 	for (var k=0; k<10; k++) {
// 		B325_images[1][k]=loadImage('data/B325/king_'+k+'.png');
// 	}
// 	for (var s=0; s<5; s++) {
// 		B325_images[2][s]=loadImage('data/B325/speech_'+s+'.png');
// 	}
// 	for (var t=0; t<4; t++) {
// 		B325_images[3][t]=loadImage('data/B325/throne_'+t+'.png');
// 	}

  //load data for Asteroid B-326
  B326_text=loadStrings('data/B326/text.txt');
  B326_fonts=loadFont('data/B326/font_0.ttf');
  B326_name=loadFont('data/B326/font_1.ttf');

  //load data for Asteroid B-327
  B327_text=loadStrings('data/B327/text.txt');
  B327_fonts=loadFont('data/B327/font_0.ttf');
  B327_name=loadFont('data/B327/font_1.ttf');

  //load data for Asteroid B-328
  B328_text=loadStrings('data/B328/text.txt');
  B328_fonts=loadFont('data/B328/font_0.ttf');
  B328_name=loadFont('data/B328/font_1.ttf');

  //load data for Asteroid B-329
  B329_text=loadStrings('data/B329/text.txt');
  B329_fonts=loadFont('data/B329/font_0.ttf');
  B329_name=loadFont('data/B329/font_1.ttf');

  //load data for Asteroid B-330
  B330_text=loadStrings('data/B330/text.txt');
  B330_fonts=loadFont('data/B330/font_0.ttf');
  B330_name=loadFont('data/B330/font_1.ttf');
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

  B612_words=B612_text[1].split(" ");
  for (var i=0; i<B612_words.length; i++) {
    B612_textPos[i]=int(random(-100,100));
    B612_speed[i]=random(3,10);
  }
}

function draw() {
	translate(w/2,w/2); //move origin to middle of screen
	
  if (planet==1) {
    for (var i=4; i>=0; i--) {
      fill(255-25*i,255-50*i);
      ellipse(0,0,400+10*i,400+10*i);
    }
    
    fill(0);
    var txtarclength=0;
    var tr=200;
    var m=map(mouseX,-w/2,w/2,2,25);    //maps font size to horizontal position of mouse
    textFont(B612_name,m);
    //spirals the asteroid inhabitant's name 10 times
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
    
    textFont(B612_fonts,30);
    var x=-100;
    for (var i=0; i<B612_words.length; i++) {
      var charx=x;
      fill(255-20*i,0,0);
      for (var j=0; j<B612_words[i].length; j++) {
        var curr=B612_words[i].charAt(j);
        text(str(curr),charx,B612_textPos[i]+random(-2,2));
        charx+=textWidth(curr);
      }
      x+=textWidth(B612_words[i]+" ");
      if (x>100) {
        x=-100;
      }
    }
    for (var k=0; k<B612_textPos.length; k++) {
      B612_textPos[k]+=B612_speed[k];
      if (B612_textPos[k]>100) {
        B612_textPos[k]=-100;
      }
    }
  } else if (planet==2) {
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
    textFont(B325_name,m);
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
      tr-=0.5;                    //slowly decreases the radius so that the text spirals in
    } 
    
  	fill(150,0,200);
    for (var i=1;i<B325_text.length;i++) {
      textFont(B325_fonts[i%B325_fonts.length],random(10,20));      //lines have diff text, random size
      text(B325_text[i],0,-110+20*i);       //display text
    }
    if (frameCount%5===0) {
      shuffle(B325_fonts,true);       //shuffles the fonts in the array based on size so that the text changes fonts
    }
	} else if (planet==3) {
    for (var i=4; i>=0; i--) {
      fill(255-25*i,255-50*i);
      ellipse(0,0,400+10*i,400+10*i);
    }
    
    fill(0);
    var txtarclength=0;
    var tr=200;
    var m=map(mouseX,-w/2,w/2,2,25);    //maps font size to horizontal position of mouse
    textFont(B326_name,m);
    //spirals the asteroid inhabitant's name 10 times
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
    
    fill(255,115,0);
    var s=sin(frameCount*0.1);
    s=map(s,-1,1,10,30);
    textFont(B326_fonts, s);
    for (var i=1; i<B326_text.length; i++) {
      if (i%2===0) {
        text(B326_text[i],cos(frameCount*0.1)*100-i*10,sin(frameCount*0.1)*100-i*15);
      } else {
        text(B326_text[i],sin(frameCount*0.1)*50+i*5,cos(frameCount*0.1)*50-i*10);
      }
    }
  } else if (planet==4) {
    for (var i=4; i>=0; i--) {
      fill(255-25*i,255-50*i);
      ellipse(0,0,400+10*i,400+10*i);
    }
    
    fill(0);
    var txtarclength=0;
    var tr=200;
    var m=map(mouseX,-w/2,w/2,2,25);    //maps font size to horizontal position of mouse
    textFont(B327_name,m);
    //spirals the asteroid inhabitant's name 10 times
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
    
    fill(20,65,90);
    var x=-100;
    var y=-60
    for (var i=0; i<B327_text[1].length; i++) {
      var curr=B327_text[1].charAt(i%B327_text[1].length);
      var s=map(B327_sizes[i],-1.0,1.0,10,25);
      textFont(B327_fonts,s);
      text(str(curr),x,y);
      x+=textWidth(curr);
      if(x>100) {
        x=-100;
        y+=30;
      }
      B327_sizes[i]=(B327_sizes[i]+1)%TWO_PI;
    }

  } else if (planet==5) {
    for (var i=4; i>=0; i--) {
      fill(255-25*i,255-50*i);
      ellipse(0,0,400+10*i,400+10*i);
    }
    
    fill(0);
    var txtarclength=0;
    var tr=200;
    var m=map(mouseX,-w/2,w/2,2,25);    //maps font size to horizontal position of mouse
    textFont(B328_name,m);
    //spirals the asteroid inhabitant's name 10 times
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
  } else if (planet==6) {
    var c=cos(frameCount*0.1);
    c=map(c,-1,1,0,255);
    fill(c, c, 0);
    ellipse(0,0,440,440);
    
    fill(127-cos(frameCount*0.1)*127);
      var txtarclength=0;
      var tr=200;
      var m=map(mouseX,-w/2,w/2,2,25);    //maps font size to horizontal position of mouse
      textFont(B329_name,m);
      //spirals the asteroid inhabitant's name 10 times
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
    
    textFont(B329_fonts,30);
    for (var i=1; i<B329_text.length; i++) {
      if (i%2===0) {
        fill(255,255,0);
      } else {
        fill(0);
      }
      text(B329_text[i],0,-110+30*i);
    }
  } else if (planet==7) {
    for (var i=4; i>=0; i--) {
      fill(255-25*i,255-50*i);
      ellipse(0,0,400+10*i,400+10*i);
    }
    
    fill(240,230,210);
    rect(-110,-150,220,300);
    
    
    fill(0);
    var txtarclength=0;
    var tr=200;
    var m=map(mouseX,-w/2,w/2,2,25);    //maps font size to horizontal position of mouse
    textFont(B330_name,m);
    //spirals the asteroid inhabitant's name 10 times
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
    
    fill(0);
    textFont(B330_fonts,20);
    if (mouseIsPressed) {
      for (var i=1; i<B330_text.length; i++) {
        text(B330_text[i],0,-140+30*i);
      }
    } else {
      var y=-100;
      for (var i=1; i<B330_text.length; i++) {
        var x=0-textWidth(B330_text[i])/2;
        var y=-140+30*i;
        if (i%2===0) {
          noStroke();
          fill(175,235,245);
          var words=B330_text[i].split(" ");
          for (var j=0; j<words.length; j++) {
            rect(x,y-5,textWidth(words[j]),20,5);
            x+=textWidth(words[j]+" ");
          }
        } else {
          for (var j=0; j<B330_text[i].length; j++) {
            var curr=B330_text[i].charAt(j);
            if (curr<109) {
              noStroke();
              fill(60,135,45);
              triangle(x+1,y-5,x-3,y+4,x+5,y+4);
            } else {
              strokeWeight(2);
              stroke(110,70,50);
              line(x,y,x+textWidth(curr),y);
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
    case ' ':
      if (looping) {
        noLoop();
        looping=!looping;
      } else {
        loop();
        looping=!looping;
      }
	}
}
