'use strict'



function onInitMemes() {
    addEventListeners()
    initMeme()
}

function onRenderMeme() {
    const elTxtChanger = document.getElementById('meme-text')
    elTxtChanger.value = getLineTxt()
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}


// IM WORKING ON THIS BUT WENT TO FIX THE MVC A LITTLE
function onSwitchLine(event) {
    console.log('this is the meme.controller speaking');
    switchLine()
    // renderMeme()
}

function onChangeTxt(event) {
    let newTxt = event.target.value
    setLineTxt(newTxt)
    renderMeme()
}

function onIncrTxtSize() {

    //these get removed to do mvc properly
    // gCurrTxtSize++
    // setTxtSize(gCurrTxtSize)

    incrTxtSize()
    renderMeme()
}

function onDecrTxtSize() {
    decrTxtSize()
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

    //listen to CLICK events on the incrTxtSize button
    const addLine = document.querySelector('.line-new');
    if (addLine) {
        addLine.addEventListener('click', onAddLine, false);
    }

    //listen to CLICK events on the switchLine button
    const switchLine = document.querySelector('.line-switch');
    if (switchLine) {
        switchLine.addEventListener('click', onSwitchLine, false);
    }
}

// FILE SAVE/DOWNLOAD/SHARE

//TODO: create saveMeme function

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

//TODO: create shareMemeToFacebook function