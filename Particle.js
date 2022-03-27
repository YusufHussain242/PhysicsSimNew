let SceneObj = require("./SceneObj.js") 
let mathjs = require("mathjs")

class Particle extends SceneObj
{
    constructor(position, velocity, accel)
    {
        super("particle", 0) //Temporary values
        this.position = position
        this.velocity = velocity
        this.accel = accel
        this.width = 10
        this.height = 10
    }

    update(deltaTime)
    {
        //Updates position and velocity of particle each frame
        this.position = mathjs.add(this.position, mathjs.multiply(deltaTime, this.velocity), mathjs.multiply(0.5*deltaTime**2, this.accel))
        this.velocity = mathjs.add(this.velocity, mathjs.multiply(deltaTime, this.accel))
    }

    draw(ctx)
    {
        //Sets the colour to red and then draws a rectangle at the particles position
        ctx.fillStyle = "#f00";
        ctx.fillRect(this.position[0] - (this.width / 2), this.position[1] - (this.height / 2), this.width, this.height);
    }
}

module.exports = Particle