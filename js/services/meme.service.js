'use strict'
/********************/// GLOBALS ///********************/
const MEMES_STORAGE_KEY = 'memesDB'

let gElCanvas, gCtx, gMeme, gImg, gCurrTxtSize, gCurrColor, gCurrStroke

let gLineNum = 1
let gMemes = loadFromStorage(MEMES_STORAGE_KEY) || []
let gMemeId = 0

/********************/// GLOBALS ///********************/

_createMemes()


/********************/// INIT AND SETUP ///********************/
function initMemes() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    gImg = new Image()
    gCurrTxtSize = getTxtSize()

}
/********************/// INIT AND SETUP ///********************/



/********************/// FUNCTIONALITIES ///********************/
function renderMemeOnCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    gCtx.drawImage(gImg, 0, 0, gElCanvas.width, gElCanvas.height);

    // Ensure gMeme and gMeme.lines are defined
    if (gMeme && gMeme.lines) {
        gMeme.lines.forEach((line, index) => {
            // Calculate Y-position for each line
            let yPos = calculateLineYPosition(index, line.size); // Adjust as per your requirement
            drawText(line.txt, gElCanvas.width / 2, yPos, line.size, line.color, line.stroke);
        });
    }
}


function calculateLineYPosition(index, size) {
    // This is an example calculation. You may need to adjust it based on your application's requirements
    return (index + 1) * (size + 10);
}

function imageUpload(file) {
    const reader = new FileReader()
    reader.onload = function (e) {
        gImg.src = e.target.result
        gImg.onload = renderMemeOnCanvas
    }
    reader.readAsDataURL(file);
}

function drawText(text, x, y, size, color, stroke) {
    gCtx.font = size + 'px Arial';
    gCtx.fillStyle = color;
    gCtx.strokeStyle = stroke;
    gCtx.textAlign = 'center';
    gCtx.textBaseline = 'middle';
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function addLine() {
    if (gMeme) {
        gMeme.lines.push({ txt: 'Another line of tears', size: 20, color: 'black', stroke: 'white' });
        gMeme.selectedLineIdx = gMeme.lines.length - 1; // Select the new line
        renderMemeOnCanvas(); // Re-render the canvas
    }
    updateColorAndStrokeInputs(); // Update color and stroke inputs
}
function switchLine() {
    console.log('and this is the meme.service speaking');
    updateColorAndStrokeInputs(); // Update color and stroke inputs
}

function incrTxtSize() {
    if (gMeme && gMeme.lines && gMeme.selectedLineIdx != null) {
        let newSize = gMeme.lines[gMeme.selectedLineIdx].size + 1;
        setTxtSize(newSize);
    }
}

function decrTxtSize() {
    if (gMeme && gMeme.lines && gMeme.selectedLineIdx != null) {
        let newSize = Math.max(gMeme.lines[gMeme.selectedLineIdx].size - 1, 1); // Prevent size from going below 1
        setTxtSize(newSize);
    }
}
/********************/// FUNCTIONALITIES ///********************/



/********************/// GETTERS ///********************/
function getMemes() {
    return gMemes
}

function getMeme(imgUrl) {
    return gGallery.find(img => imgUrl === img.url)
}

function getLineTxt() {
    const currMemeLine = gMemes.lines[gMemes.selectedLineIdx]; // Access the line object using the selectedLineIdx
    const lineTxt = currMemeLine.txt; // Now you can access the txt property
    return lineTxt
}

function getTxtSize() {
    if (!gMemes || !gMemes.lines || gMemes.lines.length === 0 || gMemes.selectedLineIdx == null) {
        return null; // Or a default value
    }
    return gMemes.lines[gMemes.selectedLineIdx].size;
}

function getTxtColor() {
    if (!gMemes || !gMemes.lines || gMemes.lines.length === 0 || gMemes.selectedLineIdx == null) {
        return 'black'; // default color or any other handling
    }
    return gMemes.lines[gMemes.selectedLineIdx].color;
}

function getTxtStroke() {
    if (!gMemes || !gMemes.lines || gMemes.lines.length === 0 || gMemes.selectedLineIdx == null) {
        return 'white'; // default stroke color or any other handling
    }
    return gMemes.lines[gMemes.selectedLineIdx].stroke;
}
/********************/// GETTERS ///********************/



/********************/// SETTERS ///********************/
function setLineTxt(newTxt) {
    if (gMeme && gMeme.lines && gMeme.selectedLineIdx != null) {
        gMeme.lines[gMeme.selectedLineIdx].txt = newTxt;
        renderMemeOnCanvas(); // Re-render the canvas to show updated text
    }
}

function setTxtSize(newSize) {
    if (gMeme && gMeme.lines && gMeme.selectedLineIdx != null) {
        gMeme.lines[gMeme.selectedLineIdx].size = newSize;
        renderMemeOnCanvas(); // Update the canvas
    }
}

function setTxtColor(newColor) {
    if (gMeme && gMeme.lines && gMeme.selectedLineIdx != null) {
        gMeme.lines[gMeme.selectedLineIdx].color = newColor;
        renderMemeOnCanvas(); // Re-render the canvas to show updated color
    }
}

function setTxtStroke(newStroke) {
    if (gMeme && gMeme.lines && gMeme.selectedLineIdx != null) {
        gMeme.lines[gMeme.selectedLineIdx].stroke = newStroke;
        renderMemeOnCanvas(); // Re-render the canvas to show updated stroke
    }
}
/********************/// SETTERS ///********************/



// PRIVATE FUNCTIONS
function _createNewLine(txt = "New line of tears", size = 20, color = 'black', stroke = 'white') {
    return {
        lineNum: gLineNum++,
        txt,
        size,
        color,
        stroke
    };
}

function _createMeme(imgUrl, lines = []) {
    // Check if lines array is empty and add a default line
    if (lines.length === 0) {
        lines.push({
            txt: 'Enter your text here', // Default text
            size: 20,                   // Default size
            color: 'black',             // Default color
            stroke: 'white'             // Default stroke
        });
    }

    return {
        id: gMemeId++,
        imgUrl,
        lines,
        selectedLineIdx: 0 // Initialize with 0, assuming the first line is selected by default
    };
}

function _createMemes() {
    const savedMemes = loadFromStorage(MEMES_STORAGE_KEY);
    if (!savedMemes || !savedMemes.length) {
        gMemes = []; // Initialize as empty array
        // Temporarily add a default meme for testing
        gMemes.push(_createMeme(
            'img/meme-imgs/meme-img-square/y-u-no.png',
            [{ txt: 'Sample Meme', size: 20, color: 'black', stroke: 'white' }]))
        _saveMemesToStorage() // Save the default meme for testing
    } else {
        gMemes = savedMemes;
    }
}

function _saveMemesToStorage() {
    saveToStorage(MEMES_STORAGE_KEY, gMemes)
}