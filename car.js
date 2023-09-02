class Car{
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.speed=0;
        this.acceleration=0.4;
        this.maxSpeed=5;
        this.friction=0.05;
        this.angle=0;
        this.road=[]

        this.sensor=new Sensor(this);
        this.controls=new Controls();
    }

    update(roadBorders) {
        this.#move();
        this.road = roadBorders;
        this.sensor.update(roadBorders);
    }
    #move(){
               // Controls the speed of the car
               if(this.controls.forward) {
                this.speed+=this.acceleration;
            }
            if(this.controls.reverse) {
                this.speed-=this.acceleration;
            }
            // Prevent car from exceeding max speed
            if(this.speed > this.maxSpeed){
                this.speed = this.maxSpeed;
            }
            // Reverse speed of the car
            if(this.speed <-this.maxSpeed/2){
                this.speed =-this.maxSpeed/2;
            }
            // Adds friction to car speed
            if(this.speed>0){
                this.speed -= this.friction;
            }
            if(this.speed<0){
                this.speed += this.friction;
            }
             //Fix glitch where car is always moving
            if(Math.abs(this.speed) < this.friction){
                this.speed =0;
            }
            if (this.speed != 0){
                // Value of flip will depend on if speed is + or -
                const flip = this.speed>0? 1:-1;
                // Control left and right
                if (this.controls.left){
                    this.angle+=0.03*flip;
                }
                if (this.controls.right){
                    this.angle-=0.03*flip;
                }
            }
            this.x-=Math.sin(this.angle)*this.speed;
            this.y-=Math.cos(this.angle)*this.speed;
    }
    draw(context){
        context.save();
        context.translate(this.x, this.y);
        context.rotate(-this.angle);
        context.beginPath();
        context.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );
        context.fill();
        context.restore();
        this.sensor.update(this.road);
        this.sensor.draw(context);
    }
}