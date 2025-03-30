// Initialize global variables if not already defined
if (!window.arrayArt) {
    window.arrayArt = [];
}
if (!window.arraySizeArt) {
    window.arraySizeArt = 0;
}

function storeArt(art) { // Export the function
    if (!art || typeof art !== 'string' || !art.startsWith('data:image/')) {
        console.error('Invalid art data provided:', art); // Log invalid data
        return;
    }

    window.arraySizeArt = window.arraySizeArt + 1;

    for (let i = 0; i < window.arraySizeArt; i++) {
        if (window.arrayArt[i] == null) {
            window.arrayArt[i] = art;
            console.log("Art stored at index", i, ":", art); // Log the stored art for debugging
            break;
        }
    }
}