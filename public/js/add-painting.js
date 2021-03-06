//i think this is the js file that will have the fetch post requests that link to controllers/painting-routes.js
const colorInput = document.getElementById('color-selection');
const weight = document.getElementById('line-weight');
const clear = document.getElementById('clear-canvas');
const save = document.getElementById('save-canvas');
const paths = [];
let currentPath = [];
var canvas;

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    background(255);
};

function draw() {
    noFill();

    if (mouseIsPressed) {
        const point = {
            x: mouseX,
            y: mouseY,
            color: colorInput.value,
            weight: weight.value
        };

        currentPath.push(point);
    }

    paths.forEach(path => {
        beginShape();
        path.forEach(point => {
            stroke(point.color);
            strokeWeight(point.weight);
            vertex(point.x, point.y);
        });
        endShape();
    });
}

function touchStarted() {
    currentPath = [];
    paths.push(currentPath);
}

function mousePressed() {
    currentPath = [];
    paths.push(currentPath);
}

clear.addEventListener('click', () => {
    paths.splice(0);
    background(255);
});

save.addEventListener('click', () => {
    let canvasName = prompt('What would you like to name your painting?')
    if (canvasName) {
        saveCanvas(canvasName, 'jpg');
    } else {
        return;
    }
});
