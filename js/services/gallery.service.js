'use strict'

const GALLERY_STORAGE_KEY = 'galleryDB'

let gGallery
let gImgId = 0
let gKeywordSearchCountMap = {
    'funny': 12,
    'cat': 16,
    'baby': 2
}

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
    gGallery = loadFromStorage(GALLERY_STORAGE_KEY)
    if (gGallery && gGallery.length) return

    gGallery = [
        _createImg(1, ['trump', 'absurd']),
        _createImg(2, ['puppies', 'cute'])
    ]
    _saveGalleryToStorage()
}

function _saveGalleryToStorage() {
    saveToStorage(GALLERY_STORAGE_KEY, gGallery)
}