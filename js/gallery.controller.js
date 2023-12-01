'use strict'

function onInitGallery() {
    renderGallery()
}

function renderGallery() {
    let gallery = getGallery()

    let strHtml = gallery.map(img => `<img src="${img.url}">`)

    document.querySelector('.rendered-imgs').innerHTML = strHtml
}

function onImgClick(event) {
    gImg.src = event.target.src;
    gImg.onload = function () {

        // Update the current color based on the selected line's color
        gCurrColor = colorNameToHex(getTxtColor()); // Ensure this is in hex format
        gCurrStroke = colorNameToHex(getTxtStroke())

        // Update the color picker's value to reflect the current color
        const elTxtColorChanger = document.querySelector('.color-picker');
        elTxtColorChanger.value = gCurrColor;

        const elTxtStrokeChanger = document.querySelector('.stroke-picker');
        elTxtStrokeChanger.value = gCurrStroke;

        renderMeme();

        // this is here to fix the meme text not appearing in the meme-text input field
        updateTextInput();
    };
}

function updateTextInput() {
    const elTxtChanger = document.getElementById('meme-text');
    elTxtChanger.value = getLineTxt();
}