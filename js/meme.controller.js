'use strict'

let gElCanvas
let gCtx
let img
let gCurrColor = '#000000'; // Default black color
let gCurrStroke = '#FFFFFF'; // Default white stroke

function onInit() {
    console.log('Welcome to summoners rift!')
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    img = new Image()

    //listen to CHANGE events on the upload image
    const imageUploader = document.getElementById('imageUpload')
    imageUploader.addEventListener('change', handleImageUpload, false)

    //listen to CLICK events on the gallery images
    const gallery = document.querySelector('.gallery')
    gallery.addEventListener('click', function (event) {
        if (event.target.tagName === 'IMG') {
            onMemeClick(event)
        }
    })

    //listen to CHANGE events on the meme text input
    const memeTextChanger = document.getElementById('meme-text')
    memeTextChanger.addEventListener('input', onChangeTxt, false)
}

function renderMeme() {
    let elTxtChanger = document.getElementById('meme-text')
    elTxtChanger.value = getLineTxt()

    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    drawText(getLineTxt(), gElCanvas.width / 2, gElCanvas.height / 2)
}

function onMemeClick(event) {
    img.src = event.target.src;
    img.onload = function () {
        renderMeme();
    };
}

function onChangeTxt(event) {
    let newTxt = event.target.value
    setLineTxt(newTxt)
    renderMeme()
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

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file.type.startsWith('image/')) { return; }

    const reader = new FileReader();
    reader.onload = function (e) {
        img.src = e.target.result;
        img.onload = function () {
            renderMeme();
        };
    };
    reader.readAsDataURL(file);
}