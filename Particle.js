let SceneObj = require("./SceneObj.js") 
let mathjs = require("mathjs")

class Particle extends SceneObj
{
    constructor(position, velocity, mass)
    {
        super("particle", 0) //Temporary values
        this.position = position
        this.velocity = velocity
        this.mass = mass
        this.accel = [0, 0]
        this.rForce = [0, 0]
        this.forces = []
        this.width = 10
        this.height = 10
    }

    update(deltaTime) {
        //Updates position and velocity of particle each frame
        this.position = mathjs.add(this.position, mathjs.multiply(deltaTime, this.velocity), mathjs.multiply(0.5*deltaTime**2, this.accel))
        this.velocity = mathjs.add(this.velocity, mathjs.multiply(deltaTime, this.accel))
    }

    setPosition(position) {
        this.position = position
    }

    getPosition() {
        return this.position
    }

    setVelocity(velocity) {
        this.velocity = velocity
    }

    getVelocity() {
        return this.velocity
    }

    //No getter or setter for acceleration since
    //acceleration should not be directly modifiable

    setMass(mass) {
        this.mass = mass
    }

    getMass() {
        return this.mass
    }

    addForce(force) {
        //Adds a force to the force list then recalculates
        //resultant force and acceleration.
        this.forces.push(force)
        this.rForce = mathjs.add(this.rForce, force)
        this.accel = mathjs.multiply(1/this.mass, this.rForce)

        //Returns the index of the force just added so that
        //it can be referenced later.
        return this.forces.length - 1
    }

    removeForce(index) {
        //Adjusts the resultant force and acceleration to
        //account for removing the force
        this.rForce = mathjs.subtract(this.rForce, this.forces[index])
        this.accel = mathjs.multiply(1/this.mass, this.rForce)

        //Removes the force from the forces list
        this.forces.splice(index)
    }

    setForce(index, value) {
        //Subtract the old value of the force from resultant force
        this.rForce = mathjs.subtract(this.rForce, this.forces[index])
        //Set the new value of the force at the corresponding index
        this.forces[index] = value
        //Add the new force to the resultant force
        this.rForce = mathjs.add(this.rForce, this.forces[index])
        //Recalculate acceleration
        this.accel = mathjs.multiply(1/this.mass, this.rForce)
    }

    getForce(index) {
        return this.forces[index]
    }

    draw(ctx) {
        //Sets the colour to red and then draws a rectangle at the particles position
        ctx.fillStyle = "#f00";
        ctx.fillRect(this.position[0] - (this.width / 2), this.position[1] - (this.height / 2), this.width, this.height);
    }
}

module.exports = Particle