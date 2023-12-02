'use strict'


/********************/// INIT AND SETUP ///********************/
function onInitMemes() {
    addMemeOnCanvasEventListeners()
    initMemes()
    renderMemes()
}

function updateColorAndStrokeInputs() {
    const colorPicker = document.querySelector('.color-picker');
    const strokePicker = document.querySelector('.stroke-picker');
    if (gMeme && gMeme.lines && gMeme.selectedLineIdx != null) {
        colorPicker.value = colorNameToHex(gMeme.lines[gMeme.selectedLineIdx].color);
        strokePicker.value = colorNameToHex(gMeme.lines[gMeme.selectedLineIdx].stroke);
    }
}

function addMemeOnCanvasEventListeners() {

    //listen to INPUT events on the meme text input
    const memeTextChanger = document.getElementById('meme-text')
    memeTextChanger.addEventListener('input', onChangeTxt, false)

    const saveBtn = document.querySelector('.saveBtn')
    saveBtn.addEventListener('click', saveMeme);


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



/********************/// EVENT HANDLERS ///********************/
function onRenderMemeOnCanvas() {
    const elTxtChanger = document.getElementById('meme-text')
    elTxtChanger.value = getLineTxt()
    renderMemeOnCanvas()
}

function onAddLine() {
    addLine()
    renderMemeOnCanvas()
}



// IM WORKING ON THIS BUT WENT TO FIX THE MVC A LITTLE
function onSwitchLine(event) {
    console.log('this is the meme.controller speaking');
    switchLine()
    // renderMemeOnCanvas()
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

//TODO: create the onSaveMeme and all what it needs - model and an event listner change
function onSaveMeme() {
    saveMeme(); // Call model function to save the meme
    // Additional UI logic if necessary
}

function onShareMemeToFacebook() {
    shareMemeToFacebook()
}
/********************/// EVENT HANDLERS ///********************/


/********************/// FILE OPERATIONS ///********************/
function saveMeme() {
    const memeImageURL = gElCanvas.toDataURL("image/png");

    if (gMeme.id == null) {
        // Assign a new unique ID to the meme
        gMeme.id = gMemes.length;
    }

    const newMeme = {
        id: gMeme.id,
        imgUrl: memeImageURL,
        // Include any other metadata if necessary
    };

    // Find index of the existing meme
    const existingMemeIndex = gMemes.findIndex(meme => meme.id === newMeme.id);

    if (existingMemeIndex !== -1) {
        // Update existing meme
        gMemes[existingMemeIndex] = newMeme;
    } else {
        // Add new meme
        gMemes.push(newMeme);
    }

    _saveMemesToStorage(); // Save the updated array to local storage
    renderMemes(); // Re-render the list of saved memes
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
/********************/// FILE OPERATIONS ///********************/