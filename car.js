class Car{
    constructor(carX, carY){
        this.brain = new NeuralNetwork(12, 4, 4);
        let pos = createVector(carX, carY);
    }
    denk() {
        let inputs = [];
        inputs[0]= afstandlijst[0];
        inputs[1]= afstandlijst[1];
        inputs[2]= afstandlijst[2];
        inputs[3]= afstandlijst[3];
        inputs[4]= afstandlijst[4];
        inputs[5]= afstandlijst[5];
        inputs[6]= afstandlijst[6];
        inputs[7]= afstandlijst[7];
        inputs[8]= afstandlijst[8];
        inputs[9]= afstandlijst[9];
        inputs[10]= afstandlijst[10];
        inputs[11]= afstandlijst[11];
        let output = this.brain.predict(inputs);
        let outputboven = output[0];
        let outputonder = output[1];
        let outputvoor = output[2];
        let outputachter = output[3];
        if (outputvoor > 0.1) {
            voor();
        } else if (outputachter < 0.5) {
            achter();
        } else if (outputboven > 0.4){
            up();
        } else if (outputonder < 0.5){
            down();
        }
        
        
    }
}