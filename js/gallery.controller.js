'use strict'

function onInitGallery() {
    renderGallery()
}

function renderGallery() {
    let gallery = getGallery()

    let strHtml = gallery.map(img => `<img src="${img.url}">`)

    document.querySelector('.rendered-imgs').innerHTML = strHtml
}