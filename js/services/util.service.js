'use strict'

function shareMemeToFacebook() {
    // Gets the image from the canvas
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        // Handle some special characters
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }

    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}

// Upload the image to a server, get back a URL 
// call the function onSuccess when done
function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    // Send a post req with the image to the server
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        // If the request is not done, we have no business here yet, so return
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        // if the response is not ok, show an error
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR

        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}

function colorNameToHex(color) {
    var colors = {
        "red": "#ff0000",
        "blue": "#0000ff",
        "green": "#008000",
        "black": "#000000",
        "white": "#ffffff",

        // Add more mappings as needed
    };

    return colors[color.toLowerCase()] || color;
}

function generateUniqueId() {
    // Use the current timestamp
    const timestamp = new Date().getTime().toString(36);

    // Generate a random 4-character string
    const randomString = Math.random().toString(36).substr(2, 4);

    // Combine timestamp and random string
    return timestamp + randomString;
}