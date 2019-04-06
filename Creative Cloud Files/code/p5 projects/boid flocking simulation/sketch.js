const flock = [];
const pack = [];
const BOID_COUNT = 100;
const PREDATOR_COUNT = 5;
let cohesionSlider, alignSlider, separationSlider;

function setup(){
    alignSlider = createSlider(0, 5, 1, .1);
    cohesionSlider = createSlider(0, 5, 1, .1);
    separationSlider = createSlider(0, 5, 1, .1);
    createCanvas(600, 600);
    for (let i = 0; i < BOID_COUNT; i++){
        flock.push(new Boid());
    }
    for (let i = 0; i < PREDATOR_COUNT; i++){
        pack.push(new Predator());
    }
}

function draw(){
    background(50)
        //for of loop
    for(let boid of flock){
            //makes boids swim across edges
        boid.edges();
            //aligns
        boid.setSteering(flock);
            //updates
        boid.update();
            //displays
        boid.show();
    }
    for(let predator of pack ){
        predator.edges();
        predator.setSteering(flock, pack);
        predator.update();
        predator.show();
    }
    
}