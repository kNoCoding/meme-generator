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

    // Listen to CLICK events on the save button
    const saveBtn = document.querySelector('.saveBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', _saveMeme);
        saveBtn.addEventListener('click', function () {
            showSection('memes-display');
        });
    }


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

    // Listen to CLICK events on the line-up button
    const lineUpBtn = document.querySelector('.line-up');
    if (lineUpBtn) {
        lineUpBtn.addEventListener('click', moveLinePositionUp, false);
    }

    // Listen to CLICK events on the line-down button
    const lineDownBtn = document.querySelector('.line-down');
    if (lineDownBtn) {
        lineDownBtn.addEventListener('click', moveLinePositionDown, false);
    }

    // Listen to CLICK events on the delete line button
    const deleteLineBtn = document.querySelector('.line-delete');
    if (deleteLineBtn) {
        deleteLineBtn.addEventListener('click', onDeleteLine, false);
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
    renderMemeOnCanvas();  // Draw the meme on the canvas
    updateTextInput();     // Update the text input field
    updateColorAndStrokeInputs(); // Update the color and stroke pickers
    updateDeleteLineButton();     // Update the state of the delete line button
}

function onSwitchLine(event) {
    switchLine();
    onRenderMemeOnCanvas();  // Update UI and canvas
}

function onMoveLineUp() {
    moveLineUp();
    onRenderMemeOnCanvas();  // Update UI and canvas
}

function onMoveLineDown() {
    moveLineDown();
    onRenderMemeOnCanvas();  // Update UI and canvas
}

function onAddLine() {
    addLine();
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    onRenderMemeOnCanvas();  // Update UI and canvas
}

function onDeleteLine() {
    deleteLine();
    onRenderMemeOnCanvas();  // Update UI and canvas
}

function onChangeTxt(event) {
    let newTxt = event.target.value;
    setLineTxt(newTxt);
    onRenderMemeOnCanvas();  // Update UI and canvas
}

function onIncrTxtSize() {
    incrTxtSize();
    onRenderMemeOnCanvas();  // Update UI and canvas
}

function onDecrTxtSize() {
    decrTxtSize();
    onRenderMemeOnCanvas();  // Update UI and canvas
}

function onSetColor(color) {
    setTxtColor(color);
    onRenderMemeOnCanvas();  // Update UI and canvas
}

function onSetStroke(stroke) {
    setTxtStroke(stroke);
    onRenderMemeOnCanvas();  // Update UI and canvas
}

// this function handles user image uploads to use strictly for meme creation
function onImageUpload(event) {
    const file = event.target.files[0];
    if (!file.type.startsWith('image/')) return;
    imageUpload(file);
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