

class Move {
    update(car) {
        // if (keyCode === LEFT_ARROW||keyCode === 65) {
        //     car.x = car.x - 1;
        // } else if (keyCode === RIGHT_ARROW||keyCode === 68) {
        //     car.x = car.x + 1;
        // } else if (keyCode === UP_ARROW||keyCode === 38) {
        //     car.y = car.y - 1;
        // } else if (keyCode === DOWN_ARROW||keyCode === 40) {
        //     car.y = car.y + 1;
        // }

        if (keyIsDown(LEFT_ARROW)) {
            car.x = car.x - 2;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            car.x = car.x + 2;
        }
        if (keyIsDown(UP_ARROW)) {
            draaigrade = draaigrade - 0.3;
            console.log(draaigrade);
        }
        if (keyIsDown(DOWN_ARROW)) {
            draaigrade = draaigrade + 0.3;
            console.log(draaigrade);
        }
        return car;
    }
}