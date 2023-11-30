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

function getLineTxt() {
    const currMemeLine = gMemes.lines[gMemes.selectedLineIdx]; // Access the line object using the selectedLineIdx
    const lineTxt = currMemeLine.txt; // Now you can access the txt property
    return lineTxt
}

function setLineTxt(newTxt) {
    const currMemeLine = gMemes.lines[gMemes.selectedLineIdx]
    if (currMemeLine === newTxt) return
    currMemeLine.txt = newTxt
    return newTxt
}

function getTxtSize() {
    const currMemeTxtSize = gMemes.lines[gMemes.selectedLineIdx].size
    return currMemeTxtSize
}

function setTxtSize(newSize) {
    const currMemeTxtSize = getTxtSize()
    if (currMemeTxtSize === newSize) return
    gMemes.lines[gMemes.selectedLineIdx].size = newSize
}

function getTxtColor() {
    const currMemeTxtColor = gMemes.lines[gMemes.selectedLineIdx].color
    return currMemeTxtColor
}

function setTxtColor(newColor) {
    const currMemeTxtColor = getTxtColor()
    if (currMemeTxtColor === newColor) return
    gMemes.lines[gMemes.selectedLineIdx].color = newColor
}

function getTxtStroke() {
    const currMemeTxtStroke = gMemes.lines[gMemes.selectedLineIdx].stroke
    return currMemeTxtStroke
}

function setTxtStroke(newStroke) {
    const currMemeTxtStroke = getTxtStroke()
    if (currMemeTxtStroke === newStroke) return
    gMemes.lines[gMemes.selectedLineIdx].stroke = newStroke
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