'use strict'
/********************/// GLOBALS ///********************/
const MEMES_STORAGE_KEY = 'memesDB'

let gElCanvas, gCtx, gMeme, gImg, gCurrTxtSize, gCurrColor, gCurrStroke

let gLineNum = 1
let gMemes = loadFromStorage(MEMES_STORAGE_KEY) || []

/********************/// GLOBALS ///********************/

_createMemes()


/********************/// INIT AND SETUP ///********************/
function initMemes() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    gImg = new Image()
    gCurrTxtSize = getTxtSize()

    // Load memes from local storage or initialize with a default meme
    gMemes = loadFromStorage(MEMES_STORAGE_KEY) || [_createDefaultMeme()]
    renderMemes()
}
/********************/// INIT AND SETUP ///********************/



/********************/// FUNCTIONALITIES ///********************/
function renderMemeOnCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    gCtx.drawImage(gImg, 0, 0, gElCanvas.width, gElCanvas.height);

    if (gMeme && gMeme.lines) {
        gMeme.lines.forEach(line => {
            console.log('Drawing text:', line.txt, 'at position y:', line.y);
            drawText(line.txt, gElCanvas.width / 2, line.y, line.size, line.color, line.stroke);
        });
    }
}

function calculateLineYPosition(index, size) {
    // This is an example calculation. You may need to adjust it based on your application's requirements
    return (index + 1) * (size + 10)
}


/********************/// VIEW FUNCTIONS ///********************/
function updateTextInput() {
    const elTxtChanger = document.getElementById('meme-text');
    if (gMeme && gMeme.lines && gMeme.selectedLineIdx != null) {
        elTxtChanger.value = gMeme.lines[gMeme.selectedLineIdx].txt;
    } else {
        elTxtChanger.value = '';
    }
}

function moveLinePositionUp() {
    if (!gMeme || !gMeme.lines.length || gMeme.selectedLineIdx == null) return;
    const line = gMeme.lines[gMeme.selectedLineIdx];
    line.y -= 5; // Move up by 5px
    onRenderMemeOnCanvas(); // Re-render the canvas
}

function moveLinePositionDown() {
    if (!gMeme || !gMeme.lines.length || gMeme.selectedLineIdx == null) return;
    const line = gMeme.lines[gMeme.selectedLineIdx];
    line.y += 5; // Move down by 5px
    onRenderMemeOnCanvas(); // Re-render the canvas
}

function updateDeleteLineButton() {
    const deleteBtn = document.querySelector('.line-delete');
    deleteBtn.disabled = !gMeme || !gMeme.lines.length;
}

function updateColorAndStrokeInputs() {
    const colorPicker = document.querySelector('.color-picker');
    const strokePicker = document.querySelector('.stroke-picker');
    if (gMeme && gMeme.lines && gMeme.selectedLineIdx != null) {
        colorPicker.value = colorNameToHex(gMeme.lines[gMeme.selectedLineIdx].color);
        strokePicker.value = colorNameToHex(gMeme.lines[gMeme.selectedLineIdx].stroke);
    }
}
/********************/// VIEW FUNCTIONS ///********************/

function imageUpload(file) {
    const reader = new FileReader()
    reader.onload = function (e) {
        gImg.src = e.target.result
        gImg.onload = function () {
            gMeme = _createMeme(gImg.src)
            addDefaultLine()
            onRenderMemeOnCanvas()
        };
    };
    reader.readAsDataURL(file);
}


//consider removing 
function addDefaultLine() {
    if (gMeme) {
        gMeme.lines = [{ txt: 'Your text here', size: 20, color: 'black', stroke: 'white', y: 50 }];
        gMeme.selectedLineIdx = 0;
    }
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
        const newY = (gMeme.lines.length > 0) ? gMeme.lines[gMeme.lines.length - 1].y + 50 : 50;
        gMeme.lines.push({ txt: 'Another line of tears', size: 20, color: 'black', stroke: 'white', y: newY });
        gMeme.selectedLineIdx = gMeme.lines.length - 1;
        onRenderMemeOnCanvas(); // Update UI and canvas
    }
}

function deleteLine() {
    if (!gMeme || !gMeme.lines.length || gMeme.selectedLineIdx == null) {
        return
    }
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)

    if (gMeme.lines.length === 0) {
        gMeme.selectedLineIdx = null
    } else if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = gMeme.lines.length - 1
    }
}

function switchLine() {
    if (!gMeme || !gMeme.lines.length) return

    // Move to the next line
    gMeme.selectedLineIdx++
    // If it's past the last line, go back to the first line
    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = 0
    }

    // Update the input fields and re-render the canvas
    updateTextInput()
    updateColorAndStrokeInputs()
    renderMemeOnCanvas()
}

function moveLineUp() {
    if (!gMeme || gMeme.lines.length < 2 || gMeme.selectedLineIdx <= 0) return;

    // Swap the selected line with the one above it
    [gMeme.lines[gMeme.selectedLineIdx - 1], gMeme.lines[gMeme.selectedLineIdx]] =
        [gMeme.lines[gMeme.selectedLineIdx], gMeme.lines[gMeme.selectedLineIdx - 1]];

    gMeme.selectedLineIdx--;
}

function moveLineDown() {
    if (!gMeme || gMeme.lines.length < 2 || gMeme.selectedLineIdx >= gMeme.lines.length - 1) return;

    // Swap the selected line with the one below it
    [gMeme.lines[gMeme.selectedLineIdx], gMeme.lines[gMeme.selectedLineIdx + 1]] =
        [gMeme.lines[gMeme.selectedLineIdx + 1], gMeme.lines[gMeme.selectedLineIdx]];

    gMeme.selectedLineIdx++;
}

function incrTxtSize() {
    if (gMeme && gMeme.lines && gMeme.selectedLineIdx != null) {
        let newSize = gMeme.lines[gMeme.selectedLineIdx].size + 1
        setTxtSize(newSize)
    }
}

function decrTxtSize() {
    if (gMeme && gMeme.lines && gMeme.selectedLineIdx != null) {
        let newSize = Math.max(gMeme.lines[gMeme.selectedLineIdx].size - 1, 1) // Prevent size from going below 1
        setTxtSize(newSize)
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
    const currMemeLine = gMemes.lines[gMemes.selectedLineIdx] // Access the line object using the selectedLineIdx
    const lineTxt = currMemeLine.txt // Now you can access the txt property
    return lineTxt
}

function getTxtSize() {
    if (!gMemes || !gMemes.lines || gMemes.lines.length === 0 || gMemes.selectedLineIdx == null) {
        return null // Or a default value
    }
    return gMemes.lines[gMemes.selectedLineIdx].size
}

function getTxtColor() {
    if (!gMemes || !gMemes.lines || gMemes.lines.length === 0 || gMemes.selectedLineIdx == null) {
        return 'black' // default color or any other handling
    }
    return gMemes.lines[gMemes.selectedLineIdx].color
}

function getTxtStroke() {
    if (!gMemes || !gMemes.lines || gMemes.lines.length === 0 || gMemes.selectedLineIdx == null) {
        return 'white' // default stroke color or any other handling
    }
    return gMemes.lines[gMemes.selectedLineIdx].stroke
}
/********************/// GETTERS ///********************/



/********************/// SETTERS ///********************/
function setLineTxt(newTxt) {
    if (gMeme && gMeme.lines && gMeme.selectedLineIdx != null) {
        gMeme.lines[gMeme.selectedLineIdx].txt = newTxt
    }
}

function setTxtSize(newSize) {
    if (gMeme && gMeme.lines && gMeme.selectedLineIdx != null) {
        gMeme.lines[gMeme.selectedLineIdx].size = newSize
        renderMemeOnCanvas() // Update the canvas
    }
}

function setTxtColor(newColor) {
    if (gMeme && gMeme.lines && gMeme.selectedLineIdx != null) {
        gMeme.lines[gMeme.selectedLineIdx].color = newColor
        renderMemeOnCanvas() // Re-render the canvas to show updated color
    }
}

function setTxtStroke(newStroke) {
    if (gMeme && gMeme.lines && gMeme.selectedLineIdx != null) {
        gMeme.lines[gMeme.selectedLineIdx].stroke = newStroke
        renderMemeOnCanvas() // Re-render the canvas to show updated stroke
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
    }
}

function _createMeme(imgUrl, lines = []) {
    if (lines.length === 0) {
        lines.push({
            txt: 'Line of tears',
            size: 20,
            color: 'black',
            stroke: 'white',
            y: 50,
        })
    }

    return {
        id: generateUniqueId(),
        imgUrl,
        lines,
        selectedLineIdx: 0
    }
}

function _createDefaultMeme() {
    return {
        id: 0, // Assign a unique ID for the default meme
        imgUrl: 'path/to/default/image.jpg',
        lines: [{ txt: 'Default Text', size: 20, color: 'black', stroke: 'white' }],
        selectedLineIdx: 0
    }
}

function _createMemes() {
    const savedMemes = loadFromStorage(MEMES_STORAGE_KEY)
    if (!savedMemes || !savedMemes.length) {
        gMemes = []
        // Temporarily add a default meme for testing
        gMemes.push(_createMeme(
            'img/meme-imgs/meme-img-square/y-u-no.png',
            [{ txt: 'Sample Meme', size: 20, color: 'black', stroke: 'white' }]))
        _saveMemesToStorage() // Save the default meme for testing
    } else {
        gMemes = savedMemes
    }
}

function _saveMemesToStorage() {
    saveToStorage(MEMES_STORAGE_KEY, gMemes)
}