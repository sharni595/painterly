//i think this is the js file that will have the fetch post requests that link to controllers/painting-routes.js
const colorInput = document.getElementById('color-selection');
const weight = document.getElementById('line-weight');
const clear = document.getElementById('clear-canvas');
const save = document.getElementById('save-canvas');
const paths = [];
const currentPath = [];
var canvas;

clear.addEventListener('click', () => {
    paths.splice(0);
    background(255);
});

save.addEventListener('click', () => {
    saveCanvas('painterly-canvas', 'jpg');
});
