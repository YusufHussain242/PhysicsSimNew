let Scene = require("./Scene.js");

let canvas = document.getElementById("canvas");
//Find the canvas element by its id
let ctx = canvas.getContext("2d");
//Get the rendering context from the canvas
//Rendering context is used to render all objects to the screen

//Set the width and height of the canvas to be the size of the window
canvas.width = 1000;
canvas.height = 500;

//Canvas automatically resizes to be the size of the canvas
/*
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
*/

let scene = new Scene(canvas);

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
        scene.update(deltaTime, timeStamp/1000);
        //Draw method needs rendering context to render objects to canvas
        scene.draw(ctx);
    }

    //Calls the sceneLoop function again
    //Browser will pass timeStamp into the scene loop function
    requestAnimationFrame(sceneLoop);
}

sceneLoop(0);