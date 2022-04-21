let SceneObj = require("./SceneObj.js")
let mathjs = require("mathjs");
const { divide } = require("mathjs");

class Particle extends SceneObj
{
    #scene;
    #position;
    #velocity;
    #mass;

    #accel = [0, 0];
    #rForce = [0, 0];
    #forces = []

    #forceCount = 0
    #uiForces = {}
    #selected = false

    #width = 10;
    #height = 10;

    constructor(id, scene, position, velocity, mass) {
        super("particle", id)
        this.#scene = scene

        this.#position = position
        this.#velocity = velocity
        this.#mass = mass
    }

    update(deltaTime) {
        //Updates position and velocity of particle each frame
        this.#position = mathjs.add(this.#position, mathjs.multiply(deltaTime, this.#velocity), mathjs.multiply(0.5*deltaTime**2, this.#accel))
        this.#velocity = mathjs.add(this.#velocity, mathjs.multiply(deltaTime, this.#accel))
    }

    setPosition(position) {
        if (!isNaN(position[0]) && !isNaN(position[1])) {
            this.#position = position
        }
    }

    getPosition() {
        return this.#position
    }

    setVelocity(velocity) {
        console.log(velocity)
        if (!isNaN(velocity[0]) && !isNaN(velocity[1])) {
            console.log("Ping")
            this.#velocity = velocity
        }
    }

    getVelocity() {
        return this.#velocity
    }

    //No setter for acceleration since
    //acceleration should not be directly modifiable

    getAccel() {
        return this.#accel
    }

    setMass(mass) {
        if (mass > 0 && !isNaN(mass)) {
            this.#mass = mass
            this.#accel = mathjs.multiply(1/this.#mass, this.#rForce)
        }
    }

    getMass() {
        return this.#mass
    }

    getForces() {
        return this.#forces
    }

    addForce(force) {
        let forceRef = [force]  //Wraps force in array to create reference
        this.#forces.push(forceRef) //Adds force reference to the forces array
        this.#rForce = mathjs.add(this.#rForce, force)  //Recalculates resultant force
        this.#accel = mathjs.multiply(1/this.#mass, this.#rForce) //Recalculates acceleration
        return forceRef //Returns reference to force
    }

    removeForce(forceRef) {
        //Iterate over forces until a force is found which matches forceRef
        for (let i=0; i < this.#forces.length; i++) {
            if (this.#forces[i] === forceRef) {
                //Adjusts resultant force and acceleration accordingly
                this.#rForce = mathjs.subtract(this.#rForce, forceRef[0])
                this.#accel = mathjs.multiply(1/this.#mass, this.#rForce)   
                this.#forces.splice(i, 1) //Remove the force at that index
                return
            }
        }
    }

    setForce(forceRef, value) {
        if (isNaN(value[0]) || isNaN(value[1])) {
            return
        }

        //Subtracts old value of force from resultant force
        this.#rForce = mathjs.subtract(this.#rForce, forceRef[0])
        //Updates the force reference to the new value therefore
        //updating the force in the forces list
        forceRef[0] = value
        //Adds the new value of force to the resultant force
        this.#rForce = mathjs.add(this.#rForce, forceRef[0])
        //Adjusts acceleration
        this.#accel = mathjs.multiply(1/this.#mass, this.#rForce)
    }

    getForce(forceRef) {
        return forceRef[0]
    }

    draw(ctx) {
        if (this.#selected) {
            ctx.fillStyle = "#f0f";
        } else {
            ctx.fillStyle = "#f00";
        }
        ctx.fillRect(this.#position[0] - (this.#width / 2), this.#position[1] - (this.#height / 2), this.#width, this.#height);

        //Updates properties menu
        if (this.#selected) {
            this.updateMenu()
        }
    }

    toggleSelected() {
        this.#selected = !this.#selected
    }

    //Creates properties menu
    createMenu() {
        this.generateHTML()
        this.createForceButton()
        this.bindAttributes()
        //Loops over all forces and adds them to the menu
        for (let key in this.#uiForces) {
            this.addUIForce(key)
        }
    }

    //Creates the required elements in the properties menu
    generateHTML() {
        document.getElementById("propertiesMenu").innerHTML = `
        <label id=particle${this.idNum}>Particle ${this.idNum}</lable>
        <br>
        <br>
        <label id=positionLable>Position: </label>
        <input type="text" id=positionX>
        <input type="text" id=positionY>
        <br>
        <br>
        <label id=velocityLable>Velocity: </label>
        <input type="text" id=velocityX>
        <input type="text" id=velocityY>
        <br>
        <br>
        <label id=massLabel>Mass: </label>
        <input type="text" id=mass>
        <br>
        <br>
        <label id=rForceLable>ResultantForce (Locked): </label>
        <input type="text" id=rForceX>
        <input type="text" id=rForceY>
        <br>
        <br>
        <label id=accelLable>ResultantAccel (Locked): </label>
        <input type="text" id=rAccelX>
        <input type="text" id=rAccelY>
        <br>
        <br>
        <label id=forcesLabel>Forces: </label>
        <br>
        <div id=forces></div>
        <button type="button" id="forceButton">Add Force</button>
        `
    }

    

    //Binds each HTML element to its corresponding attribute in the class
    bindAttributes() {
        //Adds a trigger to input box so that when enter is pressed,
        //the value in the input box is stored in its corresponding variable
        document.getElementById("positionX").addEventListener("keyup", (event) => {
            if (event.code === "Enter") {
                this.setPosition([Number(document.getElementById("positionX").value), this.#position[1]])
                document.getElementById("positionX").value = ""
            }
        })

        document.getElementById("positionY").addEventListener("keyup", (event) => {
            if (event.code === "Enter") {
                this.setPosition([this.#position[0], Number(document.getElementById("positionY").value)])
                document.getElementById("positionY").value = ""
            }
        })

        document.getElementById("velocityX").addEventListener("keyup", (event) => {
            if (event.code === "Enter") {
                this.setVelocity([Number(document.getElementById("velocityX").value), this.#velocity[1]])
                document.getElementById("velocityX").value = ""
            }
        })

        document.getElementById("velocityY").addEventListener("keyup", (event) => {
            if (event.code === "Enter") {
                this.setVelocity([this.#velocity[0], Number(document.getElementById("velocityY").value)])
                document.getElementById("velocityY").value = ""
            }
        })

        document.getElementById("mass").addEventListener("keyup", (event) => {
            if (event.code === "Enter") {
                this.setMass(Number(document.getElementById("mass").value))
                document.getElementById("mass").value = ""
            }
        })
    }

    //Adds a new force when the force button is clicked
    createForceButton() {
        //Generates the HTML for a new force and appends it to current HTML
        document.getElementById("forceButton").onclick = () => {
            const forceCount = this.#forceCount
            this.#uiForces[forceCount] = this.addForce([0, 0])
            this.addUIForce(forceCount)
            this.#forceCount += 1
        }
    }

    addUIForce(forceCount) {
        document.getElementById("forces").insertAdjacentHTML("beforeend", `
            <label id=forceLable${forceCount}>Force ${forceCount}: </label>
            <input type="text" id=forceX${forceCount}>
            <input type="text" id=forceY${forceCount}>
            <br>
            <label id=accelLable${forceCount}>Acceleration ${forceCount}: </label>
            <input type="text" id=accelX${forceCount}>
            <input type="text" id=accelY${forceCount}>
            <br>
            <br>
            `)

        document.getElementById(`forceX${forceCount}`).addEventListener("keyup", (event) => {
            if (event.code === "Enter") {
                let newForce = [Number(document.getElementById(`forceX${forceCount}`).value), this.#uiForces[forceCount][0][1]]
                this.setForce(this.#uiForces[forceCount], newForce)
                document.getElementById(`forceX${forceCount}`).value = ""
            }
        })

        document.getElementById(`forceY${forceCount}`).addEventListener("keyup", (event) => {
            if (event.code === "Enter") {
                let newForce = [this.#uiForces[forceCount][0][0], Number(document.getElementById(`forceY${forceCount}`).value)]
                this.setForce(this.#uiForces[forceCount], newForce)
                document.getElementById(`forceY${forceCount}`).value = ""
            }
        })

        document.getElementById(`accelX${forceCount}`).addEventListener("keyup", (event) => {
            if (event.code === "Enter") {
                let newForce = [Number(document.getElementById(`accelX${forceCount}`).value)*this.#mass, this.#uiForces[forceCount][0][1]]
                this.setForce(this.#uiForces[forceCount], newForce)
                document.getElementById(`accelX${forceCount}`).value = ""
            }
        })

        document.getElementById(`accelY${forceCount}`).addEventListener("keyup", (event) => {
            if (event.code === "Enter") {
                let newForce = [this.#uiForces[forceCount][0][0], Number(document.getElementById(`accelY${forceCount}`).value)*this.#mass]
                this.setForce(this.#uiForces[forceCount], newForce)
                document.getElementById(`accelY${forceCount}`).value = ""
            }
        })
    }

    //Updates the values of each of the input boxes each frame
    updateMenu() {
        document.getElementById("positionX").placeholder = this.#position[0].toFixed(3)
        document.getElementById("positionY").placeholder = this.#position[1].toFixed(3)

        document.getElementById("velocityX").placeholder = this.#velocity[0].toFixed(3)
        document.getElementById("velocityY").placeholder = this.#velocity[1].toFixed(3)

        document.getElementById("mass").placeholder = this.#mass.toFixed(3)

        document.getElementById("rForceX").placeholder = this.#rForce[0].toFixed(3)
        document.getElementById("rForceY").placeholder = this.#rForce[1].toFixed(3)
        document.getElementById("rAccelX").placeholder = this.#accel[0].toFixed(3)
        document.getElementById("rAccelY").placeholder = this.#accel[1].toFixed(3)

        for (let key in this.#uiForces) {
            document.getElementById(`forceX${key}`).placeholder = this.#uiForces[key][0][0].toFixed(3)
            document.getElementById(`forceY${key}`).placeholder = this.#uiForces[key][0][1].toFixed(3)
            document.getElementById(`accelX${key}`).placeholder = (this.#uiForces[key][0][0]/this.#mass).toFixed(3)
            document.getElementById(`accelY${key}`).placeholder = (this.#uiForces[key][0][1]/this.#mass).toFixed(3)
        }
    }
}

module.exports = Particle