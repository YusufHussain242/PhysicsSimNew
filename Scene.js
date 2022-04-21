const { or } = require("mathjs");
let Particle = require("./Particle.js")

class Scene
{
    #objects;
    #timeStamp = 0;
    #canvas;
    #selectedObject;
    #paused = false;
    #objectCount = 0

    constructor(canvas) {
        this.#canvas = canvas
        document.onmousedown = this.selectObject.bind(this);

        document.getElementById("addParticleButton").onclick = () => {
            this.#objects.particles.push(new Particle(this.#objectCount, this, [0, 0], [0, 0], 1))
            this.#objectCount += 1
        }

        //Toggles pause when the pause button is clicked
        document.getElementById("togglePause").onclick = () => {
            this.#paused = !this.#paused //Changes the paused variable
            //Alternate the text of the pause button 
            let button = document.getElementById("togglePause")
            if (button.value == "Pause")
                button.value = "Resume"
            else
                button.value = "Pause"
        }

        this.#objects = {"particles": []}
    }

    //Calls update functions of all scene objects each frame
    update(deltaTime, timeStamp) {
        this.#timeStamp = timeStamp
        if (!this.#paused) {
            for(let key in this.#objects) {
                for(let object of this.#objects[key]) {
                    object.update(deltaTime)
                }
            }
        }
    }

    selectObject(event) {
        //If they clicked outside of the canvas, exit the function
        if (!this.isWithinCanvas(event)) {
            return
        }
        //If an object is currently selected, make it unselected
        if (this.#selectedObject != undefined) {
            this.#selectedObject.toggleSelected()
        }
        //Make new selected object the closest object to cursor
        this.#selectedObject = this.getClosestObject(event)
        //If new object found, make it selected and generate its properties menu
        if (this.#selectedObject != undefined) {
            this.#selectedObject.toggleSelected()
            this.#selectedObject.createMenu()
        }
    }

    isWithinCanvas(event) {
        let rect = this.#canvas.getBoundingClientRect()
        return event.clientX > 0 && event.clientX < rect.right && event.clientY > 0 && event.clientY < rect.bottom
    }

    //Finds closest object to cursor
    getClosestObject(event) {
        let lowestDist = 99999999
        let closestObject = null
        //Iterates over all objects in scene
        for(let key in this.#objects) {
            for(let object of this.#objects[key]) {
                //Checks if they have getPosition and createMenu functions
                //If they dont have these functions it is assumed they dont have position or a properties menu
                if (typeof object.getPosition === "function" && typeof object.createMenu === "function") {
                    let xDistance = object.getPosition()[0] - this.getMousePos(event)[0]
                    let yDistance = object.getPosition()[1] - this.getMousePos(event)[1]
                    let totDist = (xDistance**2 + yDistance**2)**0.5
                    if (totDist < lowestDist) {
                        lowestDist = totDist
                        closestObject = object
                    }
                }
            }
        }
        return closestObject
    }

    //Gets mouse position relative to canvas 
    getMousePos(event) {
        let rect = this.#canvas.getBoundingClientRect()
        return [event.clientX - rect.left, event.clientY -  rect.top]
    }

    getTime() {
        return this.#timeStamp
    }

    getObjects() {
        return this.#objects
    }

    //Calls draw functions of all scene objects each frame
    draw(ctx)
    {
        for(let key in this.#objects)
        {
            for(let object of this.#objects[key])
            {
                object.draw(ctx)
            }
        }
    }
}

module.exports = Scene