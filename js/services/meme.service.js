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

function setLineTxt() {

}