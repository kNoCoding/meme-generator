'use strict';

function onInitGallery() {
    renderGallery();
    addGalleryEventListeners();
}

function renderGallery() {
    let gallery = getGallery();

    let strHtml = gallery.map(img => `<img src="${img.url}" class="gallery-image">`).join('');

    document.querySelector('.rendered-imgs').innerHTML = strHtml;
}

function onImgClick(event) {
    gImg.src = event.target.src;
    gImg.onload = function () {
        gMeme = _createMeme(event.target.src);
        renderMemeOnCanvas();
        updateTextInput();
        updateColorAndStrokeInputs();
        window.showSection('editor'); // Use the globally accessible function
    };
}

function addGalleryEventListeners() {
    const imageUploader = document.getElementById('imageUpload');
    imageUploader.addEventListener('change', onImageUpload, false);

    const galleryContainer = document.querySelector('.rendered-imgs');
    galleryContainer.addEventListener('click', function (event) {
        if (event.target.className === 'gallery-image') {
            onImgClick(event);
        }
    });
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}