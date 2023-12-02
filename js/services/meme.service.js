'use strict'
/********************/// GLOBALS ///********************/
const MEMES_STORAGE_KEY = 'memesDB'

let gElCanvas, gCtx, gImg, gCurrTxtSize, gCurrColor, gCurrStroke

let gLineNum = 1
let gMemes = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [_createNewLine()]
}
let gKeywordSearchCountMap = {
    'funny': 12,
    'cat': 16,
    'baby': 2
}
/********************/// GLOBALS ///********************/



/********************/// INIT AND SETUP ///********************/
function initMeme() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    gImg = new Image()
    gCurrTxtSize = getTxtSize()
}
/********************/// INIT AND SETUP ///********************/



/********************/// FUNCTIONALITIES ///********************/
function renderMeme() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    gCtx.drawImage(gImg, 0, 0, gElCanvas.width, gElCanvas.height)

    gMemes.lines.forEach((line, index) => {
        // Calculate Y-position for each line
        let yPos = (index + 1) * (line.size + 10); // Example calculation
        drawText(line.txt, gElCanvas.width / 2, yPos, line.size, line.color, line.stroke);
    });
}

function imageUpload(file) {
    const reader = new FileReader()
    reader.onload = function (e) {
        gImg.src = e.target.result
        gImg.onload = renderMeme
    }
    reader.readAsDataURL(file);
}

function drawText(text, x, y, size, color, stroke) {
    gCtx.lineWidth = 1
    gCtx.fillStyle = color
    gCtx.strokeStyle = stroke
    gCtx.font = size + 'px Arial';

    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function addLine() {
    const lines = gMemes.lines
    lines.push(_createNewLine())
}

function switchLine() {
    console.log('and this is the meme.service speaking');
}

function incrTxtSize() {
    gCurrTxtSize++
    setTxtSize(gCurrTxtSize)
}

function decrTxtSize() {
    gCurrTxtSize--
    setTxtSize(gCurrTxtSize)
}
/********************/// FUNCTIONALITIES ///********************/



/********************/// GETTERS ///********************/
function getMeme(imgUrl) {
    return gGallery.find(img => imgUrl === img.url)
}

function getLineTxt() {
    const currMemeLine = gMemes.lines[gMemes.selectedLineIdx]; // Access the line object using the selectedLineIdx
    const lineTxt = currMemeLine.txt; // Now you can access the txt property
    return lineTxt
}

function getTxtSize() {
    const currMemeTxtSize = gMemes.lines[gMemes.selectedLineIdx].size
    return currMemeTxtSize
}

function getTxtColor() {
    const currMemeTxtColor = gMemes.lines[gMemes.selectedLineIdx].color
    return currMemeTxtColor
}

function getTxtStroke() {
    const currMemeTxtStroke = gMemes.lines[gMemes.selectedLineIdx].stroke
    return currMemeTxtStroke
}
/********************/// GETTERS ///********************/



/********************/// SETTERS ///********************/
function setLineTxt(newTxt) {
    const currMemeLine = gMemes.lines[gMemes.selectedLineIdx]
    if (currMemeLine === newTxt) return
    currMemeLine.txt = newTxt
    return newTxt
}

function setTxtSize(newSize) {
    const currMemeTxtSize = getTxtSize()
    if (currMemeTxtSize === newSize) return
    gMemes.lines[gMemes.selectedLineIdx].size = newSize
}

function setTxtColor(newColor) {
    const currMemeTxtColor = getTxtColor()
    if (currMemeTxtColor === newColor) return
    gMemes.lines[gMemes.selectedLineIdx].color = newColor
}

function setTxtStroke(newStroke) {
    const currMemeTxtStroke = getTxtStroke()
    if (currMemeTxtStroke === newStroke) return
    gMemes.lines[gMemes.selectedLineIdx].stroke = newStroke
}
/********************/// SETTERS ///********************/



// PRIVATE FUNCTIONS
function _createNewLine(lineNum = gLineNum++, txt = "A line of tears", size = 20, color = 'black', stroke = 'white') {
    return {
        lineNum,
        txt,
        size,
        color,
        stroke,
    }
}