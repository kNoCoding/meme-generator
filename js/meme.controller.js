'use strict'

let gElCanvas
let gCtx
let gImg
let gCurrTxtSize
let gCurrColor
let gCurrStroke

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    gImg = new Image()
    gCurrTxtSize = getTxtSize()

    addEventListeners()
}



function renderMeme() {
    const elTxtChanger = document.getElementById('meme-text')
    elTxtChanger.value = getLineTxt()

    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    gCtx.drawImage(gImg, 0, 0, gElCanvas.width, gElCanvas.height)
    drawText(getLineTxt(), gElCanvas.width / 2, gElCanvas.height / 2)
}

function onImgClick(event) {
    gImg.src = event.target.src;
    gImg.onload = function () {

        // Update the current color based on the selected line's color
        gCurrColor = colorNameToHex(getTxtColor()); // Ensure this is in hex format
        gCurrStroke = colorNameToHex(getTxtStroke())

        // Update the color picker's value to reflect the current color
        const elTxtColorChanger = document.querySelector('.color-picker');
        elTxtColorChanger.value = gCurrColor;

        const elTxtStrokeChanger = document.querySelector('.stroke-picker');
        elTxtStrokeChanger.value = gCurrStroke;

        renderMeme();
    };
}

function onChangeTxt(event) {
    let newTxt = event.target.value
    setLineTxt(newTxt)
    renderMeme()
}

function drawText(text, x, y) {
    gCtx.lineWidth = 1
    gCtx.fillStyle = gCurrColor
    gCtx.strokeStyle = gCurrStroke
    gCtx.font = gCurrTxtSize + 'px Arial';

    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file.type.startsWith('image/')) { return; }

    const reader = new FileReader();
    reader.onload = function (e) {
        gImg.src = e.target.result;
        gImg.onload = function () {
            renderMeme();
        };
    };
    reader.readAsDataURL(file);
}

function downloadCanvas() {
    // Get the canvas data as an image (PNG format by default)
    const imageData = gElCanvas.toDataURL("image/png");

    // Create a temporary link element
    const downloadLink = document.createElement('a');
    downloadLink.href = imageData;
    // Name the download file
    downloadLink.download = `your-funny-meme.png`;

    // Append the link to the document, trigger click, then remove the link
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function onIncrTxtSize() {
    gCurrTxtSize++
    setTxtSize(gCurrTxtSize)
    renderMeme()
}

function onDecrTxtSize() {
    gCurrTxtSize--
    setTxtSize(gCurrTxtSize)
    renderMeme()
}

function onSetColor(color) {
    gCurrColor = color
    setTxtColor(gCurrColor)
    renderMeme()
}

function onSetStroke(stroke) {
    gCurrStroke = stroke
    setTxtStroke(gCurrStroke)
    renderMeme()
}


function addEventListeners() {
    //listen to CHANGE events on the upload image
    const imageUploader = document.getElementById('imageUpload')
    imageUploader.addEventListener('change', handleImageUpload, false)

    //listen to CLICK events on the gallery images
    const gallery = document.querySelector('.gallery')
    gallery.addEventListener('click', function (event) {
        if (event.target.tagName === 'IMG') onImgClick(event)
    })

    //listen to INPUT events on the meme text input
    const memeTextChanger = document.getElementById('meme-text')
    memeTextChanger.addEventListener('input', onChangeTxt, false)

    //listen to CLICK events on the download button
    const downloadBtn = document.querySelector('.downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadCanvas, false);
    }

    //listen to CLICK events on the incrTxtSize button
    const incrTxtSize = document.querySelector('.incr-fs');
    if (incrTxtSize) {
        incrTxtSize.addEventListener('click', onIncrTxtSize, false);
    }

    //listen to CLICK events on the incrTxtSize button
    const decrTxtSize = document.querySelector('.decr-fs');
    if (decrTxtSize) {
        decrTxtSize.addEventListener('click', onDecrTxtSize, false);
    }
}