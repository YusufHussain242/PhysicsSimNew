class Particle
{
    constructor(position)
    {
        this.position = position
        this.width = 10
        this.height = 10
    }

    update(deltaTime)
    {
        this.position[0] += 10*deltaTime
    }

    draw(ctx)
    {
        //Sets the colour to red and then draws a rectangle at the particles position
        ctx.fillStyle = "#f00";
        ctx.fillRect(this.position[0] - (this.width / 2), this.position[1] - (this.height / 2), this.width, this.height);
    }
}

module.exports = Particle