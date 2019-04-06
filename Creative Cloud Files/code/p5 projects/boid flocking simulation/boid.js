class Boid {
    constructor(){
        this.position = createVector(random(width), random(height));
            //sets direction of velocity
        this.velocity = p5.Vector.random2D();
            //sets magnitude of velocity
        this.velocity.setMag(random(2, 5));
        this.acceleration = createVector();
        this.maxForce = 1;
        this.maxSpeed = 4;
    }

    edges(){
        if (this.position.x > width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = width;
        }
        if (this.position.y > height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = height;
        }
    }

    align(boids){
        let perceptionRadius = 100;
            //creates vector
        let steeringVelocity = createVector();
        let inRangeTotal = 0;
        for(let other of boids){
                //checks distance with p5 dist function
            let distance = dist(
                this.position.x, 
                this.position.y, 
                other.position.x, 
                other.position.y);

            if (other !== this && distance < perceptionRadius) {
                //adds boid vecto in to steeringVelocity.
                steeringVelocity.add(other.velocity);
                inRangeTotal++;
            }
                
        }
            // defines steeringVelocity var as total / boids.length
        if(inRangeTotal > 0){
            steeringVelocity.div(inRangeTotal);
                //sets higher speed
            steeringVelocity.setMag(this.maxSpeed);
                //subtract current velocity from steering force
            steeringVelocity.sub(this.velocity);
            steeringVelocity.limit(this.maxForce);
        }
        return steeringVelocity;
    }

        //causes boids to steer towards the average if their neighbors' positions
    cohesion(boids){
        let perceptionRadius = 100;
            //creates vector
        let steering = createVector();
        let inRangeTotal = 0;
        for(let other of boids){
                //checks distance with p5 dist function
            let distance = dist(
                this.position.x, 
                this.position.y, 
                other.position.x, 
                other.position.y);

            if (other !== this && distance < perceptionRadius) {
                //adds boid vecto in to steeringVelocity.
                steering.add(other.position);
                inRangeTotal++;
            }
        }
            // defines steeringVector as total / boids.length
        if(inRangeTotal > 0){
            steering.div(inRangeTotal);
                //subtracts this position from vector
            steering.sub(this.position);
            steering.setMag(this.maxSpeed);
                //subtract current velocity from steering force
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

     separation(boids) {
         let perceptionRadius = 50;
         //creates vector
         let steering = createVector();
         let inRangeTotal = 0;
         for (let other of boids) {
             //checks distance with p5 dist function
             let distance = dist(
                 this.position.x,
                 this.position.y,
                 other.position.x,
                 other.position.y);

             if (other !== this && distance < perceptionRadius) {
                    //makes a vector from the other boid to the subject boid
                 let difference = p5.Vector.sub(this.position, other.position)
                    //reduce strength by dividing by distance
                 difference.div(distance);
                 //adds boid vecto in to steeringVelocity.
                 steering.add(difference);
                 inRangeTotal++;
             }
         }
            // defines steeringVector as total / boids.length
         if (inRangeTotal > 0) {
             steering.div(inRangeTotal);
                //sets mag
             steering.setMag(this.maxSpeed);
             //subtract current velocity from steering force
             steering.sub(this.velocity);
                //limits force
             steering.limit(this.maxForce);
         }
         return steering;
     }


    setSteering(boids){
            //resets acceleration to zero
        this.acceleration.set(0, 0);
            //if two forces act on an object, the resulting force is the sum of those two forces
        let alignment = this.align(boids);
            //defines cohesion
        let cohesion = this.cohesion(boids);
            //defines seperation
        let separation = this.separation(boids);

            //gives new value to forces based on slider values
        separation.mult(separationSlider.value());
        alignment.mult(alignSlider.value());
        cohesion.mult(cohesionSlider.value());
            //adjusts acceleration
        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
    }

    show(){
        strokeWeight(8);
        stroke(255);
        point(this.position.x, this.position.y);
    }

    update(){
            //updates position
        this.position.add(this.velocity);
            //updates acceleration vector
        this.velocity.add(this.acceleration);
            //limits velocity
        this.velocity.limit(this.maxSpeed);
            //resets acceleration
        this.acceleration.set(0, 0);
    }
}