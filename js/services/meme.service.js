'use strict'

let gImgs = [{ id: 1, url: '/img/meme-imgs/meme-img-square/1.jpg', keywords: ['funny', 'cat'] }]

let gMemes = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red'
        }
    ]
}
let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getMeme(imgUrl) {
    return gImgs.find(img => imgUrl === img.url)
}

function setLineTxt(newTxt) {
    const currMemeLine = gMemes.lines[gMemes.selectedLineIdx]
    if (currMemeLine === newTxt) return
    currMemeLine.txt = newTxt
    return newTxt
}

function getLineTxt() {
    const currMemeLine = gMemes.lines[gMemes.selectedLineIdx]; // Access the line object using the selectedLineIdx
    const lineTxt = currMemeLine.txt; // Now you can access the txt property
    return lineTxt
}