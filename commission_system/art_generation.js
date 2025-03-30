async function art_generation() {
    try {
        const artPiece = await generateMagentaArt(); // Await the resolved data URL
        if (artPiece) {
            storeArt(artPiece); // Store the generated art
        }
    } catch (error) {
        console.error('Error generating art:', error);
    }
}

async function generateMagentaArt() {
    const width = 512; // Width of the generated image
    const height = 512; // Height of the generated image

    // Load a pre-trained Magenta.js model for style transfer
    const model = new mi.ArbitraryStyleTransferNetwork(); // Use the correct namespace
    try {
        await model.initialize();
    } catch (error) {
        console.error('Error initializing the model:', error);
        return;
    }

    // Get a random image from the content and style directories
    const getRandomImage = (directory) => {
        const images = ['image_1.jpg', 'image_2.jpg', 'image_3.jpg', 'image_4.jpg']; // Replace with actual image names
        const randomIndex = Math.floor(Math.random() * images.length);
        return `${directory}/${images[randomIndex]}`;
    };

    let baseImage, styleImage;
    try {
        // Load the base image from the content directory
        baseImage = await loadImage(getRandomImage('image_generation/content'));

        // Load the style image from the style directory
        styleImage = await loadImage(getRandomImage('image_generation/style'));

        if (!baseImage || !styleImage) {
            throw new Error('Failed to load images. Ensure the paths and images are correct.');
        }
    } catch (error) {
        console.error('Error loading images:', error);
        return;
    }

    // Preprocess images to ensure compatibility with the model
    const preprocessImage = (image) => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, width, height);
        return canvas;
    };

    const preprocessedBaseImage = preprocessImage(baseImage);
    const preprocessedStyleImage = preprocessImage(styleImage);

    // Create a canvas element to render the styled image
    const stylizedCanvas = document.createElement('canvas');
    stylizedCanvas.width = width;
    stylizedCanvas.height = height;

    // Create a popup container
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = 'white';
    popup.style.padding = '20px';
    popup.style.border = '2px solid black';
    popup.style.zIndex = '1000';
    popup.style.textAlign = 'center';

    // Create an image element to display the styled art
    const img = document.createElement('img');
    img.style.width = `${width}px`;
    img.style.height = `${height}px`;
    popup.appendChild(img);

    // Add a close button to the popup
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.marginTop = '10px';
    closeButton.onclick = () => {
        popup.remove();
    };
    popup.appendChild(closeButton);

    // Append the popup to the document body
    document.body.appendChild(popup);

    // Stylize the image and set the result as the source of the image element
    try {
        const imageData = await model.stylize(preprocessedBaseImage, preprocessedStyleImage);
        const canvasContext = stylizedCanvas.getContext('2d');
        canvasContext.putImageData(imageData, 0, 0);
        img.src = stylizedCanvas.toDataURL(); // Convert canvas to data URL and set as image source
    } catch (error) {
        console.error('Error during stylization:', error);
    }

    return stylizedCanvas.toDataURL(); // Return the data URL of the generated image
}

// Helper function to load an image as an HTMLImageElement
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous'; // Allow cross-origin loading
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
        img.src = src;
    });
}
