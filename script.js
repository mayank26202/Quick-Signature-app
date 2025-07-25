const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const canvas = document.getElementById("myCanvas");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const retrieveButton = document.getElementById("retrieveButton");
const fontPicker = document.getElementById("fontPicker");


const ctx = canvas.getContext('2d');

let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Set initial UI values
colorPicker.value = '#000000';
canvasColor.value = '#ffffff';
fontPicker.value = '5';

// Set initial canvas styles
ctx.strokeStyle = '#000000';
ctx.lineWidth = 5;
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, canvas.width, canvas.height);


// Text color / Stroke color
colorPicker.addEventListener('change', (e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
});

// Background color
canvasColor.addEventListener('change', (e) => {
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Font size (stroke thickness)
fontPicker.addEventListener('change', (e) => {
    ctx.lineWidth = parseInt(e.target.value);
});

// Drawing
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        lastX = e.offsetX;
        lastY = e.offsetY;
    }
});

canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseleave', () => isDrawing = false);

// Clear Button
clearButton.addEventListener('click', () => {
    // Reset UI values
    colorPicker.value = '#000000';
    canvasColor.value = '#ffffff';
    fontPicker.value = '5';

    // Reset canvas styles
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 5;
    ctx.fillStyle = '#ffffff';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});


// Save Button
saveButton.addEventListener('click', () => {
    localStorage.setItem('canvasContents', canvas.toDataURL());

    let link = document.createElement('a');
    link.download = 'my-signature.png';
    link.href = canvas.toDataURL();
    link.click();
});


//Retrieve Button
retrieveButton.addEventListener('click',()=>{
    let savedCanvas = localStorage.getItem('canvasContents');

    if(savedCanvas){
        let img = new Image();
        img.src = savedCanvas;
        ctx.drawImage(img,0,0);
    }
})