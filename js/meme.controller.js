'use strict'


/********************/// INIT AND SETUP ///********************/
function onInitMemes() {
    addMemeOnCanvasEventListeners()
    initMemes()
    renderMemes()
}

function addMemeOnCanvasEventListeners() {

    //listen to INPUT events on the meme text input
    const memeTextChanger = document.getElementById('meme-text')
    memeTextChanger.addEventListener('input', onChangeTxt, false)

    const saveBtn = document.querySelector('.saveBtn')
    saveBtn.addEventListener('click', _saveMeme);


    //listen to CLICK events on the download button
    const downloadBtn = document.querySelector('.downloadBtn')
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadCanvas, false)
    }

    //listen to CLICK events on the share button
    const shareBtn = document.querySelector('.shareBtn')
    if (shareBtn) {
        shareBtn.addEventListener('click', onShareMemeToFacebook, false)
    }

    //listen to CLICK events on the incrTxtSize button
    const incrTxtSize = document.querySelector('.incr-fs')
    if (incrTxtSize) {
        incrTxtSize.addEventListener('click', onIncrTxtSize, false)
    }

    //listen to CLICK events on the decrTxtSize button
    const decrTxtSize = document.querySelector('.decr-fs')
    if (decrTxtSize) {
        decrTxtSize.addEventListener('click', onDecrTxtSize, false)
    }

    //listen to CLICK events on the newLone button
    const addLine = document.querySelector('.line-new')
    if (addLine) {
        addLine.addEventListener('click', onAddLine, false)
    }

    //listen to CLICK events on the switchLine button
    const switchLine = document.querySelector('.line-switch')
    if (switchLine) {
        switchLine.addEventListener('click', onSwitchLine, false)
    }
}

function renderMemes() {
    const memesContainer = document.querySelector('.memes-container');
    let html = '';

    gMemes.forEach(meme => {
        html += `<div class="meme">
                    <img src="${meme.imgUrl}" alt="Saved Meme">
                 </div>`;
    });

    memesContainer.innerHTML = html;
}
/********************/// INIT AND SETUP ///********************/



/********************/// VIEW FUNCTIONS ///********************/
function updateColorAndStrokeInputs() {
    const colorPicker = document.querySelector('.color-picker');
    const strokePicker = document.querySelector('.stroke-picker');
    if (gMeme && gMeme.lines && gMeme.selectedLineIdx != null) {
        colorPicker.value = colorNameToHex(gMeme.lines[gMeme.selectedLineIdx].color);
        strokePicker.value = colorNameToHex(gMeme.lines[gMeme.selectedLineIdx].stroke);
    }
}
/********************/// VIEW FUNCTIONS ///********************/



/********************/// EVENT HANDLERS ///********************/
function onRenderMemeOnCanvas() {
    const elTxtChanger = document.getElementById('meme-text')
    elTxtChanger.value = getLineTxt()
    renderMemeOnCanvas()
}

function onAddLine() {
    addLine()
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    updateTextInput()
    updateColorAndStrokeInputs()
    renderMemeOnCanvas()
}



// IM WORKING ON THIS BUT WENT TO FIX THE MVC A LITTLE
function onSwitchLine(event) {
    console.log('this is the meme.controller speaking')
    switchLine()
}



function onChangeTxt(event) {
    let newTxt = event.target.value
    setLineTxt(newTxt)
    renderMemeOnCanvas()
}

function onIncrTxtSize() {
    incrTxtSize()
    renderMemeOnCanvas()
}

function onDecrTxtSize() {
    decrTxtSize()
    renderMemeOnCanvas()
}

function onSetColor(color) {
    setTxtColor(color)
    renderMemeOnCanvas()
}

function onSetStroke(stroke) {
    setTxtStroke(stroke)
    renderMemeOnCanvas()
}

// this function handles user image uploads to use strictly for meme creation
function onImageUpload(event) {
    const file = event.target.files[0];
    if (!file.type.startsWith('image/')) return
    imageUpload(file)
}

function onSaveMeme() {
    _saveMeme()
}

function onShareMemeToFacebook() {
    shareMemeToFacebook()
}
/********************/// EVENT HANDLERS ///********************/


/********************/// FILE OPERATIONS ///********************/
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
//*******************/// FILE OPERATIONS ///*******************//



// PRIVATE FUNCTIONS
function _saveMeme() {
    const memeImageURL = gElCanvas.toDataURL("image/png");



    // If it's a new meme (no ID assigned yet), generate a unique ID
    if (gMeme.id == null) {
        gMeme.id = generateUniqueId();
    }

    // Create a new meme object with the current state
    const newMeme = {
        id: gMeme.id,
        imgUrl: memeImageURL,
        // Add other meme properties if needed
    };

    // Check if the meme already exists in the array
    const existingMemeIndex = gMemes.findIndex(meme => meme.id === newMeme.id);

    // If the meme exists, update it; otherwise, add it as a new meme
    if (existingMemeIndex !== -1) {
        gMemes[existingMemeIndex] = newMeme;
    } else {
        gMemes.push(newMeme);
    }

    // Additional code for saving to storage and rendering
    _saveMemesToStorage();
    renderMemes();
}