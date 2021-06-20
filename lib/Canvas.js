class Canvas {
    constructor() {

    }


    setup() {
        canvas = createCanvas(window.innerWidth, window.innerHeight);
        background(255);
    };

    draw() {
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

    mousePressed() {
        currentPath = [];
        paths.push(currentPath);
    }
}