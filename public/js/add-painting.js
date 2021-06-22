//i think this is the js file that will have the fetch post requests that link to controllers/painting-routes.js
const colorInput = document.getElementById('color-selection');
const weight = document.getElementById('line-weight');
const clear = document.getElementById('clear-canvas');
const save = document.getElementById('save-canvas');
const paths = [];
const currentPath = [];
var canvas;

const setup = () => {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    background(255);
};

const draw = () => {
    noFill();

    if(mouseIsPressed) {
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

const mousePressed = () => {
    currentPath = [];
    paths.push(currentPath);
}

clear.addEventListener('click', () => {
    paths.splice(0);
    background(255);
});

save.addEventListener('click', () => {
    saveCanvas('painterly-canvas', 'jpg');
});
