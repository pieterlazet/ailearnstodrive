let walls = [];
let ray;
let particle;
let car;
let move;
let draai = 10;
let movex = 500;
let movey = 150;
let newx;
let newy;
let draaigrade = 0.0;
let cosinusx;
let cosinusy;
let n;
let n2;
let speed = 3;
let afstandlijst =[];
let score = 0;
let tijd = 1000;
let acpunt = 1;
let kleur1 = "red";
let kleur2 = "red";
let kleur3 = "red";
let kleur4 = "red";
let kleur5 = "red";
let kleur6 = "red";
let kleur7 = "red";
let kleur8 = "red";
let besteai;
let oudeai;
let nieuweai;
let savedAi;
let fitness = 0;
let teller = 1;
let gencount = 1;
let scoreoude;
let scorenieuwe;


function setup() {
    createCanvas(displayWidth * 0.9, displayHeight * 0.9);


    car = new Car(0, 0);
    oudeai=car.brain;
    savedAi=car.brain;
    car.brain.mutate(x=>x*0.2);
    nieuweai = car.brain;
    walls[0] = new Boundary(100, 100, 900, 100);
    walls[1] = new Boundary(900, 100, 1100, 200);
    walls[2] = new Boundary(1100, 200, 1100, 400);
    walls[3] = new Boundary(1100, 400, 900, 800);
    walls[4] = new Boundary(900, 800, 300, 400);
    walls[5] = new Boundary(300, 400, 100, 400);
    walls[6] = new Boundary(100, 400, 100, 100);
    walls[7] = new Boundary(200, 200, 850, 200);
    walls[8] = new Boundary(850, 200, 1000, 250);
    walls[9] = new Boundary(1000, 250, 975, 400);
    walls[10] = new Boundary(975, 400, 850, 650);
    walls[11] = new Boundary(850, 650, 300, 300);
    walls[12] = new Boundary(300, 300, 250, 300);
    walls[13] = new Boundary(250, 300, 200, 200);
    particle = new Particle();
    hoekenreken();
}

function draw() {
    background(0);
    fill(kleur1);
    rect(750, 80, 20, 130);
    fill(kleur2);
    rect(975, 250, 130, 20);
    fill(kleur3);
    rect(875, 550, 160, 20);
    fill(kleur4);
    rect(775, 595, 20, 140);
    fill(kleur5);
    rect(550, 450, 20, 140);
    fill(kleur6);
    rect(250, 285, 20, 140);
    fill(kleur7);
    rect(90, 230, 150, 20);
    fill(kleur8);
    rect(250, 90, 20, 125);

    push();
    translate(movex, movey);
    if (keyIsDown(UP_ARROW)) {
        up();
    }

    if (keyIsDown(DOWN_ARROW)) {
        down();
    }



    angleMode(DEGREES);
    rotate(draaigrade);

    if (keyIsDown(LEFT_ARROW)) {
        achter();
//        console.log("movex: " + movex.toString() + " movey: " + movey.toString());
    }
    if (keyIsDown(RIGHT_ARROW)) {
        voor();
 //       console.log("movex: " + movex.toString() + " movey: " + movey.toString());

    }

    if (keyIsDown(DELETE)) {
        tijd = 5;
    }

    if (keyIsDown(187)) {
        speed = 15;
    }

    if (keyIsDown(189)) {
        speed = 3;
    } 

    fill(255);
    // ellipse(this.pos.x, this.pos.y, 20);
    rect(0 - 8, 0 - 5, 16, 10);
    pop();
    particle.update(movex, movey);
    particle.show();
    tijd --;
    if (tijd<1){
        console.log("Finnished his time");
        backHome();
    }
    particle.look(walls);
    for (let ye = 0; ye < afstandlijst.length; ye++) {
        if (afstandlijst[ye]<7){
            backHome();
            console.log("Car crashed the wall " + ye.toString());
        }    
    }
    
    for (let wall of walls) {
       wall.show();
    }
    punten();
    schrijven();
    car.denk();
}




function backHome(){
    gencount ++;
    movex = 500.0;
    movey = 150.0;
    draaigrade = 0.0;
    cosinusx = 1;
    cosinusy = 0;
    if (fitness >= 9) {
        time = 100000000;
    }else {
        tijd = 1000;
    }
    acpunt = 1;
    kleur1 = "red";
    kleur2 = "red";
    kleur3 = "red";
    kleur4 = "red";
    kleur5 = "red";
    kleur6 = "red";
    kleur7 = "red";
    kleur8 = "red";
    // als de nieuwe beter is 
    if (fitness<score){
        
        car.brain = nieuweai;

        // car.brain.mutate(x=>x);

        // nieuweai = car.brain;

        // car.brain = oudeai;

        car.brain.mutate(x=>x*0.1);

        // nieuweai = car.brain;
        // // car.brain = nieuweai;
        fitness = score;

        
    } 
    // else if (fitness==score) {
    //     // nieuweai = oudeai;

    //     car.brain.mutate(x=>x*(Math.random() * 2));

    //     nieuweai = car.brain;
    // }
    // // als oude nog steeds beter is
    if (fitness>score) {
        car.brain = oudeai;
 
        car.brain.mutate(x=>x*0.20);

        // nieuweai = car.brain;
        // car.brain = nieuweai;
        // fitness = score;
    }

    score = 0;
}

function toDegrees (angle) {
    return angle * (180 / Math.PI);

}
function toRadians (angle) {
    return angle * (Math.PI / 180);
}
function hoekenreken() {
    if (draaigrade > 90){
 //       console.log("linkssonder");
        cosinusx = -1*Math.cos(toRadians(180-draaigrade));
        n2 = cosinusx.toString();
 //       console.log("x = "+n2);
        cosinusy = 1*Math.cos(toRadians(draaigrade -90));
        n = cosinusy.toString();  
 //       console.log("y = "+n);
        
    } else if(draaigrade> 0){
 //       console.log("Rechtsonder");
        cosinusx = 1*Math.cos(toRadians(draaigrade));
        n = cosinusx.toString();  
 //       console.log("x = "+n);
        cosinusy = 1*Math.cos(toRadians(90-draaigrade));
        n2 = cosinusy.toString();
//        console.log("y = "+n2);
        
        
    } else if(draaigrade< -90){
 //       console.log("linksboven");   
        cosinusx = 1*Math.cos(toRadians(draaigrade));
        n = cosinusx.toString();  
 //       console.log("x = "+n);
        cosinusy = 1*Math.cos(toRadians(90-draaigrade));
        n2 = cosinusy.toString();
 //       console.log("y = "+n2);
        
         
    } else if(draaigrade< 0){
 //       console.log("Rechtsboven");    
        cosinusx = 1*Math.cos(toRadians(draaigrade));
        n = cosinusx.toString();  
 //       console.log("x = "+n);
        cosinusy = 1*Math.cos(toRadians(90-draaigrade));
        n2 = cosinusy.toString();
 //       console.log("y = "+n2);
    } else if (draaigrade == 0){
        cosinusx = 1;
        cosinusy = 0;
        console.log("rechtvooruit");
    }
}
function schrijven(){
    textSize(16);
    text("score = "+score.toString(), 1175, 13);
    text("Time left = "+tijd.toString(), 1175, 30);
    text("Angle = "+draaigrade.toString(), 1175, 50);
    text("ray1 distance = "+afstandlijst[0].toString(), 1175, 70);
    text("ray2 distance = "+afstandlijst[1].toString(), 1175, 90);
    text("ray3 distance = "+afstandlijst[2].toString(), 1175, 110);
    text("ray4 distance = "+afstandlijst[3].toString(), 1175, 130);
    text("ray5 distance = "+afstandlijst[4].toString(), 1175, 150);
    text("ray6 distance = "+afstandlijst[5].toString(), 1175, 170);
    text("ray7 distance = "+afstandlijst[6].toString(), 1175, 190);
    text("ray8 distance = "+afstandlijst[7].toString(), 1175, 210);
    text("ray9 distance = "+afstandlijst[8].toString(), 1175, 230);
    text("ray10 distance = "+afstandlijst[9].toString(), 1175, 250);
    text("ray11 distance = "+afstandlijst[10].toString(), 1175, 270);
    text("ray12 distance = "+afstandlijst[11].toString(), 1175, 290);
    textSize(20);
    text("fitness "+fitness.toString(), 1175, 320);
    let verschill= fitness - score;
    text("verschill "+verschill.toString(), 1175, 350);
    text("Generatie: "+gencount.toString(), 1175, 390);
    text("Snelheid: "+speed.toString(), 1175, 410);
}
function punten(){
    if (acpunt == 1){   
        poort1();
    } else if (acpunt == 2){   
        poort2();
    }  else if (acpunt == 3){   
        poort3();
    } else if (acpunt == 4){   
        poort4();
    } else if (acpunt == 5){   
        poort5();
    } else if (acpunt == 6){   
        poort6();
    } else if (acpunt == 7){   
        poort7();
    }else if (acpunt == 8){   
    poort8();
    }
}





function poort1(){
    kleur1 = "blue";
    kleur8 = "red";
    if (movex>750 && movex<770 && movey<210){
        score++;
        acpunt ++;
    }
}
function poort2(){
    kleur2 = "blue";
    kleur1 = "red";
    if (movey>250 && movey<270 && movex>975){
        score++;
        acpunt ++;
    }

}
function poort3(){
    kleur3 = "blue";
    kleur2 = "red";
    if (movey>550 && movey<570 && movex>875){
        score++;
        acpunt ++;
    }
}
function poort4(){
    kleur4 = "blue";
    kleur3 = "red";
    if (movex>775 && movex<795 && movey>595){
        score++;
        acpunt ++;
    }
}
function poort5(){
    kleur5 = "blue";
    kleur4 = "red";
    if (movex>550 && movex<570 && movey>450){
        score++;
        acpunt ++;
    }
}
function poort6(){
    kleur6 = "blue";
    kleur5 = "red";
    if (movex>250 && movex<270 && movey>285){
        score++;
        acpunt ++;
    }
}



function poort7(){
    kleur7 = "blue";
    kleur6 = "red";
    if (movey>230 && movey<250 && movex<215){
        score++;
        acpunt ++;
    }
}
function poort8(){
    kleur7 = "red";
    kleur8 = "blue";
    if (movex>250 && movex<270 && movey<215){
        score = score +2;
        acpunt =1;
    }
}
function up(){
    draaigrade = draaigrade - 3;
    //      console.log(draaigrade);
    if (draaigrade < -360){
        draaigrade = draaigrade + 360;
    }
    if (draaigrade < -180){
        draaigrade = draaigrade*-1 -(180 +draaigrade);
    }
    hoekenreken();    
}
function down(){
    draaigrade = draaigrade + 3;
    if (draaigrade > 360){
      draaigrade = draaigrade - 360;
    }
    if (draaigrade > 180){
      draaigrade = draaigrade*-1 +(180 -draaigrade);
    }
//        console.log(draaigrade);
    hoekenreken();
}
function voor(){
    movex = movex + cosinusx*speed;
    movey = movey + cosinusy*speed;       
    newx = car.x + 1;
    score = score +0.0005;
}
function achter(){
    movex = movex - cosinusx*speed;
    movey = movey - cosinusy*speed;
    newx = car.x - 1;
    score = score +0.0005;
}