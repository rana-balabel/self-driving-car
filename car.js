class Car{
    constructor(x,y,width,height, controlType, maxSpeed=3){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.speed=0;
        this.acceleration=0.4;
        this.maxSpeed=maxSpeed;
        this.friction=0.05;
        this.angle=0;
        this.road=[]
        this.polygon=[]
        this.damaged=false;
        this.useBrain = controlType=="AI";
        if (controlType != "DUMMY"){
            this.sensor=new Sensor(this);
            this.brain = new NeuralNetwork(
                [this.sensor.rayCount,6,4]
            );
        }
        this.controls=new Controls(controlType);
    }

    update(roadBorders, traffic) {
        if(!this.damaged){
            this.#move();
            this.road = roadBorders;
            this.damaged=this.#assessDamage(this.road,traffic);
        }
        if(this.sensor){
            this.sensor.update(this.road,traffic);
            // neurons must recieve lower values
            const offsets = this.sensor.readings.map(
                s=>s==null? 0: 1-s.offset
            );
            const outputs = NeuralNetwork.feedForward(offsets, this.brain);
            console.log(outputs);

            if(this.useBrain){
                this.controls.forward=outputs[0];
                this.controls.left=outputs[1];
                this.controls.right=outputs[2];
                this.controls.reverse=outputs[3];
            }
        }
        this.polygon = this.#createPolygon();
    }
    #assessDamage(roadBorders, traffic){
        for (let i=0; i<roadBorders.length; i++){
            if(polysIntersect(this.polygon, roadBorders[i])){
                return true;
            }
        }
        for (let i=0; i<traffic.length; i++){
            if(polysIntersect(this.polygon, traffic[i].polygon)){
                return true;
            }
        }
        return false;
    }

    // Finds the corners of the car by creating a polygon out of its center
    #createPolygon(){
        const points=[];
        const rad=Math.hypot(this.width, this.height)/2;
        const alpha=Math.atan2(this.width, this.height);
        points.push(
            {
                x:this.x - Math.sin(this.angle-alpha)*rad,
                y:this.y - Math.cos(this.angle-alpha)*rad,
            }
        );

        points.push(
            {
                x:this.x - Math.sin(this.angle+alpha)*rad,
                y:this.y - Math.cos(this.angle+alpha)*rad,
            }
        );

        points.push(
            {
                x:this.x - Math.sin(Math.PI + this.angle-alpha)*rad,
                y:this.y - Math.cos(Math.PI + this.angle-alpha)*rad,
            }
        );

        points.push(
            {
                x:this.x - Math.sin(Math.PI + this.angle+alpha)*rad,
                y:this.y - Math.cos(Math.PI + this.angle+alpha)*rad,
            }
        );

        return points;
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
    draw(context, color, drawSensor=false){
        if (this.damaged){
            context.fillStyle="gray";
        }
        else 
        {
            context.fillStyle=color;
        }
        context.beginPath();
        context.moveTo(this.polygon[0].x, this.polygon[0].y);
        for (let i=1; i<this.polygon.length;i++){
           context.lineTo(this.polygon[i].x, this.polygon[i].y); 
        }
        context.fill();
        if(this.sensor && drawSensor){
            this.sensor.draw(context);
        }
        
    }
}