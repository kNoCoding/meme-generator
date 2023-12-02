'use strict'

function onInitGallery() {
    renderGallery()
    addGalleryEventListeners()
}

function renderGallery() {
    let gallery = getGallery()

    let strHtml = gallery.map(img => `<img src="${img.url}" class="gallery-image">`)

    document.querySelector('.rendered-imgs').innerHTML = strHtml
}

function onImgClick(event) {
    gImg.src = event.target.src;
    gImg.onload = function () {
        gMeme = _createMeme(event.target.src);
        renderMemeOnCanvas();
        updateTextInput();
        updateColorAndStrokeInputs();
    };
}

function updateTextInput() {
    const elTxtChanger = document.getElementById('meme-text');
    if (gMeme && gMeme.lines && gMeme.selectedLineIdx != null) {
        elTxtChanger.value = gMeme.lines[gMeme.selectedLineIdx].txt;
    } else {
        elTxtChanger.value = '';
    }
}

function addGalleryEventListeners() {
    // Listen to CHANGE events on the upload image to gallery
    const imageUploader = document.getElementById('imageUpload');
    imageUploader.addEventListener('change', onImageUpload, false);

    // Listen to CLICK events on the gallery images
    const galleryContainer = document.querySelector('.rendered-imgs');
    galleryContainer.addEventListener('click', function (event) {
        if (event.target.className === 'gallery-image') {
            onImgClick(event);
        }
    });
}