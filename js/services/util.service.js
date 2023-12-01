'use strict'

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