'use strict'

const IMAGES_STORAGE_KEY = 'imagesDB'

var gGallery
var gImgId = 0

_createGallery()

function getGallery() {
    let gallery = gGallery
    return gallery
}

// private functions

// imgNum refers to the file name - if file name is 1.jpg then imgNum=1
function _createImg(imgNum, keywords = ['funny', 'cat']) {
    return {
        id: gImgId++,
        url: `img/meme-imgs/meme-img-square/${imgNum}.jpg`,
        keywords,
    }
}

function _createGallery() {
    gGallery = loadFromStorage(IMAGES_STORAGE_KEY)
    if (gGallery && gGallery.length) return

    gGallery = [
        _createImg(1, ['trump', 'absurd']),
        _createImg(2, ['puppies', 'cute'])
    ]
    _saveGalleryToStorage()
}

function _saveGalleryToStorage() {
    saveToStorage(IMAGES_STORAGE_KEY, gGallery)
}