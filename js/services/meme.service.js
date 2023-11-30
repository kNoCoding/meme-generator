'use strict'

let gMemes = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'No tears at all',
            size: 20,
            color: 'green',
            stroke: 'blue',
        }
    ]
}
let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getMeme(imgUrl) {
    return gGallery.find(img => imgUrl === img.url)
}

function setLineTxt(newTxt) {
    const currMemeLine = gMemes.lines[gMemes.selectedLineIdx]
    if (currMemeLine === newTxt) return
    currMemeLine.txt = newTxt
    return newTxt
}

function getLineTxt() {
    const currMemeLine = gMemes.lines[gMemes.selectedLineIdx]; // Access the line object using the selectedLineIdx
    const lineTxt = currMemeLine.txt; // Now you can access the txt property
    return lineTxt
}

function setTxtColor(newColor) {
    const currMemeTxtColor = gMemes.lines[gMemes.selectedLineIdx].color
    if (currMemeTxtColor === newColor) return
    gMemes.lines[gMemes.selectedLineIdx].color = newColor
}

function getTxtColor() {
    const currMemeTxtColor = gMemes.lines[gMemes.selectedLineIdx].color
    return currMemeTxtColor
}

function setTxtStroke(newStroke) {
    const currMemeTxtStroke = gMemes.lines[gMemes.selectedLineIdx].stroke
    if (currMemeTxtStroke === newStroke) return
    gMemes.lines[gMemes.selectedLineIdx].stroke = newStroke
}

function getTxtStroke() {
    const currMemeTxtStroke = gMemes.lines[gMemes.selectedLineIdx].stroke
    return currMemeTxtStroke
}

// util function

function colorNameToHex(color) {
    var colors = {
        "red": "#ff0000",
        "blue": "#0000ff",
        "green": "#008000",
        // Add more mappings as needed
    };

    return colors[color.toLowerCase()] || color;
}