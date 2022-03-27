(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let Scene = require("./Scene.js");

let canvas = document.getElementById("canvas");
//Find the canvas element by its id
let ctx = canvas.getContext("2d");
//Get the rendering context from the canvas
//Rendering context is used to render all objects to the screen

//Set the width and height of the canvas to be the size of the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Canvas automatically resizes to be the size of the canvas
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let scene = new Scene(canvas.width, canvas.height, ctx);

//Used in calculating deltaTime (Time between frames)
let lastTime = 0;

//The main loop of our simulation. Will run each frame
function sceneLoop(timeStamp)
{
    //Gets the difference in total time this frame and last frame
    //This gives you the time in between 1 frame
    let deltaTime = (timeStamp - lastTime) / 1000;
    lastTime = timeStamp;

    //Clear the canvas each frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Passing in a deltaTime of 0 would break things
    //so we skip any processing on the first frame
    if (deltaTime != 0)
    {
        //update method needs deltaTime for normalising simulation speed
        scene.update(deltaTime);
        //Draw method needs rendering context to render objects to canvas
        scene.draw(ctx);
    }

    //Calls the sceneLoop function again
    //Browser will pass timeStamp into the scene loop function
    requestAnimationFrame(sceneLoop);
}

sceneLoop(0);
},{"./Scene.js":3}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
let Particle = require("./Particle.js")

class Scene
{
    constructor()
    {
        let particle1 = new Particle([100,100])

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
},{"./Particle.js":2}]},{},[1]);
