'use strict'

let gElCanvas
let gCtx
let img // Declare img here
let gCurrColor = '#000000'; // Default black color
let gCurrStroke = '#FFFFFF'; // Default white stroke



function onInit() {
    console.log('Welcome to summoners rift!');
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    img = new Image(); // Initialize img here

    const imageUploader = document.getElementById('imageUpload');
    imageUploader.addEventListener('change', handleImageUpload, false);
}

function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.fillStyle = gCurrColor
    gCtx.strokeStyle = gCurrStroke
    gCtx.font = '40px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function renderMeme() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    drawText('Hello', gElCanvas.width / 2, gElCanvas.width / 2); // Correctly call your drawText function
}
function handleImageUpload(event) {
    const file = event.target.files[0];

    if (!file.type.startsWith('image/')) { return; }

    const reader = new FileReader();
    reader.onload = function (e) {
        img.onload = function () {
            renderMeme(); // Correctly call the function
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}