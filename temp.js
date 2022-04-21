class Particle {

    createMenu() {
        this.generateHTML()
        this.bindAttributes()
    }

    //Creates the required elements in the properties menu
    generateHTML() {
        document.getElementById("propertiesMenu").innerHTML = `
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
            <label id=rForceLable>ResultantForce: </label>
            <input type="text" id=rForceX>
            <input type="text" id=rForceY>
            <br>
            <br>
            <label id=accelLable>ResultantAccel: </label>
            <input type="text" id=accelyX>
            <input type="text" id=accelY>
            <br>
            <br>
            <label id=forcesLabel>Forces: </label>
            <br>
            <div id=forces></div>
            <button type="button" id="forceButton">Add Force</button>
            `
    }

    //Adds a trigger to input boxes so that when enter is pressed,
    //the value in the input box is stored in its corresponding variable
    bindAttributes() {
        document.getElementById("positionX").addEventListener("keyup", (event) => {
            if (event.code === "Enter") {
                this.#position[0] = Number(document.getElementById("positionX").value)
                document.getElementById("positionX").value = ""
            }
        })

        document.getElementById("positionY").addEventListener("keyup", (event) => {
            if (event.code === "Enter") {
                this.#position[1] = Number(document.getElementById("positionY").value)
                document.getElementById("positionY").value = ""
            }
        })

        document.getElementById("velocityX").addEventListener("keyup", (event) => {
            if (event.code === "Enter") {
                this.#velocity[0] = Number(document.getElementById("velocityX").value)
                document.getElementById("velocityX").value = ""
            }
        })

        document.getElementById("velocityY").addEventListener("keyup", (event) => {
            if (event.code === "Enter") {
                this.#velocity[1] = Number(document.getElementById("velocityY").value)
                document.getElementById("velocityY").value = ""
            }
        })

        document.getElementById("mass").addEventListener("keyup", (event) => {
            if (event.code === "Enter") {
                this.#mass = Number(document.getElementById("mass").value)
                document.getElementById("mass").value = ""
            }
        })
    }
}