class Predator{
    constructor(){
        this.position = createVector(random(width), random(height));
            //sets direction of velocity
        this.velocity = p5.Vector.random2D();
            //sets magnitude of velocity
        this.velocity.setMag(random(1, 4));
        this.acceleration = createVector();
        this.maxForce = 2;
        this.maxSpeed = 3;
    }
    pursuit(boids) {
        let perceptionRadius = 100;
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
                    //adds boid vecto in to steeringVelocity.
                steering.add(other.position);
                inRangeTotal++;
            }
        }
        // defines steeringVector as total / boids.length
        if (inRangeTotal > 0) {
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

        //makes predators avoid each other
    separation(pack) {
        let perceptionRadius = 100;
        //creates vector
        let steering = createVector();
        let inRangeTotal = 0;
        for (let other of pack) {
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
            steering.setMag(this.maxSpeed * 1.6);
            //subtract current velocity from steering force
            steering.sub(this.velocity);
            //limits force
            steering.limit(this.maxForce);
        }
        return steering;
    }

    edges() {
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
    
    setSteering(boids, pack) {
        //resets acceleration to zero
        this.acceleration.set(0, 0);
        //if two forces act on an object, the resulting force is the sum of those two forces
            //add pursuit force
        let pursuit = this.pursuit(boids);
        let separation = this.separation(pack);

        this.acceleration.add(pursuit);
        this.acceleration.add(separation);
    
    }
     show() {
         strokeWeight(16);
         stroke('red');
         point(this.position.x, this.position.y);
     }

     update() {
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