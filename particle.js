let xdistance;
let bob;
class Particle {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.rays = [];
        for (let a = 0; a < 360; a+= 30){
            //a staat voor angle
            this.rays.push(new Ray(this.pos, radians(a)));
        }
    }

    update(x, y) {
        
        this.pos = createVector(width / 2, height / 2);
        this.rays = [];
        for (let a = 0; a < 360; a+= 30){
            //a staat voor angle
            this.rays.push(new Ray(this.pos, radians(a+draaigrade)));
        }
        this.pos.set(x, y);
    }

    look(walls) {
        bob = -1;
        for (let ray of this.rays){
            bob ++;
            let closest = null;
            let record = Infinity;
            for (let wall of walls) {
                const pt = ray.cast(wall);
                
                //als pt bestaat

                if (pt) {
                    const distance = p5.Vector.dist(this.pos, pt);
                    if (distance < record) {
                        record = distance;
                        closest = pt;
                    }
                    record = min(distance, record);
                }
            }

            //als closest bestaat

            if (closest) {
                line(this.pos.x, this.pos.y, closest.x, closest.y);
                xdistance = dist(this.pos.x, this.pos.y, closest.x, closest.y);
                afstandlijst[bob] = xdistance;
            }
        }
    }

    show(){
        fill(255);
        for (let ray of this.rays){
            ray.show();
        }
    }
}