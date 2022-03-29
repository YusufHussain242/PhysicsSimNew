let Particle = require("./Particle.js")

class Scene
{
    constructor()
    {
        let particle1 = new Particle([500,500], [0, 0], 1)
        let index = particle1.addForce([5,5])
        particle1.addForce([0,98])
        particle1.removeForce(index)

        this.objects = {"particles": [particle1]}
    }

    //Calls update functions of all scene objects each frame
    update(deltaTime)
    {
        for(let key in this.objects)
        {
            for(let object of this.objects[key])
            {
                object.update(deltaTime)
            }
        }
    }

    //Calls draw functions of all scene objects each frame
    draw(ctx)
    {
        for(let key in this.objects)
        {
            for(let object of this.objects[key])
            {
                object.draw(ctx)
            }
        }
    }
}

module.exports = Scene